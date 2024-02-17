import { expect } from "vitest";
import { UserDashBoard } from "../src/pages/UserDashBoard/UserDashBoard.jsx"
import { render, screen } from '@testing-library/react';

describe("UserDashBoard", () => {
    it("Render UserDashBoard page ", () => {
        render(<UserDashBoard />)

    })
});

