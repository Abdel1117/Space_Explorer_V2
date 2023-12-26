import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../src/App';

describe('App', () => {
    it('renders headline', () => {
        <Router>

            <App />;
        </Router>

        // check if App components renders headline
    });
});