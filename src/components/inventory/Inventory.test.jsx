import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import Inventory from './Inventory';

test("Inventory renders successfully", () => {
    render(
        <MemoryRouter>
            <Inventory />
        </MemoryRouter>
    );

    const elements = screen.getAllByText(/Inventory/i);
    expect(elements.length).toBeGreaterThan(0);
})