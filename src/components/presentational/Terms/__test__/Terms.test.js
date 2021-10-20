import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Terms from '../Terms';

beforeEach(() => {
    render(
        <Terms />
    );
});

it('should render main heading', () => {
    let heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
});

it('should render text', () => {
    let text = screen.getByText(/Lorem ipsum/i);
    expect(text).toBeInTheDocument();
});