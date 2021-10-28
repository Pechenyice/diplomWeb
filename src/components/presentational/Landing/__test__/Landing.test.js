import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Landing from '../Landing';

let rendered;

beforeEach(() => {
    rendered = render(
        <MemoryRouter>
            <Landing />
        </MemoryRouter>
    );
});

it('should render landing', () => {
    let wrapper = rendered?.container.getElementsByTagName('section')[0];
    expect(wrapper).toBeInTheDocument();
});
