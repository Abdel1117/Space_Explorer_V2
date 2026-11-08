require("dotenv").config();
process.env.AUTH_TOKKEN_CODE = process.env.AUTH_TOKKEN_CODE || "test-auth-secret";

const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../index");
const Article = require("../Model/articleShema");
const { ARTICLE_IMAGE_DIR } = require("../Functions/FileHandler/articleImage");
const { CONTENT_IMAGE_DIR } = require("../Functions/FileHandler/articleContentImage");

// Les appels Mongoose sont simulés : ces tests n'écrivent jamais dans la base.
const PNG_1PX = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
    "base64"
);
const ARTICLE_ID = "65f0c0ffee0000000000abcd";
const BODY = "<p>" + "Saturne est la sixième planète du Système solaire. ".repeat(10) + "</p>";
const adminToken = () => `Bearer ${jwt.sign({ userId: "admin", userRole: "Admin" }, process.env.AUTH_TOKKEN_CODE, { expiresIn: "5m" })}`;

const createdFiles = [];
const createFile = (dir, name) => {
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, name);
    fs.writeFileSync(file, PNG_1PX);
    createdFiles.push(file);
    return file;
};
const uploadedFile = (filename) => {
    const file = path.join(ARTICLE_IMAGE_DIR, filename);
    createdFiles.push(file);
    return file;
};
const waitFor = async (condition) => {
    for (let i = 0; i < 50 && !condition(); i++) {
        await new Promise((resolve) => setTimeout(resolve, 10));
    }
    return condition();
};
const filesStartingWith = (prefix) => (fs.existsSync(ARTICLE_IMAGE_DIR) ? fs.readdirSync(ARTICLE_IMAGE_DIR) : []).filter((f) => f.startsWith(prefix));

const postArticle = (fields, { image = true, token = adminToken() } = {}) => {
    const req = request(app).post("/article/ajoutArticle");
    if (token) req.set("Authorization", token);
    Object.entries(fields).forEach(([key, value]) => req.field(key, value));
    if (image) req.attach("image", PNG_1PX, { filename: image === true ? "jest-image.png" : image, contentType: "image/png" });
    return req;
};

afterEach(() => jest.restoreAllMocks());
afterAll(() => createdFiles.forEach((file) => fs.rmSync(file, { force: true })));

describe("POST /article/ajoutArticle", () => {
    it("refuse un visiteur sans écrire de fichier", async () => {
        const response = await postArticle({ titre: "Saturne", slug: "Planète", contenu: BODY }, { token: null, image: "jest-anonyme.png" });
        expect(response.status).toBe(401);
        expect(filesStartingWith("jest-anonyme_")).toEqual([]);
    });

    it("enregistre un article avec un seul slug, son image et un corps nettoyé", async () => {
        let saved;
        jest.spyOn(Article.prototype, "save").mockImplementation(function () {
            saved = this.toObject();
            return Promise.resolve(this);
        });

        const response = await postArticle({
            titre: "  Saturne  ",
            slug: "Planète",
            contenu: BODY + '<script>alert(1)</script><figure class="image-captioned image-align-right"><img src="/article_contenu/s.png" alt=""><figcaption>Saturne</figcaption></figure>'
        }, { image: "jest-saturne.png" });

        expect(response.status).toBe(201);
        expect(saved.Title).toBe("Saturne");
        expect(saved.Slug).toBe("Planète");
        expect(saved.Image).toMatch(/^jest-saturne_\d+\.png$/);
        expect(saved.Contenu).toBe(BODY + '<figure class="image-captioned image-align-right"><img src="/article_contenu/s.png" alt="" /><figcaption>Saturne</figcaption></figure>');
        expect(fs.existsSync(uploadedFile(saved.Image))).toBe(true);
    });

    it("refuse une catégorie inconnue et supprime l'image reçue", async () => {
        const response = await postArticle({ titre: "Saturne", slug: "Galaxie", contenu: BODY }, { image: "jest-mauvais-slug.png" });
        expect(response.status).toBe(400);
        expect(response.body.errors.map((e) => e.msg)).toEqual(["Veuillez choisir une catégorie pour l'article"]);
        expect(await waitFor(() => filesStartingWith("jest-mauvais-slug_").length === 0)).toBe(true);
    });

    it("refuse un article sans image", async () => {
        const response = await postArticle({ titre: "Saturne", slug: "Planète", contenu: BODY }, { image: false });
        expect(response.status).toBe(400);
        expect(response.body.errors).toEqual([{ msg: "Veuillez ajouter une image représentant l'article", param: "image" }]);
    });

    it("refuse un fichier qui n'est pas une image acceptée", async () => {
        const response = await request(app)
            .post("/article/ajoutArticle")
            .set("Authorization", adminToken())
            .field("titre", "Saturne").field("slug", "Planète").field("contenu", BODY)
            .attach("image", Buffer.from("<svg/>"), { filename: "x.svg", contentType: "image/svg+xml" });
        expect(response.status).toBe(400);
        expect(response.body.errors[0].msg).toBe("Nous n'acceptons que les images de type PNG, JPEG, JPG ou Webp");
    });

    it("refuse un titre trop court et un corps trop court", async () => {
        const response = await postArticle({ titre: "Sa", slug: "Planète", contenu: "<p>Trop court</p>" }, { image: "jest-court.png" });
        expect(response.status).toBe(400);
        expect(response.body.errors.map((e) => e.param).sort()).toEqual(["contenu", "titre"]);
    });
});

