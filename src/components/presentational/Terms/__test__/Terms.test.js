import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Terms from '../Terms';

it('should render main heading', () => {
    render(
        <Terms />
    );
    let heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
});

it('should render text', () => {
    render(
        <Terms />
    );
    let text = screen.getByText(/Lorem ipsum/i);
    expect(text).toBeInTheDocument();
});