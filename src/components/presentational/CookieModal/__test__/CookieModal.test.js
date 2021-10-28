import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import CookieModal from '../CookieModal';

let rendered;

let handleOk = jest.fn();

beforeEach(() => {
    rendered = render(
        <MemoryRouter>
            <CookieModal
                shouldHide={false}
                onOk={handleOk}
            />
        </MemoryRouter>
    );
});

it('should render modal', () => {
    let wrapper = screen.getByText(/This website uses cookie! And we advice it to you!/i);
    expect(wrapper).toBeInTheDocument();
});

it('should handle close click', () => {
    let button = rendered?.container.getElementsByTagName('button')[0];
    fireEvent.click(button);
    expect(handleOk.mock.calls.length).toEqual(1);
});
