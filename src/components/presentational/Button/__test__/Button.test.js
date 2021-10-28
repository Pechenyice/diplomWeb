import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Button from '../Button';

let rendered;

let handleClick = jest.fn();

beforeEach(() => {
    rendered = render(
        <MemoryRouter>
            <Button
               text={'test'}
               onClick={handleClick}
            />
        </MemoryRouter>
    );
});

it('should render button', () => {
    let button = screen.getByText(/test/i);
    expect(button).toBeInTheDocument();
});

it('should handle click', () => {
    let button = screen.getByText(/test/i);
    fireEvent.click(button);
    expect(handleClick.mock.calls.length).toEqual(1);
});
