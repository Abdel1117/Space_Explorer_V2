import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userContext from "../src/Context/userContext"
import { Sujet } from '../src/pages/Forum/Sujet';



// Utilisez vi.mock avec importOriginal pour mocker 'react-router-dom'
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom'); // Importez les exports réels
    return {
        ...actual,
        useParams: () => ({ id: '123' }) // Mock spécifique pour `useParams`
    };
});
// Mock fetch
global.fetch = vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            // Mocked response for your sujet and its reponses
            Title: 'Test Sujet',
            User: { pseudo: 'UserTest', avatar: undefined },
            FormattedDate: '2024-03-17',
            Sujet: 'Contenu du sujet test',
            Reponses: [
                {
                    user: { pseudo: 'ReponseUser', avatar: undefined },
                    FormattedDate: '2024-03-18',
                    content: 'Contenu de la réponse test',
                },
            ],
        }),
    })
);

describe('Sujet Component', () => {
    beforeEach(() => {
        // Clear mock before each test
        fetch.mockClear();
    });

    it('renders sujet and reponses correctly', async () => {
        render(
            <MemoryRouter>
                <userContext.Provider value={{ userAuth: { name: "Test User" } }}>
                    <Sujet />
                </userContext.Provider>
            </MemoryRouter>
        );


        await waitFor(() => {
            expect(screen.queryByText(/chargement/i)).not.toBeInTheDocument();
            expect(screen.getByText('Test Sujet')).toBeInTheDocument();
            expect(screen.getByText('Contenu du sujet test')).toBeInTheDocument();
            expect(screen.getByText('UserTest')).toBeInTheDocument();
            expect(screen.getByText('Contenu de la réponse test')).toBeInTheDocument();
        });
    });
});
