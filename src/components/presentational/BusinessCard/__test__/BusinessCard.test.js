import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import BusinessCard from '../BusinessCard';

let rendered;

beforeEach(() => {
    rendered = render(
        <MemoryRouter>
            <BusinessCard
                categories={{ content: [{ id: 0, name: 'test' }] }}
                types={{ content: [{ id: 0, name: 'test' }] }}
                data={{
                    id: 0,
                    editions: [
                        {
                            id: 0,
                            content: {
                                type: 0,
                                category: 0,
                                name: 'test name',
                                description: 'test',
                                likes: 123,
                                dislikes: 321
                            }
                        }
                    ] 
                }}
            />
        </MemoryRouter>
    );
});

it('should render card', () => {
    let input = screen.getByText(/test name/i);
    expect(input).toBeInTheDocument();
});

it('should render card data', () => {
    let likes = screen.getByText(/123/i);
    expect(likes).toBeInTheDocument();
});
