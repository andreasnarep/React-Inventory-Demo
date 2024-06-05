import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

test("Header renders successfully", () => {
    render(
        <MemoryRouter>
            <Header selectedItem="" />
        </MemoryRouter>
    );
    
    const element = screen.getByText(/MAIN PAGE/i);
    expect(element).toBeInTheDocument();
})