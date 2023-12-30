import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from "../src/pages/Home/Home"
import { it } from 'node:test';
describe('Home', () => {
    describe("Home", () => {
        it("render home page test", () => {
            render(<Home />)
        })
    })
});