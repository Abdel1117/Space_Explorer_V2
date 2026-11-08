// testGetRoutes.js
require("dotenv").config();
process.env.AUTH_TOKKEN_CODE = process.env.AUTH_TOKKEN_CODE || "test-auth-secret";

const request = require('supertest');
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../index");
const Article = require("../Model/articleShema")

describe('Tests pour les routes GET et Post Article', function () {
    let testArticle;

    beforeAll(async function () {
        await mongoose.connection.asPromise();
        testArticle = await Article.create({
            Title: `Jest article ${Date.now()}`,
            Slug: "Planète",
            Image: "jest-test-article.jpg",
            Contenu: "<p>Jest test article</p>"
        });
    });

    afterAll(async function () {
        try {
            if (testArticle) {
                await Article.deleteOne({ _id: testArticle._id });
            }
        } finally {
            await mongoose.disconnect();
        }
    });

    it('Devrait récupérer tout les Articles', async function () {
        const response = await request(app).get('/article');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it('Devrait récupérer un Article avec son Id', async function () {
        const response = await request(app).get(`/article/article/${testArticle._id}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body._id).toBe(testArticle._id.toString());

    });

    it('Devrait ne pas récuperer d\'\article car l\'\id est incorect', async function () {
        const response = await request(app).get('/article/article/qdqsdqsdqsdqsddqs');
        expect(response.status).toBe(401);

    });


    it('Devrait ne pas trouver de route car inexistante', async function () {
        const response = await request(app).get('/articcle');
        expect(response.status).toBe(404);

    });

    it("Devrais crée un Article", async () => {
        const testArticleTitle = `Test Title ${Date.now()}`;
        const token = jwt.sign({ userId: "test", userRole: "Admin" }, process.env.AUTH_TOKKEN_CODE, { expiresIn: "5m" });
        const contenu = "<p>" + "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(10) + "</p>";

        const response = await request(app)
            .post("/article/ajoutArticle")
            .set("Authorization", `Bearer ${token}`)
            .field("titre", testArticleTitle)
            .field("slug", "Planète")
            .field("contenu", contenu)
            .attach("image", path.join(__dirname, "..", "image", "galerie", "1920x1080_1710276709150.jpeg"));

        const article = await Article.findOne({ Title: testArticleTitle });
        try {
            expect(response.status).toBe(201);
            expect(response.body.message).toBe("Article crée avec succées");
            expect(article).toBeTruthy();
            expect(article.Slug).toBe("Planète");
            expect(article.Contenu).toBe(contenu);
        } finally {
            // Le test écrit dans la vraie base : on supprime l'article et son image
            if (article) {
                await Article.deleteOne({ _id: article._id });
                fs.rmSync(path.join(__dirname, "..", "image", "Image_article", article.Image), { force: true });
            }
        }
    });

});
