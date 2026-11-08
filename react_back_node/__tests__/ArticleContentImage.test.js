require("dotenv").config();
// Permet de lancer ces tests sans .env : le middleware lit la clé au moment de la requête
process.env.AUTH_TOKKEN_CODE = process.env.AUTH_TOKKEN_CODE || "test-auth-secret";

const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../index");
const { sanitizeArticleHtml } = require("../Functions/Sanitize/sanitizeArticleHtml");
const { CONTENT_IMAGE_DIR, extractContentImageFiles } = require("../Functions/FileHandler/articleContentImage");

// PNG 1x1 transparent
const PNG_1PX = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
    "base64"
);

const tokenFor = (userRole) => jwt.sign({ userId: "test", userRole }, process.env.AUTH_TOKKEN_CODE, { expiresIn: "5m" });

describe("sanitizeArticleHtml - images façon Wikipédia", () => {
    it("conserve une figure légendée alignée produite par image2", () => {
        const html = '<figure class="image-captioned image-align-right"><img alt="Saturne" height="300" src="/article_contenu/saturne_1.png" width="400" /><figcaption>Saturne et ses anneaux</figcaption></figure>';
        expect(sanitizeArticleHtml(html)).toBe(
            '<figure class="image-captioned image-align-right"><img alt="Saturne" height="300" src="/article_contenu/saturne_1.png" width="400" /><figcaption>Saturne et ses anneaux</figcaption></figure>'
        );
    });

    it("conserve une image seule alignée et le paragraphe de centrage", () => {
        expect(sanitizeArticleHtml('<img class="image-align-left" src="https://example.com/a.png" alt="" />'))
            .toBe('<img class="image-align-left" src="https://example.com/a.png" alt="" />');
        expect(sanitizeArticleHtml('<p class="image-align-center"><img src="/article_contenu/a.png" alt="" /></p>'))
            .toBe('<p class="image-align-center"><img src="/article_contenu/a.png" alt="" /></p>');
    });

    it("retire les classes, styles et attributs non prévus", () => {
        const html = '<figure class="image-captioned evil" style="position:fixed"><img class="big" src="/a.png" onerror="alert(1)" alt="" /></figure><p class="lead">Texte</p>';
        expect(sanitizeArticleHtml(html)).toBe('<figure class="image-captioned"><img src="/a.png" alt="" /></figure><p>Texte</p>');
    });

    it("refuse les sources javascript: et data: sur les images", () => {
        expect(sanitizeArticleHtml('<img src="javascript:alert(1)" alt="" />')).toBe('<img alt="" />');
        expect(sanitizeArticleHtml('<img src="data:image/png;base64,AAAA" alt="" />')).toBe('<img alt="" />');
    });
});

describe("extractContentImageFiles", () => {
    it("ne retient que les images uploadées via l'éditeur", () => {
        const html = [
            '<img src="/article_contenu/nebuleuse_12.png" alt="" />',
            '<img src="/article_contenu/Image%20du%20soleil_13.webp" alt="" />',
            '<img src="https://example.com/article_contenu/externe.png" alt="" />',
            '<img src="/autre/fichier.png" alt="" />',
            '<img src="/article_contenu/nebuleuse_12.png" alt="doublon" />'
        ].join("");
        expect(extractContentImageFiles(html)).toEqual(["nebuleuse_12.png", "Image du soleil_13.webp"]);
    });

    it("ne permet pas de sortir du dossier des images", () => {
        expect(extractContentImageFiles('<img src="/article_contenu/..%2F..%2Findex.js" alt="" />')).toEqual(["index.js"]);
        expect(extractContentImageFiles('<img src="/article_contenu/.." alt="" />')).toEqual([]);
        expect(extractContentImageFiles('<img src="/article_contenu/%E0%A4%A" alt="" />')).toEqual([]);
    });
});

describe("POST /article/uploadImage", () => {
    const uploadedFiles = [];

    afterAll(() => {
        uploadedFiles.forEach((file) => fs.rmSync(path.join(CONTENT_IMAGE_DIR, file), { force: true }));
    });

    it("refuse un visiteur non connecté", async () => {
        const response = await request(app)
            .post("/article/uploadImage")
            .attach("upload", PNG_1PX, { filename: "test.png", contentType: "image/png" });
        expect(response.status).toBe(401);
    });

    it("refuse un utilisateur qui n'est pas administrateur", async () => {
        const response = await request(app)
            .post("/article/uploadImage")
            .set("Authorization", `Bearer ${tokenFor("Utilisateur")}`)
            .attach("upload", PNG_1PX, { filename: "test.png", contentType: "image/png" });
        expect(response.status).toBe(403);
    });

    it("enregistre l'image d'un administrateur et renvoie la réponse attendue par CKEditor", async () => {
        const response = await request(app)
            .post("/article/uploadImage")
            .set("Authorization", `Bearer ${tokenFor("Admin")}`)
            .attach("upload", PNG_1PX, { filename: "voie lactée.png", contentType: "image/png" });

        expect(response.status).toBe(201);
        expect(response.body.uploaded).toBe(1);
        uploadedFiles.push(response.body.fileName);

        expect(response.body.fileName).toMatch(/^voie lactée_\d+\.png$/);
        expect(response.body.url).toBe(`/article_contenu/${encodeURIComponent(response.body.fileName)}`);
        expect(fs.existsSync(path.join(CONTENT_IMAGE_DIR, response.body.fileName))).toBe(true);

        const served = await request(app).get(response.body.url);
        expect(served.status).toBe(200);
        expect(served.headers["content-type"]).toBe("image/png");
    });

    it("accepte aussi le token brut envoyé par useFetch", async () => {
        const response = await request(app)
            .post("/article/uploadImage")
            .set("Authorization", tokenFor("Admin"))
            .attach("upload", PNG_1PX, { filename: "brut.png", contentType: "image/png" });

        expect(response.body.uploaded).toBe(1);
        uploadedFiles.push(response.body.fileName);
    });

    it("renvoie un message lisible par CKEditor pour un fichier qui n'est pas une image", async () => {
        const response = await request(app)
            .post("/article/uploadImage")
            .set("Authorization", `Bearer ${tokenFor("Admin")}`)
            .attach("upload", Buffer.from("<svg onload=alert(1)>"), { filename: "test.svg", contentType: "image/svg+xml" });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ uploaded: 0, error: { message: "Nous n'acceptons que les images de type PNG, JPEG, JPG ou Webp" } });
    });

    it("refuse une image de plus de 5 Mo", async () => {
        const response = await request(app)
            .post("/article/uploadImage")
            .set("Authorization", `Bearer ${tokenFor("Admin")}`)
            .attach("upload", Buffer.alloc(5 * 1024 * 1024 + 1), { filename: "lourde.png", contentType: "image/png" });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ uploaded: 0, error: { message: "L'image ne doit pas dépasser 5 Mo" } });
        expect(fs.readdirSync(CONTENT_IMAGE_DIR).some((file) => file.startsWith("lourde_"))).toBe(false);
    });

    it("signale l'absence de fichier", async () => {
        const response = await request(app)
            .post("/article/uploadImage")
            .set("Authorization", `Bearer ${tokenFor("Admin")}`)
            .field("autre", "valeur");

        expect(response.body).toEqual({ uploaded: 0, error: { message: "Aucune image reçue" } });
    });
});
