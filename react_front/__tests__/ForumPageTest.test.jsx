import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Forum from '../src/pages/Forum/Forum';
import userContext from '../src/Context/userContext';
import { MemoryRouter } from 'react-router-dom';

// Mocking du userContext
const mockUserAuth = { user: { name: "Test User" } };

// Mocking de fetch
vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
    json: () => Promise.resolve([{ titre: "Sujet Test", slug: "test", sujet: "Contenu test", auteur: "Auteur test", date: "2024-03-17" }])
})));

describe('Forum Component', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('affiche la page Forum', async () => {
        render(
            <MemoryRouter>
                <userContext.Provider value={mockUserAuth}>
                    <Forum />
                </userContext.Provider>
            </MemoryRouter>
        );

    });

    it('change l\'état lors d\'une recherche', async () => {
        render(
            <MemoryRouter>
                <userContext.Provider value={mockUserAuth}>
                    <Forum />
                </userContext.Provider>
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/Chercher un sujet ici/i), { target: { value: 'test' } });
        fireEvent.click(screen.getByText(/Rechercher/i));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/forum/searchForum"), expect.anything());
        });
    });

});
