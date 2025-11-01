import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userContext from '../src/Context/userContext';
import { Ajout_Sujet } from '../src/pages/Forum/Ajout_Sujet';

// Mock de `useNavigate`
const mockUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => ({
    ...await vi.importActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}));

// Mock de `fetch`
global.fetch = vi.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Sujet ajouté avec succès', idSujet: '123' }),
    })
);

describe('Ajout_Sujet Component', () => {
    beforeEach(() => {
        fetch.mockClear();
        mockUseNavigate.mockClear();
    });

    it('affiche un message de succès après l\'ajout d\'un sujet', async () => {
        render(
            <MemoryRouter>
                <userContext.Provider value={{ userAuth: { name: 'Test User' } }}>
                    <Ajout_Sujet />
                </userContext.Provider>
            </MemoryRouter>
        );

        // Simulez la saisie de données valides
        fireEvent.change(screen.getByPlaceholderText('Titre du Sujet'), { target: { value: 'Mon nouveau sujet' } });
        fireEvent.change(screen.getByPlaceholderText('Ecrivez votre sujet ici'), { target: { value: 'Contenu de mon sujet' } });

        // Simulez la soumission du formulaire
        fireEvent.click(screen.getByText('Ajouter Sujet'));


    });

});
