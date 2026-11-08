import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import AjoutArticle from '../src/componants/AjoutArticle/AjoutArticle';
import { useFetch } from '../src/Hooks/useFetch';

vi.mock('../src/Hooks/useFetch', () => ({ useFetch: vi.fn() }));

const LONG_BODY = '<p>' + 'Saturne est la sixième planète du Système solaire. '.repeat(10) + '</p>';

const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: BrowserRouter });
};

const fillForm = async (user) => {
    await user.type(screen.getByPlaceholderText("Titre de l'article"), '  Saturne  ');
    await user.click(screen.getByLabelText('Système Solaire'));
    await user.upload(screen.getByLabelText("Image représentant l'article"), new File(['png'], 'saturne.png', { type: 'image/png' }));
    fireEvent.change(screen.getByTestId('mock-ckeditor'), { target: { value: LONG_BODY } });
};

describe('AjoutArticle Component', () => {
    beforeEach(() => {
        useFetch.mockReset();
        renderWithRouter(<AjoutArticle />);
    });

    it('affiche un titre, un slug, une image et un seul éditeur, sans sections', () => {
        expect(screen.getByPlaceholderText('Titre de l\'article')).toBeInTheDocument();
        expect(screen.getAllByRole('radio')).toHaveLength(5);
        expect(screen.getByLabelText("Image représentant l'article")).toBeInTheDocument();
        expect(screen.getAllByTestId('mock-ckeditor')).toHaveLength(1);
        expect(screen.queryByText('Ajouter une Section')).not.toBeInTheDocument();
    });

    it('ne permet de choisir qu\'un seul slug', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByLabelText('Planète'));
        await user.click(screen.getByLabelText('Etoile'));

        expect(screen.getByLabelText('Planète')).not.toBeChecked();
        expect(screen.getByLabelText('Etoile')).toBeChecked();
    });

    it('affiche les erreurs et n\'envoie pas un formulaire incomplet', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByText('Publier article'));

        expect(await screen.findByText('Veuillez remplir ce champs avec un Titre')).toBeInTheDocument();
        expect(screen.getByText("Veuillez choisir une catégorie pour l'article")).toBeInTheDocument();
        expect(screen.getByText("Veuillez ajouter une image représentant l'article")).toBeInTheDocument();
        expect(screen.getByText('Veuillez écrire un article de 400 à 20000 caractères')).toBeInTheDocument();
        expect(useFetch).not.toHaveBeenCalled();
    });

    it('envoie le titre, le slug, l\'image et le contenu de l\'article', async () => {
        useFetch.mockResolvedValue({ status: 201, data: { message: 'Article crée avec succées' } });
        const user = userEvent.setup();
        await fillForm(user);
        await user.click(screen.getByText('Publier article'));

        await waitFor(() => expect(useFetch).toHaveBeenCalledTimes(1));
        const [url, method, body] = useFetch.mock.calls[0];
        expect(url).toMatch(/\/article\/ajoutArticle$/);
        expect(method).toBe('POST');
        expect(body.get('titre')).toBe('Saturne');
        expect(body.get('slug')).toBe('Systeme Solaire');
        expect(body.get('contenu')).toBe(LONG_BODY);
        expect(body.get('image').name).toBe('saturne.png');
        expect(await screen.findByText('Article crée avec succées')).toBeInTheDocument();
    });

    it('affiche le message d\'erreur renvoyé par l\'API', async () => {
        useFetch.mockResolvedValue({ status: 403, data: { message: 'Action réservée aux administrateurs' } });
        const user = userEvent.setup();
        await fillForm(user);
        await user.click(screen.getByText('Publier article'));

        expect(await screen.findByText('Action réservée aux administrateurs')).toBeInTheDocument();
    });
});
