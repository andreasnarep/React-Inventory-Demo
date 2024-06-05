import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import BQDoors from './BQDoors';

test("BQ doors page renders successfully", () => {
    render(
        <MemoryRouter>
            <BQDoors />
        </MemoryRouter>
    );

    const element = screen.getByLabelText(/Completed BQ Door/i);
    expect(element).toBeInTheDocument();
})