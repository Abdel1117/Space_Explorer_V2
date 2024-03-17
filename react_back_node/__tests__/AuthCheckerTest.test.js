const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const express = require('express');
const authMiddleware = require('../Functions/authChecker/tokenChecker'); // Ajuste le chemin

jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
    let app;

    beforeAll(() => {
        app = express();
        app.use(express.json());

        app.get('/protected', authMiddleware, (req, res) => {
            res.status(200).json({ message: 'Accès autorisé' });
        });


        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(null, { userId: '123', userRole: 'user' });
        });
    });



    it('devrait refuser l\'accès avec un token invalide', async () => {
        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(new Error('Token invalide'), null);
        });

        const response = await supertest(app)
            .get('/protected')
            .set('Authorization', 'Bearer token_invalide')
            .expect(401);

        expect(response.body).toEqual(expect.anything());
    });

    // Ajoute ici plus de tests si nécessaire
});
