import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Preloader from '../Preloader';

let handleInitAuthCheck = jest.fn();

let rendered;

beforeEach(() => {
    rendered = render(
        <MemoryRouter>
            <Preloader onInitAuthCheck={handleInitAuthCheck} isChecking={true}/>
        </MemoryRouter>
    );
});

it('should render preloder', () => {
    let wrapper = rendered?.container.getElementsByTagName('section')[0];
    expect(wrapper).toBeInTheDocument();
});

it('should start init check', () => {
    expect(handleInitAuthCheck.mock.calls.length).toEqual(1);
});
