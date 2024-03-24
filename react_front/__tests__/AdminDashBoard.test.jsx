import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminDashBoard from '../src/componants/AdminDashBoard/Accueil';
import { BrowserRouter } from 'react-router-dom';

vi.stubGlobal('fetch', vi.fn());

const mockResponse = {
    Articles: 10,
    Images: 20,
    Users: 30,
};

describe('Accueil Component', () => {
    beforeEach(() => {
        fetch.mockClear();
        fetch.mockResolvedValue({
            json: vi.fn().mockResolvedValue(mockResponse),
        });
    });

    afterEach(() => {
        fetch.mockRestore();
    });

    it('affiche les données après le chargement', async () => {
        render(<AdminDashBoard />, { wrapper: BrowserRouter });

        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

        await waitFor(() => {
            expect(screen.getByText('Total Articles')).toBeInTheDocument();
            expect(screen.getByText('10')).toBeInTheDocument();
            expect(screen.getByText('Total Images')).toBeInTheDocument();
            expect(screen.getByText('20')).toBeInTheDocument();
        });
    });
});
