import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../Footer';

let rendered;

beforeEach(() => {
    rendered = render(
        <MemoryRouter>
            <Footer />
        </MemoryRouter>
    );
});

it('should render footer', () => {
    let wrapper = rendered?.container.getElementsByTagName('footer')[0];
    expect(wrapper).toBeInTheDocument();
});
