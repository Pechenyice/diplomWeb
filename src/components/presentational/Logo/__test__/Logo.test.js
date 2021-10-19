import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Logo from '../Logo';

it('should render div', () => {
    render(
        <MemoryRouter>
            <Logo big={false} />
        </MemoryRouter>
    );
    let text = screen.getByText(/area/i);
    expect(text).toBeInTheDocument();
});

it('should render Link', () => {
    render(
        <MemoryRouter>
            <Logo big={true} />
        </MemoryRouter>
    );
    let text = screen.queryByText(/area/i);
    expect(text).not.toBeInTheDocument();
});