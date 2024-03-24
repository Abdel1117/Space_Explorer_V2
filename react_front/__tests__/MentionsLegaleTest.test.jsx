import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MentionLegales } from '../src/pages/MentionsLegales/MentionLegales';

describe('MentionLegales Component', () => {
    it('affiche les titres et contenus de la page des mentions légales', () => {
        render(<MentionLegales />);

        // Vérifiez la présence du titre principal
        expect(screen.getByText('Mentions légales')).toBeInTheDocument();

        // Vérifiez la présence de sous-titres
        expect(screen.getByText('Définitions')).toBeInTheDocument();
        expect(screen.getByText('1. Présentation du site internet.')).toBeInTheDocument();
        expect(screen.getByText('2. Conditions générales d’utilisation du site et des services proposés.')).toBeInTheDocument();

        // Utilisez getAllByText pour récupérer tous les éléments contenant le texte et vérifiez qu'ils sont des liens
        const links = screen.getAllByText('https://space-explorer.fr').filter(link => link.closest('a'));
        links.forEach(linkElement => {
            expect(linkElement).toHaveAttribute('href', 'https://space-explorer.fr');
        });

        // Assurez-vous qu'au moins un lien est trouvé
        expect(links.length).toBeGreaterThan(0);

        // Ajoutez plus de vérifications selon les besoins de votre composant
    });

    // Vous pouvez ajouter d'autres tests pour vérifier d'autres fonctionnalités ou comportements spécifiques
});
