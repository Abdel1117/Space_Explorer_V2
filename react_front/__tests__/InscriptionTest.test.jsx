import Inscription from "../src/pages/Inscription/Inscription";
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from "vitest"
import '@testing-library/jest-dom';
import userContext from "../src/Context/userContext";




/* Mocking the useNavigate hooks*/
const mockNavigate = vi.fn()
vi.mock("react-router-dom", () => ({
    ...vi.importActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

/* Mocking the User context */
const mockUserContextValue = {
    userAuth: null
}



describe("Inscription page", () => {
    it("renders Inscription page correctly", async () => {

        render(
            <userContext.Provider value={mockUserContextValue}>

                <Inscription />
            </userContext.Provider>

        );

        // Ensure that all necessary elements are rendered
        expect(screen.getByText(/Rejoindre la communauté de Space Explorer/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Votre Pseudo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Votre Email/i)).toBeInTheDocument();
        expect(screen.getByTestId("passwordInput")).toBeInTheDocument();
        expect(screen.getByLabelText(/Confirmer votre mot de passe/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/J'accepte les Termes et Conditions d'utilisation/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Crée votre compte/i })).toBeInTheDocument();
    });

    it("fills out the registration form and submits successfully", async () => {

        afterEach(() => {
            vi.restoreAllMocks();
        });
        /* Mocking the API reponse 201 */
        const mockRequest = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ message: "Inscription réussie" }), // Simulate successful response
                status: 201,
            })
        );


        render(
            <userContext.Provider value={mockUserContextValue}>

                <Inscription />
            </userContext.Provider>

        );
        fireEvent.change(screen.getByLabelText(/Votre Pseudo/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/Votre Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByTestId("passwordInput"), { target: { value: 'TestPassword123!' } });
        fireEvent.change(screen.getByLabelText(/Confirmer votre mot de passe/i), { target: { value: 'TestPassword123!' } });
        fireEvent.click(screen.getByLabelText(/J'accepte les Termes et Conditions d'utilisation/i));
        fireEvent.click(screen.getByRole('button', { name: /Crée votre compte/i }));

    });

    it("shows validation errors if form fields are invalid", async () => {

        /* Mocking the API reponse 201 */
        const mockRequest = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ message: "Inscription réussie" }), // Simulate successful response
                status: 201,
            })
        );
        render(
            <userContext.Provider value={mockUserContextValue}>

                <Inscription />
            </userContext.Provider>

        );
        fireEvent.change(screen.getByLabelText(/Votre Pseudo/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/Votre Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByTestId("passwordInput"), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/Confirmer votre mot de passe/i), { target: { value: 'TestPassword123!' } });
        fireEvent.click(screen.getByLabelText(/J'accepte les Termes et Conditions d'utilisation/i));
        fireEvent.click(screen.getByRole('button', { name: /Crée votre compte/i }));


        expect(async () => {
            await screen.findAllByRole("alert").toHaveLength(1), 3000
        })
        expect(mockRequest).not.toHaveBeenCalled()
    });
});