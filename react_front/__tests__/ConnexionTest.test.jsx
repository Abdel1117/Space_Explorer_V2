import Connexion from '../src/pages/Connexion/Connexion';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from "vitest"
import '@testing-library/jest-dom';
import userContext from "../src/Context/userContext";



const mockUserContextValue = {
    setUserAuth: vi.fn(),
    userAuth: null
};

global.fetch = vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ message: 'Success', token: 'fakeToken' }),
    })
)


describe("Connexion page to connect to our profil", () => {

    it("Render corrctly the page"), async () => {
        render(
            <userContext.Provider value={mockUserContextValue}>
                <Connexion />
            </userContext.Provider>
        )
        expect(screen.getByPlaceholderText('name@companyy.com')).toBeInTheDocument()
        console.log(expect(screen.getByPlaceholderText("name@company.com")))
        expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument()

    }

    it("Submit Form"), async () => {

        render(
            <Connexion />
        )




    }
    
})