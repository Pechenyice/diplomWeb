import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import InvalidRoute from '../404';

it('should render text', () => {
    render(
        <MemoryRouter>
            <InvalidRoute />
        </MemoryRouter>
    );
    let button = screen.getByText(/Back to main page/i);
    expect(button).toBeInTheDocument();
});

it('should render image', () => {
    render(
        <MemoryRouter>
            <InvalidRoute />
        </MemoryRouter>
    );
    let img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
});