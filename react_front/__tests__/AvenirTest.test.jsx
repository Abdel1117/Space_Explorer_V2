import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Avenir from '../src/pages/Avenir/Avenir';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => ({
    ...(await vi.importActual('react-router-dom')),
    useNavigate: () => mockNavigate
}));

describe('Page A venir', () => {
    it('présente les trois fonctionnalités à venir', () => {
        render(<Avenir />);

        expect(screen.getByRole('heading', { level: 1, name: 'Ce qui arrive sur Space Explorer' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: 'Le Système solaire en 3D' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: 'Une page vidéo' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: 'Un chat en direct' })).toBeInTheDocument();
    });

    it('renvoie vers le forum pour proposer une idée', () => {
        render(<Avenir />);

        fireEvent.click(screen.getByRole('button', { name: /Aller au forum/i }));

        expect(mockNavigate).toHaveBeenCalledWith('/forum');
    });
});
