import Home from "../src/pages/Home/Home"
import { render, screen } from '@testing-library/react';

describe("Home", () => {
    it("render home page test", () => {
        render(<Home />)
    })
});