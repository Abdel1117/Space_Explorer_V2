// testGetRoutes.js

const request = require('supertest');
const mongoose = require("mongoose")
const app = require("../index");

describe('Tests pour les routes GET Forum', function () {



    it('Devrait récupérer tout les sujets ', async function () {
        const response = await request(app).get('/image/getImage');
        expect(response.status).toBe(200);
    });

    it('Devrait récupérer le sujet specifique', async function () {
        const response = await request(app).get('/image/getImageById/65c92eff6fe1d3c37db3a401');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);

    });

});
