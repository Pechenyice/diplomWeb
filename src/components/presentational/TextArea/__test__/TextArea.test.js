import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextArea from '../TextArea';

let handleChange = jest.fn();

beforeEach(() => {
    render(
        <TextArea placeholder='test' onChange={handleChange} value='' />
    );
});

it('should render textarea', () => {
    let textarea = screen.getByPlaceholderText('test');
    expect(textarea).toBeInTheDocument();
});

it('should call onChange', () => {
    let textarea = screen.getByPlaceholderText('test');
    fireEvent.change(textarea, {target: {value: 'new value'}});
    fireEvent.change(textarea, {target: {value: 'and then new update'}});
    expect(handleChange.mock.calls.length).toBe(2);
});