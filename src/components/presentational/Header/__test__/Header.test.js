import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Header';

let rendered;

beforeEach(() => {
    rendered = render(
        <MemoryRouter>
            <Header />
        </MemoryRouter>
    );
});

it('should render header', () => {
    let wrapper = rendered?.container.getElementsByTagName('header')[0];
    expect(wrapper).toBeInTheDocument();
});
