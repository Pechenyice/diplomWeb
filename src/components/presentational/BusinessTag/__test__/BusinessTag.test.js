import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import BusinessTag from '../BusinessTag';

let rendered;

beforeEach(() => {
    rendered = render(
        <MemoryRouter>
            <BusinessTag
               text={'test'}
               theme={'type'}
            />
        </MemoryRouter>
    );
});

it('should render tag', () => {
    let tag = screen.getByText(/test/i);
    expect(tag).toBeInTheDocument();
});

it('should render type tag', () => {
    let tag = rendered?.container.getElementsByClassName('typeThemeTag')[0];
    expect(tag).toBeInTheDocument();
});
