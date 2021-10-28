import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Profile from '../Profile';

let handleNeedLoadOwnPlans = jest.fn();
let handleNeedLoadLikedPlans = jest.fn();
let handleNeedLoadDislikedPlans = jest.fn();
let handleNeedUserNickname = jest.fn();
let handleNeedCategories = jest.fn();
let handleNeedTypes = jest.fn();
let handleSaveProfileData = jest.fn();
let handleSaveProfilePassword = jest.fn();
let handleLogout = jest.fn();
let handleError = jest.fn();
let handleClear = jest.fn();

let rendered;

beforeEach(() => {
    rendered = render(
        <MemoryRouter>
            <Profile 
                userId={'0'}
                cachedForUser={'0'}
                businessman={'0'}
                login={'test'}
                nickname={'test'}
                userDataIsLoading={false}
                profilePlans={
                    {
                        own: {
                            isFetched: true,
                            isLoading: false,
                            content: [{}, {}]
                        },
                        liked: {
                            isFetched: true,
                            isLoading: false,
                            content: [{}]
                        },
                        disliked: {
                            isFetched: true,
                            isLoading: false,
                            content: [{}]
                        }
                    }
                }
                categories={{ content: [{ id: 0, name: 'test' }] }}
                types={{ content: [{ id: 0, name: 'test' }] }}
                location={
                    {
                        pathname: "/profile/own"
                    }
                }
                onClear={handleClear}
                onError={handleError}
                onLogout={handleLogout}
                onNeedCategories={handleNeedCategories}
                onNeedLoadDislikedPlans={handleNeedLoadDislikedPlans}
                onNeedLoadLikedPlans={handleNeedLoadLikedPlans}
                onNeedLoadOwnPlans={handleNeedLoadOwnPlans}
                onNeedTypes={handleNeedTypes}
                onNeedUserNickname={handleNeedUserNickname}
                onSaveProfileData={handleSaveProfileData}
                onSaveProfilePassword={handleSaveProfilePassword}
            />
        </MemoryRouter>
    );
});

it('should render preloder', () => {
    let wrapper = screen.getByText(/logout/i);
    expect(wrapper).toBeInTheDocument();
});

it('should create error on same nickname changing', () => {
    let button = screen.getByText(/apply changes/i);
    fireEvent.click(button);
    expect(handleError.mock.calls.length).toEqual(1);
});

it('should create error on empty nickname changing', () => {
    let input = rendered?.container.querySelector('#dataNickname');
    fireEvent.change(input, {target: {value: ''}});
    let button = screen.getByText(/apply changes/i);
    fireEvent.click(button);
    expect(handleError.mock.calls.length).toEqual(1);
});

it('should submit nickname changing', () => {
    let input = rendered?.container.querySelector('#dataNickname');
    fireEvent.change(input, {target: {value: 'new nickname'}});
    let button = screen.getByText(/apply changes/i);
    fireEvent.click(button);
    expect(handleSaveProfileData.mock.calls.length).toEqual(1);
});

it('should create error on empty password changing', () => {
    let button = screen.getAllByText(/change password/i)[1];
    fireEvent.click(button);
    expect(handleError.mock.calls.length).toEqual(1);
});

it('should create error on wrong copy password changing', () => {
    let oldPass = rendered?.container.querySelector('#oldPassPass');
    fireEvent.change(oldPass, {target: {value: 'old pass'}});
    let newPass = rendered?.container.querySelector('#passPass');
    fireEvent.change(newPass, {target: {value: 'new pass'}});
    let newRePass = rendered?.container.querySelector('#passRePass');
    fireEvent.change(newRePass, {target: {value: 'new wrong pass'}});
    let button = screen.getAllByText(/change password/i)[1];
    fireEvent.click(button);
    expect(handleError.mock.calls.length).toEqual(1);
});

it('should submit password changing', () => {
    let oldPass = rendered?.container.querySelector('#oldPassPass');
    fireEvent.change(oldPass, {target: {value: 'old pass'}});
    let newPass = rendered?.container.querySelector('#passPass');
    fireEvent.change(newPass, {target: {value: 'new pass'}});
    let newRePass = rendered?.container.querySelector('#passRePass');
    fireEvent.change(newRePass, {target: {value: 'new pass'}});
    let button = screen.getAllByText(/change password/i)[1];
    fireEvent.click(button);
    expect(handleSaveProfilePassword.mock.calls.length).toEqual(1);
});

it('should handle logout', () => {
    let button = screen.getByText(/logout/i);
    fireEvent.click(button);
    expect(handleLogout.mock.calls.length).toEqual(1);
});

it('should render right count of own businesses', () => {
    let span = rendered?.container.getElementsByClassName('profileLinkCount')[0];
    expect(span).toHaveTextContent("(2)");
});

it('and some other businesses', () => {
    let span = rendered?.container.getElementsByClassName('profileLinkCount')[1];
    expect(span).toHaveTextContent("(1)");
});
