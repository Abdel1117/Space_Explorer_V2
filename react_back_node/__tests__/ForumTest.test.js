// testGetRoutes.js

const request = require('supertest');
const mongoose = require("mongoose")
const app = require("../index");

describe('Tests pour les routes GET Forum', function () {
    let server;

    beforeAll(() => {
        server = app.listen(4002);
    });

    afterAll(async () => {
        server.close()
    });


    it('Devrait récupérer tout les sujets ', async function () {
        const response = await request(app).get('/forum/forum');
        expect(response.status).toBe(200);
    });

    it('Devrait récupérer le sujet specifique', async function () {
        const response = await request(app).get('/forum/forum/64f0a44ab7073947390ac497');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);

    });

    it('Devrait ne pas trouver le forum', async function () {
        const response = await request(app).get('/forum/forum/qdqsdqsdqsdqsddqs');
        expect(response.status).toBe(400);

    });


    it('Ne devrais pas fonctionner car fausse url', async function () {
        const response = await request(app).get('/form');
        expect(response.status).toBe(404);

    });
});
