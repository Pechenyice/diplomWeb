import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Input from '../Input';

let handleChange = jest.fn();
let handleFocus = jest.fn();

let rendered;

it('should render input', () => {
    rendered = render(
        <MemoryRouter>
            <Input
                id={'0'}
                label={'test input'}
                isEmpty={true}
                value={''}
                onChange={handleChange}
                onFocus={handleFocus}
                style={{}}
            />
        </MemoryRouter>
    );

    let wrapper = rendered?.container.getElementsByTagName('input')[0];
    expect(wrapper).toBeInTheDocument();
});

it('should trigger focus handler', () => {
    rendered = render(
        <MemoryRouter>
            <Input
                id={'0'}
                label={'test input'}
                isEmpty={true}
                value={''}
                onChange={handleChange}
                onFocus={handleFocus}
                style={{}}
            />
        </MemoryRouter>
    );

    let input = rendered?.container.getElementsByTagName('input')[0];
    fireEvent.focus(input);
    expect(handleFocus.mock.calls.length).toEqual(1);
});

it('should trigger change handler', () => {
    rendered = render(
        <MemoryRouter>
            <Input
                id={'0'}
                label={'test input'}
                isEmpty={true}
                value={''}
                onChange={handleChange}
                onFocus={handleFocus}
                style={{}}
            />
        </MemoryRouter>
    );

    let input = rendered?.container.getElementsByTagName('input')[0];
    fireEvent.change(input, {target: {value: 'new test value'}});
    expect(handleChange.mock.calls.length).toEqual(1);
});

it('should render password input', () => {
    rendered = render(
        <MemoryRouter>
            <Input
                id={'0'}
                label={'test input'}
                isEmpty={true}
                value={''}
                onChange={handleChange}
                onFocus={handleFocus}
                style={{}}
                password={true}
            />
        </MemoryRouter>
    );

    let wrapper = rendered?.container.getElementsByClassName('iconDePass')[0];
    expect(wrapper).toBeInTheDocument();
});

it('should render readonly input', () => {
    rendered = render(
        <MemoryRouter>
            <Input
                id={'0'}
                label={'test input'}
                isEmpty={true}
                value={''}
                onChange={handleChange}
                onFocus={handleFocus}
                style={{}}
                readonly={true}
            />
        </MemoryRouter>
    );

    let wrapper = rendered?.container.getElementsByClassName('icon')[0];
    expect(wrapper).toBeInTheDocument();
});
