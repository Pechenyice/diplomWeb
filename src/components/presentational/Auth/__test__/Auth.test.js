import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Auth from '../Auth';

let handleError = jest.fn();
let handleSignUp = jest.fn();
let handleSignIn = jest.fn();

let rendered;

beforeEach(() => {
    rendered = render(
        <MemoryRouter>
            <Auth location={{}} onError={handleError} onSignIn={handleSignIn} onSignUp={handleSignUp} isLoading={false} isLogged={false} />
        </MemoryRouter>
    );
});

it('should render inputs', () => {
    let input = screen.getByText(/Repeat password/i);
    expect(input).toBeInTheDocument();
});

it('should not access empty sign in inputs', () => {
    let signInButton = rendered?.container.getElementsByTagName('button')[0];
    fireEvent.click(signInButton);
    expect(handleSignIn.mock.calls.length).toEqual(0);
});


it('should show error in this case btw', () => {
    let signInButton = rendered?.container.getElementsByTagName('button')[0];
    fireEvent.click(signInButton);
    expect(handleError.mock.calls.length).toEqual(1);
});

it('should access not empty sign in inputs', () => {
    let loginInput = rendered?.container.getElementsByTagName('input')[0];
    fireEvent.change(loginInput, {target: {value: 'new value'}});
    let passwordInput = rendered?.container.getElementsByTagName('input')[1];
    fireEvent.change(passwordInput, {target: {value: 'new value'}});
    let signInButton = rendered?.container.getElementsByTagName('button')[0];
    fireEvent.click(signInButton);
    expect(handleSignIn.mock.calls.length).toEqual(1);
});

it('should not access empty sign up inputs', () => {
    let signUpButton = rendered?.container.getElementsByTagName('button')[1];
    fireEvent.click(signUpButton);
    expect(handleSignUp.mock.calls.length).toEqual(0);
});

it('should not access not empty sign up inputs without agreement', () => {
    let firstInput = rendered?.container.getElementsByTagName('input')[2];
    fireEvent.change(firstInput, {target: {value: 'new value'}});
    let secondInput = rendered?.container.getElementsByTagName('input')[3];
    fireEvent.change(secondInput, {target: {value: 'new value'}});
    let thirdInput = rendered?.container.getElementsByTagName('input')[4];
    fireEvent.change(thirdInput, {target: {value: 'new value'}});
    let fourthInput = rendered?.container.getElementsByTagName('input')[5];
    fireEvent.change(fourthInput, {target: {value: 'new value'}});
    let signUpButton = rendered?.container.getElementsByTagName('button')[1];
    fireEvent.click(signUpButton);
    expect(handleSignUp.mock.calls.length).toEqual(0);
});
