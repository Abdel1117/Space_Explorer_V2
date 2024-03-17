// testGetRoutes.js
const request = require('supertest');
const app = require("../index");
const Article = require("../Model/articleShema")

describe('Tests pour les routes GET et Post Article', function () {

    it('Devrait récupérer tout les Articles', async function () {
        const response = await request(app).get('/article');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it('Devrait récupérer un Article avec son Id', async function () {
        const response = await request(app).get('/article/article/658ae675006cc5c0abc7e91b');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);

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
        const testArticleTitle = "Test Title";
        const newArticle = {
            titre: JSON.stringify(testArticleTitle),
            slugs: JSON.stringify(["test-slug"]),
            contenu: JSON.stringify([{
                titre: "Section 1", contenu: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nullam eget mauris fringilla, facilisis tellus in, dictum purus.Curabitur vel interdum diam.Cras dignissim augue vehicula lacinia varius.Mauris tincidunt blandit neque, mollis condimentum quam lacinia tincidunt.In dapibus neque ac pharetra hendrerit.Suspendisse eget auctor velit.Vivamus sit amet sapien tincidunt, faucibus arcu sit amet, vehicula tortor.Nunc ultrices eros quis tempus scelerisque.Nullam tempus libero vel dapibus nam. ", image: ""
            }])
        };
        try {


            await request(app)
                .post("/article/ajoutArticle/")
                .field("titre", newArticle.titre)
                .field("slugs", newArticle.slugs)
                .field("contenu", newArticle.contenu)
                .attach('image', '../image/galerie/1920x1080_1710276709150.jpeg')
                .expect(201)
                .then(async (response) => {
                    expect(response.body.message).toBe("Article crée avec succées");


                    const article = await Article.findOne({ Title: testArticleTitle });
                    expect(article).toBeTruthy();
                    expect(article.Slugs).toContain("test-slug");

                });
        } catch (e) {
            console.log(e)
        }
    });

});
