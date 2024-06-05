import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import BQWindows from './BQWindows';

test("BQ windows page renders successfully", () => {
    render(
        <MemoryRouter>
            <BQWindows />
        </MemoryRouter>
    );
    
    const element = screen.getByLabelText(/Completed BQ Window/i);
    expect(element).toBeInTheDocument();
})