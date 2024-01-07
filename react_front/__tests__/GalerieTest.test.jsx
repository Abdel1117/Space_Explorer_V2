import Galerie from "../src/pages/Galerie/Galerie"
import { render, screen } from '@testing-library/react';

describe("Galerie", () => {
    it("render Galerie page with image", () => {
        render(<Galerie />)
    })
});