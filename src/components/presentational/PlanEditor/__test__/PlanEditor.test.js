import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import PlanEditor from '../PlanEditor';

let handleClear = jest.fn();
let handleNeedFetchEdition = jest.fn();
let handleInit = jest.fn();
let handleNullPlan = jest.fn();
let handleNeedCategories = jest.fn();
let handleNeedTypes = jest.fn();
let handleSubmit = jest.fn();
let handleError = jest.fn();

let rendered;

beforeEach(() => {
    rendered = render(
        <MemoryRouter>
            <PlanEditor
                planData={
                    {
                        data: {}
                    }
                }
                plan={
                    {
                        isChecked: false,
                        isLoading: false,
                        data: null
                    }
                }
                user={'0'}
                edition={false}
                onClear={handleClear}
                onError={handleError}
                onInit={handleInit}
                onNeedCategories={handleNeedCategories}
                onNeedTypes={handleNeedTypes}
                onNeedFetchEdition={handleNeedFetchEdition}
                onNullPlan={handleNullPlan}
                onSubmit={handleSubmit}
                match={
                    {
                        params: {
                            ownerId: '0'
                        }
                    }
                }
                categories={{ content: [{ id: 0, name: 'test' }] }}
                types={{ content: [{ id: 0, name: 'test' }] }}
            />
        </MemoryRouter>
    );
});

it('should render editor', () => {
    let wrapper = rendered?.container.getElementsByTagName('section')[0];
    expect(wrapper).toBeInTheDocument();
});

it('should throw error on submit empty values', async () => {
    let toSecond = screen.getByText(/Next step/i);
    fireEvent.click(toSecond);
    await new Promise((r) => setTimeout(r, 1000));
    let toThird = rendered?.container.getElementsByTagName('button')[0];
    fireEvent.click(toThird);
    await new Promise((r) => setTimeout(r, 1000));
    let button = screen.getByText(/create plan/i);
    fireEvent.click(button);
    expect(handleError.mock.calls.length).toEqual(1);
});

it('should submit not empty values', async () => {
    let name = rendered?.container.querySelector('#projectName');
    fireEvent.change(name, { target: { value: 'test' } });
    let desc = rendered?.container.getElementsByTagName('textarea')[0];
    fireEvent.change(desc, { target: { value: 'test' } });
    let toSecond = screen.getByText(/Next step/i);
    fireEvent.click(toSecond);
    await new Promise((r) => setTimeout(r, 1000));
    let salary = rendered?.container.querySelector('#projectSalary');
    fireEvent.change(salary, { target: { value: '123' } });
    let electricity = rendered?.container.querySelector('#projectElec');
    fireEvent.change(electricity, { target: { value: '123' } });
    let amortization = rendered?.container.querySelector('#projectAm');
    fireEvent.change(amortization, { target: { value: '123' } });
    let materials = rendered?.container.querySelector('#projectMat');
    fireEvent.change(materials, { target: { value: '123' } });
    let maintenance = rendered?.container.querySelector('#projectMaintenance');
    fireEvent.change(maintenance, { target: { value: '123' } });
    let toThird = rendered?.container.getElementsByTagName('button')[0];
    fireEvent.click(toThird);
    await new Promise((r) => setTimeout(r, 1000));
    let inc = rendered?.container.querySelector('#projectInc');
    fireEvent.change(inc, { target: { value: '123' } });
    let button = screen.getByText(/create plan/i);
    fireEvent.click(button);
    expect(handleSubmit.mock.calls.length).toEqual(1);

});
