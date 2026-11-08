import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { EditSujet } from '../src/componants/EditEntity/EditSujet/EditSujet';

const BODY = '<p>' + 'Saturne est la sixième planète du Système solaire. '.repeat(10) + '</p>';
const ARTICLE = { _id: 'abc123', Title: 'Saturne', Slug: 'Etoile', Image: 'saturne_1.png', Contenu: BODY };

const renderEdit = () => render(
    <MemoryRouter initialEntries={['/editSujet/abc123']}>
        <Routes>
            <Route path='/editSujet/:id' element={<EditSujet />} />
        </Routes>
    </MemoryRouter>
);

describe('Modification d\'un article', () => {
    let fetchMock;

    beforeEach(() => {
        sessionStorage.setItem('token', 'jwt-admin');
        fetchMock = vi.fn((url, options = {}) => Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(options.method === 'PUT' ? { message: 'Article modifié avec succès' } : ARTICLE)
        }));
        vi.stubGlobal('fetch', fetchMock);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        sessionStorage.clear();
    });

    it('pré-remplit le formulaire avec l\'article', async () => {
        renderEdit();

        expect(await screen.findByDisplayValue('Saturne')).toBeInTheDocument();
        expect(screen.getByLabelText('Etoile')).toBeChecked();
        expect(screen.getByTestId('mock-ckeditor')).toHaveValue(BODY);
        expect(screen.getByAltText("Aperçu de l'image de l'article").getAttribute('src')).toMatch(/\/saturne_1\.png$/);
        expect(screen.getByText("Laissez vide pour garder l'image actuelle")).toBeInTheDocument();
    });

    it('enregistre sans nouvelle image avec le token de l\'administrateur', async () => {
        const user = userEvent.setup();
        renderEdit();
        await screen.findByDisplayValue('Saturne');

        await user.click(screen.getByLabelText('Planète'));
        await user.click(screen.getByText('Enregistrer les modifications'));

        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
        const [url, options] = fetchMock.mock.calls[1];
        expect(url).toMatch(/\/article\/editArticle\/abc123$/);
        expect(options.method).toBe('PUT');
        expect(options.headers.authorization).toBe('Bearer jwt-admin');
        expect(options.body.get('titre')).toBe('Saturne');
        expect(options.body.get('slug')).toBe('Planète');
        expect(options.body.get('contenu')).toBe(BODY);
        expect(options.body.has('image')).toBe(false);
        expect(await screen.findByText('Article modifié avec succès. Que voulez-vous faire ?')).toBeInTheDocument();
    });
});
