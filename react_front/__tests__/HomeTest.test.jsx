import { expect } from "vitest";
import Home from "../src/pages/Home/Home"
import Article from "../src/componants/Article/Article"
import { render, screen } from '@testing-library/react';

describe("Home", () => {
    it("render home page test", () => {
        render(<Home />)
        const homeElement = screen.getAllByText("Space Explorer")
        expect(homeElement.length).toBeGreaterThan(0);
        expect(homeElement[0]).toHaveTextContent("Space Explorer");


    })
});

describe("Article rendering in homme", () => {
    it("render article in home page", () => {
        render(<Article />)
    })


})