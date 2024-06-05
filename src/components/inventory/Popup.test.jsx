import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import Popup from './Popup';

test("Popup renders successfully", () => {
    const mockData = [{
        name: "test",
        quantity: 10
    }];
    const mockIsOpen = true;
    const mockOnClose = jest.fn();

    render(
        <MemoryRouter>
            <Popup isOpen={mockIsOpen} onClose={mockOnClose} clickedItem={mockData} />
        </MemoryRouter>
    );

    const element = screen.getByText(/Change Quantity/i);
    expect(element).toBeInTheDocument();
})