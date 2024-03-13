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
    it('Devrait récupérer les informations d\'un utilisateur par son ID', async function () {
        const response = await request(app).get('/user/getAllUsers');
        expect(response.status).toBe(200);

        expect(response.body).toBeInstanceOf(Object);
    });

    it('Devrait récupérer la liste de tous les utilisateurs', async function () {
        const response = await request(app).get('/user/userProfil/64ef440f0ce1d05598047939');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);

    });

    it('Devrait récupérer la liste de tous les utilisateurs', async function () {
        const response = await request(app).get('/user/userProfil/qdqsdqsdqsdqsddqs');
        expect(response.status).toBe(409);

    });


    it('Devrait récupérer la liste de tous les utilisateurs', async function () {
        const response = await request(app).get('/user/userProfl');
        expect(response.status).toBe(404);

    });
});
