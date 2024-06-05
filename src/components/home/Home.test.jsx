import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

test("Home page renders successfully", () => {
    render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>
    );

    const elements = screen.getAllByText(/BQ Doors/i);
    expect(elements.length).toBeGreaterThan(0);
})