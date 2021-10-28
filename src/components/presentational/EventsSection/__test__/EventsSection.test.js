import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import EventsSection from '../EventsSection';

let rendered;

let handleRemoveError = jest.fn();
let handleRemoveSuccess = jest.fn();

beforeEach(() => {
    rendered = render(
        <MemoryRouter>
            <EventsSection
                errors={[
                    {
                        id: 0,
                        type: 'error',
                        text: 'test error'
                    }
                ]}
                successes={[
                    {
                        id: 1,
                        type: 'success',
                        text: 'test success'
                    }
                ]}
                onRemoveError={handleRemoveError}
                onRemoveSuccess={handleRemoveSuccess}
            />
        </MemoryRouter>
    );
});

it('should render section', () => {
    let wrapper = rendered?.container.getElementsByTagName('section')[0];
    expect(wrapper).toBeInTheDocument();
});

it('should render events', () => {
    let events = rendered?.container.getElementsByClassName('event');
    expect(events.length).toEqual(2);
});

it('should handle error deletion', () => {
    let error = rendered?.container.getElementsByClassName('event')[0];
    fireEvent.click(error);
    expect(handleRemoveError.mock.calls.length).toEqual(1);
});

it('should handle success deletion', () => {
    let success = rendered?.container.getElementsByClassName('event')[1];
    fireEvent.click(success);
    expect(handleRemoveSuccess.mock.calls.length).toEqual(1);
});
