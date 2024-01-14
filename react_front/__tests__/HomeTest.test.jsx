import { expect } from "vitest";
import Home from "../src/pages/Home/Home"
import { render, screen } from '@testing-library/react';

describe("Home", () => {
    it("render home page test", () => {
        render(<Home />)
        const homeElement = screen.getAllByText("Mon Titre")
        expect(homeElement.length).toBeGreaterThan(0);
        expect(homeElement[0]).toHaveTextContent("Mon Titre");


    })
});