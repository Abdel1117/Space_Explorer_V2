import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { vi } from "vitest"
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';
import userContext from '../src/Context/userContext';
import Nav from '../../react_front/src/componants/navBarre/Nav'

const mockNavigate = vi.fn()
vi.mock("react-router-dom", () => ({
    ...vi.importActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

const mockUserContextValue = {
    userAuth: { userId: "testUserRole", userRole: "Admin" },
    logout: vi.fn()
};


describe("Testing the navigation between the page of the application", () => {
    it("Navigate to the right page when the button is clicked", () => {


        render(
            <userContext.Provider value={mockUserContextValue}>
                <Nav />
            </userContext.Provider>
        );
        /* Here we are goign to test the navigation to home page */

        const homeButton = screen.getAllByText(/Accueil/i);
        fireEvent.click(homeButton[0])

        expect(mockNavigate).toHaveBeenNthCalledWith(1, "/")


    });


})


describe("Testing the navigation between the page of the application", () => {
    it("Navigate to the right page when the button is clicked", () => {


        render(
            <userContext.Provider value={mockUserContextValue}>
                <Nav />
            </userContext.Provider>
        );
        /* Here we are goign to test the navigation to home page */

        const galerieButton = screen.getAllByText(/Galerie/i);
        fireEvent.click(galerieButton[0])

        expect(mockNavigate).toHaveBeenNthCalledWith(2, "/galerie")


    });

})


describe("Testing the navigation between the page of the application", () => {
    it("Navigate to the right page when the button is clicked", () => {


        render(
            <userContext.Provider value={mockUserContextValue}>
                <Nav />
            </userContext.Provider>
        );
        /* Here we are goign to test the navigation to home page */

        const ForumButton = screen.getAllByText(/Forum/i);
        fireEvent.click(ForumButton[0])

        expect(mockNavigate).toHaveBeenNthCalledWith(3, "/forum")


    });

})




describe("Testing the navigation between the page of the application", () => {
    it("Navigate to the right page when the button is clicked", () => {


        render(
            <userContext.Provider value={mockUserContextValue}>
                <Nav />
            </userContext.Provider>
        );
        /* Here we are goign to test the navigation to home page */

        const meSoutenirButton = screen.getAllByText(/Me Soutenir/i);
        fireEvent.click(meSoutenirButton[0])

        expect(mockNavigate).toHaveBeenNthCalledWith(4, "/soutenir")


    });

})

