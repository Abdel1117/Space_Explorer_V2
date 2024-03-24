import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CookieBanner } from '../src/componants/CookieBanner/CookieBanner';
import * as CookiesFunction from '../../react_front/src/Functions/CookiesFunction/CookiesFunction';
vi.mock('../../react_front/src/Functions/CookiesFunction/CookiesFunction', () => ({
    setCookie: vi.fn(),
}));

describe('CookieBanner Component', () => {

    it('affiche le banner et réagit correctement aux clics', async () => {
        render(<CookieBanner />);

        // Vérifier que le banner est affiché
        expect(screen.getByText('Les Cookies...')).toBeInTheDocument();

        // Simuler un clic sur le bouton "Accepter"
        fireEvent.click(screen.getByText('Accepter'));

        // Utilisez CookiesFunction.setCookie pour accéder à la fonction mockée
        expect(CookiesFunction.setCookie).toHaveBeenCalledWith("acceptCookie", "true");

        // Vérifier que le banner n'est plus affiché
        expect(screen.queryByText('Les Cookies...')).not.toBeInTheDocument();

        // Clear all mocks if necessary
        vi.clearAllMocks();

        // Re-rendering the component to test the "Refuser" button
        render(<CookieBanner />);

        // Simuler un clic sur le bouton "Refuser"
        fireEvent.click(screen.getByText('Refuser'));

        // Encore, utilisez CookiesFunction.setCookie pour l'assertion
        expect(CookiesFunction.setCookie).toHaveBeenCalledWith("acceptCookie", "false");

        // Vérifier de nouveau que le banner n'est plus affiché
        expect(screen.queryByText('Les Cookies...')).not.toBeInTheDocument();
    });
});