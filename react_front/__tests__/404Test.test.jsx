import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Error_404_Page from '../src/pages/404/Error_404_Page'; // Ajustez le chemin selon votre structure de projet

describe('Error_404_Page Component', () => {
    it('affiche le contenu correctement', () => {
        render(<Error_404_Page />);

        // Vérifier que le texte "404" est présent
        expect(screen.getByText('404')).toBeInTheDocument();

        // Vérifier que la description de l'erreur est présente
        expect(screen.getByText(/Désolé nous n'avons pas réussi à trouvé votre page Web./i)).toBeInTheDocument();

        // Vérifier que le bouton pour revenir à l'accueil est présent
        expect(screen.getByText('Revenir à la page d\'Accueil')).toBeInTheDocument();

        // Vérifier que l'image est présente
        expect(screen.getByAltText('Space_Explorer_Logo')).toBeInTheDocument();
    });
});
