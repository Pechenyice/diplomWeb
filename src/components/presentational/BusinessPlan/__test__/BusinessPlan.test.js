import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import BusinessPlan from '../BusinessPlan';

let handleInit = jest.fn();
let handleNullPlan = jest.fn();
let handleClear = jest.fn();
let handleError = jest.fn();
let handlePublishComment = jest.fn();
let handleNeedMoreComments = jest.fn();
let handleNeedServerData = jest.fn();
let handlePlanDeleted = jest.fn();
let handleUserReact = jest.fn();

let rendered;

describe('owner tests', () => {
    beforeEach(() => {
        rendered = render(
            <MemoryRouter>
                <BusinessPlan
                    plan={
                        {
                            data: {
                                name: 'test plan',
                                created: new Date().getTime(),
                                type: 0,
                                category: 0,
                                liked: false,
                                likes: 123,
                                disliked: false,
                                dislikes: 321,
                                description: 'test',
                                income: {
                                    description: 'test income'
                                },
                                expence: {
                                    description: 'test expence'
                                }
                            },
                            comments: {
                                content: []
                            },
                            editions: [
                                {
                                    id: 0,
                                    content: {
                                        created: new Date().getTime(),
                                    }
                                }
                            ],
                            isLoading: false,
                            activeOwner: '1'
                        }
                    }
                    user={'1'}
                    planActions={
                        {
                            reactionIsUpdating: false
                        }
                    }
                    categories={{ content: [{ id: 0, name: 'test' }] }}
                    types={{ content: [{ id: 0, name: 'test' }] }}
                    onInit={handleInit}
                    onClear={handleClear}
                    onError={handleError}
                    onNeedMoreComments={handleNeedMoreComments}
                    onNeedServerData={handleNeedServerData}
                    onNullPlan={handleNullPlan}
                    onPlanDeleted={handlePlanDeleted}
                    onPublishComment={handlePublishComment}
                    onUserReact={handleUserReact}
                    testMode={true}
                />
            </MemoryRouter>
        );
    });

    it('should render controls', () => {
        let control = screen.getByText(/Delete/);
        expect(control).toBeInTheDocument();
    });

    it('should delete plan with controls action from user', () => {
        let control = screen.getByText(/Delete/);
        fireEvent.click(control);
        let agreement = screen.getByText(/Yes/);
        fireEvent.click(agreement);
        expect(handlePlanDeleted.mock.calls.length).toEqual(1);
    });
})

describe('other user tests', () => {
    beforeEach(() => {
        rendered = render(
            <MemoryRouter>
                <BusinessPlan
                    plan={
                        {
                            data: {
                                name: 'test plan',
                                created: new Date().getTime(),
                                type: 0,
                                category: 0,
                                liked: false,
                                likes: 123,
                                disliked: false,
                                dislikes: 321,
                                description: 'test',
                                income: {
                                    description: 'test income'
                                },
                                expence: {
                                    description: 'test expence'
                                }
                            },
                            comments: {
                                content: []
                            },
                            editions: [
                                {
                                    id: 0,
                                    content: {
                                        created: new Date().getTime(),
                                    }
                                }
                            ],
                            isLoading: false,
                            activeOwner: '2'
                        }
                    }
                    user={'1'}
                    planActions={
                        {
                            reactionIsUpdating: false
                        }
                    }
                    categories={{ content: [{ id: 0, name: 'test' }] }}
                    types={{ content: [{ id: 0, name: 'test' }] }}
                    onInit={handleInit}
                    onClear={handleClear}
                    onError={handleError}
                    onNeedMoreComments={handleNeedMoreComments}
                    onNeedServerData={handleNeedServerData}
                    onNullPlan={handleNullPlan}
                    onPlanDeleted={handlePlanDeleted}
                    onPublishComment={handlePublishComment}
                    onUserReact={handleUserReact}
                    testMode={true}
                />
            </MemoryRouter>
        );
    });

    it('should not render controls', () => {
        let control = screen.queryByText(/Delete/);
        expect(control).not.toBeInTheDocument();
    });
})

describe('common', () => {
    beforeEach(() => {
        rendered = render(
            <MemoryRouter>
                <BusinessPlan
                    plan={
                        {
                            data: {
                                name: 'test plan',
                                created: new Date().getTime(),
                                type: 0,
                                category: 0,
                                liked: false,
                                likes: 123,
                                disliked: false,
                                dislikes: 321,
                                description: 'test',
                                income: {
                                    description: 'test income'
                                },
                                expence: {
                                    description: 'test expence'
                                }
                            },
                            comments: {
                                content: []
                            },
                            editions: [
                                {
                                    id: 0,
                                    content: {
                                        created: new Date().getTime(),
                                    }
                                }
                            ],
                            isLoading: false,
                            activeOwner: '1'
                        }
                    }
                    user={'1'}
                    planActions={
                        {
                            reactionIsUpdating: false
                        }
                    }
                    categories={{ content: [{ id: 0, name: 'test' }] }}
                    types={{ content: [{ id: 0, name: 'test' }] }}
                    onInit={handleInit}
                    onClear={handleClear}
                    onError={handleError}
                    onNeedMoreComments={handleNeedMoreComments}
                    onNeedServerData={handleNeedServerData}
                    onNullPlan={handleNullPlan}
                    onPlanDeleted={handlePlanDeleted}
                    onPublishComment={handlePublishComment}
                    onUserReact={handleUserReact}
                    testMode={true}
                />
            </MemoryRouter>
        );
    });

    it('should render plan', () => {
        let name = screen.getByText(/test plan/i);
        expect(name).toBeInTheDocument();
    });

    it('should not call onComment handler if input is empty', () => {
        let button = rendered?.container.getElementsByClassName('commentsButton')[0];
        fireEvent.click(button);
        expect(handlePublishComment.mock.calls.length).toEqual(0);
    });

    it('should call onComment handler if input is full', () => {
        let input = rendered?.container.querySelector('#commentsInput');
        fireEvent.change(input, {target: {value: 'test input value'}});
        let button = rendered?.container.getElementsByClassName('commentsButton')[0].getElementsByTagName('button')[0];
        fireEvent.click(button);
        expect(handlePublishComment.mock.calls.length).toEqual(1);
    });

    it('should call onReact handler if user reacts', () => {
        let reaction = rendered?.container.getElementsByClassName('reaction')[0].getElementsByTagName('svg')[0];
        fireEvent.click(reaction);
        expect(handleUserReact.mock.calls.length).toEqual(1);
    });
})
