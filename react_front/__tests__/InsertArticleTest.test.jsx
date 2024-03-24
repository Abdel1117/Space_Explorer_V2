import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom'; // Importation ajoutée ici
import AjoutArticle from '../src/componants/AjoutArticle/AjoutArticle'; // Ajustez le chemin d'importation selon votre structure de projet

const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: BrowserRouter });
};

describe('AjoutArticle Component', () => {
    beforeEach(() => {
        renderWithRouter(<AjoutArticle />);
    });

    it('devrait afficher le formulaire de l\'article', () => {
        expect(screen.getByPlaceholderText('Titre de l\'article')).toBeInTheDocument();
    });

});