describe("PUT /article/editArticle/:id", () => {
    it("remplace l'image et supprime les fichiers devenus inutiles", async () => {
        const oldImage = createFile(ARTICLE_IMAGE_DIR, `jest-ancienne-${Date.now()}.png`);
        const removedInline = createFile(CONTENT_IMAGE_DIR, `jest-retiree-${Date.now()}.png`);
        const keptInline = createFile(CONTENT_IMAGE_DIR, `jest-gardee-${Date.now()}.png`);
        const keptTag = `<p><img src="/article_contenu/${path.basename(keptInline)}" alt="" /></p>`;

        const update = jest.spyOn(Article, "findByIdAndUpdate").mockResolvedValue({
            Image: path.basename(oldImage),
            Contenu: `${BODY}${keptTag}<p><img src="/article_contenu/${path.basename(removedInline)}" alt="" /></p>`
        });

        const response = await request(app)
            .put(`/article/editArticle/${ARTICLE_ID}`)
            .set("Authorization", adminToken())
            .field("titre", "Saturne").field("slug", "Systeme Solaire").field("contenu", BODY + keptTag)
            .attach("image", PNG_1PX, { filename: "jest-nouvelle.png", contentType: "image/png" });

        expect(response.status).toBe(200);
        const [id, changes] = update.mock.calls[0];
        expect(id).toBe(ARTICLE_ID);
        expect(changes).toEqual({ Title: "Saturne", Slug: "Systeme Solaire", Contenu: BODY + keptTag, Image: expect.stringMatching(/^jest-nouvelle_\d+\.png$/) });
        uploadedFile(changes.Image);

        expect(await waitFor(() => !fs.existsSync(oldImage) && !fs.existsSync(removedInline))).toBe(true);
        expect(fs.existsSync(keptInline)).toBe(true);
    });

    it("garde l'image actuelle quand aucune nouvelle image n'est envoyée", async () => {
        const update = jest.spyOn(Article, "findByIdAndUpdate").mockResolvedValue({ Image: "actuelle.png", Contenu: BODY });

        const response = await request(app)
            .put(`/article/editArticle/${ARTICLE_ID}`)
            .set("Authorization", adminToken())
            .field("titre", "Saturne").field("slug", "Planète").field("contenu", BODY);

        expect(response.status).toBe(200);
        expect(update.mock.calls[0][1]).not.toHaveProperty("Image");
    });

    it("répond 404 pour un article inexistant", async () => {
        jest.spyOn(Article, "findByIdAndUpdate").mockResolvedValue(null);
        const response = await request(app)
            .put(`/article/editArticle/${ARTICLE_ID}`)
            .set("Authorization", adminToken())
            .field("titre", "Saturne").field("slug", "Planète").field("contenu", BODY);
        expect(response.status).toBe(404);
    });
});

describe("DELETE /article/deleteArticle/:id", () => {
    it("supprime l'article, son image et les images de son contenu", async () => {
        const image = createFile(ARTICLE_IMAGE_DIR, `jest-supprimee-${Date.now()}.png`);
        const inline = createFile(CONTENT_IMAGE_DIR, `jest-contenu-${Date.now()}.png`);
        jest.spyOn(Article, "findByIdAndDelete").mockResolvedValue({
            Image: path.basename(image),
            Contenu: `<p><img src="/article_contenu/${path.basename(inline)}" alt="" /></p>`
        });

        const response = await request(app).delete(`/article/deleteArticle/${ARTICLE_ID}`).set("Authorization", adminToken());

        expect(response.status).toBe(200);
        expect(await waitFor(() => !fs.existsSync(image) && !fs.existsSync(inline))).toBe(true);
    });

    it("refuse un visiteur et répond 404 pour un article inexistant", async () => {
        const remove = jest.spyOn(Article, "findByIdAndDelete").mockResolvedValue(null);
        expect((await request(app).delete(`/article/deleteArticle/${ARTICLE_ID}`)).status).toBe(401);
        expect(remove).not.toHaveBeenCalled();
        expect((await request(app).delete(`/article/deleteArticle/${ARTICLE_ID}`).set("Authorization", adminToken())).status).toBe(404);
    });
});
