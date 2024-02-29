const request = require('supertest');
const app = require('../index');
describe('Test de la création d\'un utilisateur', () => {
    test('Création d\'un utilisateur avec des données valides', async () => {
        const userData = {
            "pseudo": "Adelddsddddddsdsddd111117",
            "emailInput": "Abzzddddddddsdsdsdddzzbbbbb.adjali@live.fr",
            "passwordInput": "Fermetageule14?",
            "confirm_passwordInput": "Fermetageule14?",
            "accept_condition": true
        };

        const response = await request(app)
            .post('/user/inscription')
            .send(userData);
        expect(response.statusCode).toBe(201);
    });

});

