import { expect } from "vitest";
import { UserDashBoard } from "../src/pages/UserDashBoard/UserDashBoard.jsx"
import { Aside } from "../src/componants/aside/Aside.jsx"
import { fireEvent, render, screen } from '@testing-library/react';
import userContext from "../src/Context/userContext";



const mockUserContextValue = {
    userAuth: { userId: "testUserRole", userRole: "Admin" },
    logout: vi.fn()
};

describe("UserDashBoard", () => {
    it("Render UserDashBoard page ", () => {
        render(
            <userContext.Provider value={mockUserContextValue}>
                <UserDashBoard />
            </userContext.Provider>
        )

    })

    it("Test the click in the dashBoard", () => {

        render(
            <userContext.Provider value={mockUserContextValue}>
                <UserDashBoard />
            </userContext.Provider>
        )
        console.log(screen)
        expect(screen.getByText(/Loading .../i)).toBeInTheDocument();
    })

});

