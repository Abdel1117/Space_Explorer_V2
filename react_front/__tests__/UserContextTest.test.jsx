import { render, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserProvider, useAuth } from '../src/Context/userContext';
import * as TokenHooks from '../src/Hooks/useCheckToken';
import * as RefreshTokenHook from '../src/Hooks/useRefreshToken';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
    const originalModule = await vi.importActual('react-router-dom');
    return {
        ...originalModule,
        useNavigate: vi.fn(() => vi.fn()),
    };
});

// Mock des Hooks et des fonctions de gestion de token
vi.mock('../src/Hooks/useCheckToken', () => ({
    getToken: vi.fn(),
    setToken: vi.fn(),
    checkToken: vi.fn(),
}));

vi.mock('../src/Hooks/useRefreshToken', () => ({
    useRefreshToken: vi.fn(),
}));

const MockComponent = () => {
    const { logout, userAuth, isLoading, authError } = useAuth();
    return (
        <div>
            {isLoading && <span>Loading...</span>}
            {userAuth && <span>User is authenticated</span>}
            {!userAuth && !isLoading && <span>No user</span>}
            {authError && <span>Error: {authError}</span>}
            <button onClick={logout}>Logout</button>
        </div>
    );
};

describe('UserProvider', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        // Effacer les données stockées avant chaque test.
        window.sessionStorage.clear();
        // Mock des fonctions qui interagissent avec le sessionStorage.
        vi.spyOn(window.sessionStorage, 'setItem');
        vi.spyOn(window.sessionStorage, 'removeItem');
        // Configurer les mocks des fonctions personnalisées.
        TokenHooks.getToken.mockReturnValue('existing-token');
    });


    it('initialises with no user if no token is found', async () => {
        TokenHooks.getToken.mockReturnValueOnce(null);
        const { findByText } = render(
            <MemoryRouter>
                <UserProvider>
                    <MockComponent />
                </UserProvider>
            </MemoryRouter>
        );
        expect(await findByText('No user')).toBeInTheDocument();
    });

    it('sets user on successful token check', async () => {
        TokenHooks.checkToken.mockResolvedValueOnce({
            status: 200,
            json: async () => ({ user: 'testUser' }),
        });

        const { findByText } = render(
            <MemoryRouter>
                <UserProvider>
                    <MockComponent />
                </UserProvider>
            </MemoryRouter>
        );

        expect(await findByText('User is authenticated')).toBeInTheDocument();
    });

    it('handles token refresh on 401 response', async () => {
        TokenHooks.checkToken.mockResolvedValueOnce({ status: 401 });
        RefreshTokenHook.useRefreshToken.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ accessToken: 'new-access-token' }),
        });

        const { findByText } = render(
            <MemoryRouter>
                <UserProvider>
                    <MockComponent />
                </UserProvider>
            </MemoryRouter>
        );

        expect(await findByText('User is authenticated')).toBeInTheDocument();
        expect(window.sessionStorage.setItem).toHaveBeenCalledWith('token', 'new-access-token');
    });

    it('logs out on token refresh failure', async () => {
        TokenHooks.checkToken.mockResolvedValueOnce({ status: 401 });
        RefreshTokenHook.useRefreshToken.mockResolvedValueOnce({ ok: false });

        const { findByText } = render(
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route path="/" element={<span>Home</span>} />
                    <Route path="/protected" element={
                        <UserProvider>
                            <MockComponent />
                        </UserProvider>
                    } />
                </Routes>
            </MemoryRouter>
        );

        expect(await findByText('No user')).toBeInTheDocument();
        expect(window.sessionStorage.removeItem).toHaveBeenCalledWith('token');
    });

});
