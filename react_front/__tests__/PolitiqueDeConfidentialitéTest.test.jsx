import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PolitiqueDeConfidentialite } from '../src/pages/PolitiqueDeConfidentialite/PolitiqueDeConfidentialite';

describe('PolitiqueDeConfidentialite Component', () => {
    it('affiche les sections de la politique de confidentialité', () => {
        render(<PolitiqueDeConfidentialite />);

        expect(screen.getByText('Politique de confidentialité')).toBeInTheDocument();

        expect(screen.getByText('Collecte des renseignements personnels')).toBeInTheDocument();
        expect(screen.getByText('Formulaires et interactivité:')).toBeInTheDocument();
        expect(screen.getByText('Droit d’opposition et de retrait')).toBeInTheDocument();
        expect(screen.getByText('Droit d’accès')).toBeInTheDocument();
        expect(screen.getByText('Sécurité')).toBeInTheDocument();
        expect(screen.getByText('Législation')).toBeInTheDocument();


        expect(screen.getByText(/Devant le développement des nouveaux outils de communication/i)).toBeInTheDocument();
        expect(screen.getByText(/Nous nous engageons à respecter les dispositions législatives énoncées dans/i)).toBeInTheDocument();

    });

});
