import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Select from '../Select';

let handleSelection = jest.fn();

let rendered = null;

beforeEach(() => {
    rendered = render(
        <Select content={'test'} propsValues={[{id: 0, name: 'test'}, {id: 1, name: 'other value'},]} onSelect={handleSelection} />
    );
});

it('should render select', () => {
    let select = screen.getByText(/:/i);
    expect(select).toBeInTheDocument();
});

it('should render propsValues', () => {
    let selected = screen.getAllByText(/test/i);
    expect(selected.length).toBeGreaterThan(0);
});

it('should not be opened onDefault', () => {
    let openable = rendered?.container.getElementsByClassName('selectWrapper')[0];
    expect(openable.classList).not.toContain('selectWrapperActive');
});

it('should not be opened after switch openState', () => {
    let openable = rendered?.container.getElementsByClassName('selectWrapper')[0];
    fireEvent.click(openable)
    expect(openable.classList).toContain('selectWrapperActive');
});

it('should call onSelect', () => {
    let selectable = rendered?.container.getElementsByClassName('selectElement')[0];
    fireEvent.click(selectable);
    expect(handleSelection.mock.calls.length).toBe(1);
});