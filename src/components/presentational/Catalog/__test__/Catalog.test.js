import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Catalog from '../Catalog';

let rendered;

let handleInit = jest.fn();
let handleNeedMoreBusinesses = jest.fn();
let handleFiltersSelected = jest.fn();

beforeEach(() => {
    rendered = render(
        <MemoryRouter>
            <Catalog
                categories={{ content: [{ id: 0, name: 'test' }] }}
                types={{ content: [{ id: 0, name: 'test' }] }}
                onInit={handleInit}
                onFiltersSelected={handleFiltersSelected}
                onNeedMoreBusinesses={handleNeedMoreBusinesses}
                businesses={
                    {
                        needMore: false,
                        isLoading: false,
                        count: 0,
                        content: [

                        ]
                    }
                }
                shouldDisplayFilters={true}
                filters={
                    {
                        category: -1,
                        type: -1,
                        sort: 0,
                        pattern: "",
                    }
                }
            />
        </MemoryRouter>
    );
});

it('should render catalog', () => {
    let wrapper = screen.getByText(/catalog/i);
    expect(wrapper).toBeInTheDocument();
});

it('should search with input value', () => {
    let input = screen.getByPlaceholderText(/Search.../i);
    fireEvent.change(input, {target: {value: 'new test value'}});
    let button = rendered?.container.getElementsByTagName('button')[0];
    fireEvent.click(button);
    expect(handleFiltersSelected.mock.calls.length).toEqual(1);
});

it('and fetch new businesses', () => {
    let input = screen.getByPlaceholderText(/Search.../i);
    fireEvent.change(input, {target: {value: 'new test value'}});
    let button = rendered?.container.getElementsByTagName('button')[0];
    fireEvent.click(button);
    expect(handleNeedMoreBusinesses.mock.calls.length).toEqual(1);
});
