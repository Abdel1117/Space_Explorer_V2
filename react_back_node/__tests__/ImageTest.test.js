// testGetRoutes.js

const request = require('supertest');
const mongoose = require("mongoose")
const app = require("../index");

describe('Tests pour les routes GET Forum', function () {
    let server;

    beforeAll(() => {
        server = app.listen(4003);
    });

    afterAll(async () => {
        server.close()
    });


    it('Devrait récupérer tout les sujets ', async function () {
        const response = await request(app).get('/image/getImage');
        expect(response.status).toBe(200);
    });

    it('Devrait récupérer le sujet specifique', async function () {
        const response = await request(app).get('/image/getImageById/65aa8bfff655c4475a3878ab');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);

    });

});
