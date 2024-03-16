const request = require('supertest');
const mongoose = require("mongoose")
const app = require("../index");


describe('Tests pour les routes GET afin de récuprer le nombre d\'entité ', function () {
    it('Recuperer le nombre d\'entite ', async function () {

        jest.setTimeout(10000);
        const response = await request(app).get('/count/allEntity');
        expect(response.status).toBe(200);
    });
});
