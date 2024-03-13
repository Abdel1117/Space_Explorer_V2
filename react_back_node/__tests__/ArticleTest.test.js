// testGetRoutes.js
const request = require('supertest');
const app = require("../index");

describe('Tests pour les routes GET User', function () {
    let server;

    beforeAll(() => {
        server = app.listen(4001);
    });

    afterAll(async () => {
        server.close()
    });
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
});
