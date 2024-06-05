import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import Modal from './Modal';

test("Modal renders successfully", () => {
    const mockData = [{
        name: "test",
        quantity: 10,
        month: "June"
    }];
    const mockIsOpen = true;
    const mockOnClose = jest.fn();
    const mockTitle = "Test Modal";

    render(
        <MemoryRouter>
            <Modal isOpen={mockIsOpen} onClose={mockOnClose} title={mockTitle} data={mockData} />
        </MemoryRouter>
    );

    const element = screen.getByText(/Test Modal/i);
    expect(element).toBeInTheDocument();
})