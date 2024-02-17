import Connexion from '../src/pages/Connexion/Connexion';
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom'
import userContext from '../src/Context/userContext';


const mockUserContextValue = {
    setUserAuth: vi.fn(),
    userAuth: null
};

global.fetch = vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ message: 'Success', token: 'fakeToken' }),
    })
)

/* Mocking Response of the APi */
const mockApiResponse = [
    {

    }
]


describe("Connexion page to connect to our profil", () => {
    beforeEach(() => {
        vi.clearAllMocks()
        render(
            <userContext.Provider value={mockUserContextValue}>
                <Router>
                    <Connexion />
                </Router>
            </userContext.Provider>
        )
    })
    it("Render corrctly the page"), async () => {
        expect(screen.getByPlaceholderText('name@company.com')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument()
        vi.debug()
        console.log(screen)

    }

})