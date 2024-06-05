import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import PoloDoors from './PoloDoors';

test("Polo doors page renders successfully", () => {
    render(
        <MemoryRouter>
            <PoloDoors />
        </MemoryRouter>
    );
    
    const element = screen.getByLabelText(/Completed Polo Door/i);
    expect(element).toBeInTheDocument();
})