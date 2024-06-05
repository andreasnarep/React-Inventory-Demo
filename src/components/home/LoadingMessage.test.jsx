import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import LoadingMessage from './LoadingMessage';

test("Loading message renders successfully", () => {
    render(
        <MemoryRouter>
            <LoadingMessage />
        </MemoryRouter>
    );

    const element = screen.getByText(/Loading Data.../i);
    expect(element).toBeInTheDocument();
})