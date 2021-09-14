import actions from "./actions";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    user: null,
    filters: {
        category: null,
        type: null,
        pattern: ''
    },
    plan: {
        isLoading: false,
        isChecked: false,
        isFetched: false,
        activeBusiness: null,
        activeEdition: null,
        data: null,
        comments: {
            isLoading: false,
            needMore: true,
            offset: 0,
            count: 20,
            content: []
        },
    },
    categories: {
        isLoading: false,
        content: []
    },
    types: {
        isLoading: false,
        content: []
    },
    businesses: {
        isLoading: false,
        offset: 0,
        count: 20,
        needMore: true,
        content: []
    },
    errors: {
        content: []
    }
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.types.APPLY_FILTERS: {
            console.log('dispatched ' + JSON.stringify(action.filters))
            return state;
        }

        case actions.types.FIND_ACTIVE_PLAN:
        case actions.types.NULLIFY_ACTIVE_PLAN:
        case actions.types.PLAN_REQUEST_STARTED:
        case actions.types.PLAN_REQUEST_SUCCESSED:
        case actions.types.PLAN_REQUEST_FAILED: {
            return Object.assign({}, state, { plan: planReducer(state.plan, action, state.businesses) });
        }

        case actions.types.REMOVE_ERROR:
        case actions.types.ADD_ERROR: {
            return Object.assign({}, state, { errors: errorsReducer(state.errors, action) });
        }

        case actions.types.CATEGORIES_REQUEST_STARTED:
        case actions.types.CATEGORIES_REQUEST_FAILED:
        case actions.types.CATEGORIES_REQUEST_SUCCESSED: {

            return Object.assign({}, state, { categories: categoriesReducer(state.categories, action) });
        }

        case actions.types.TYPES_REQUEST_STARTED:
        case actions.types.TYPES_REQUEST_FAILED:
        case actions.types.TYPES_REQUEST_SUCCESSED: {
            return Object.assign({}, state, { types: typesReducer(state.types, action) });
        }

        case actions.types.BUSINESSES_REQUEST_STARTED:
        case actions.types.BUSINESSES_REQUEST_FAILED:
        case actions.types.BUSINESSES_REQUEST_SUCCESSED: {
            return Object.assign({}, state, { businesses: businessesReducer(state.businesses, action) });
        }

        default: return state;
    }
}

function planReducer(state, action, businesses) {
    switch (action.type) {
        case actions.types.FIND_ACTIVE_PLAN: {
            const bId = action.q.planId;
            const eId = action.q.edId;

            let plan = businesses.content.find(b => b.id === bId);

            let edition = plan?.editions.find(e => e.id === eId);

            console.log('FOUND ', edition?.content || null)

            let newPlan = plan ?
                {
                    isLoading: false,
                    isChecked: true,
                    activeBusiness: plan.id,
                    activeEdition: edition?.id,
                    data: edition?.content || null,
                    comments: {
                        isLoading: false,
                        needMore: true,
                        offset: 0,
                        count: 20,
                        content: []
                    },
                } :
                {};

            return Object.assign({}, state, newPlan, {isChecked: true});
        }

        case actions.types.NULLIFY_ACTIVE_PLAN: {
            return Object.assign({}, state, {
                isLoading: false,
                isChecked: false,
                isFetched: false,
                activeBusiness: null,
                activeEdition: null,
                data: null,
                comments: {
                    isLoading: false,
                    needMore: true,
                    offset: 0,
                    count: 20,
                    content: []
                },
            });
        }

        case actions.types.PLAN_REQUEST_STARTED: {
            return Object.assign({}, state, {isChecked: true, isLoading: true});
        }

        case actions.types.PLAN_REQUEST_SUCCESSED: {
            return Object.assign({}, state, {isLoading: false, isFetched: true, data: action.plan});
        }

        case actions.types.PLAN_REQUEST_FAILED: {
            return Object.assign({}, state, {isFetched: true});
        }
    }
}

function errorsReducer(state, action) {
    switch (action.type) {
        case actions.types.REMOVE_ERROR: {
            let ind = state.content.findIndex(e => e.id === action.id);

            return {
                content: [
                    ...state.content.slice(0, ind),
                    ...state.content.slice(
                        ind + 1, state.content.length
                    ),
                ]
            };
        }

        case actions.types.ADD_ERROR: {
            console.log(action.text)
            return { content: state.content.concat({ id: uuidv4(), text: action.text }) };
        }
    }
}

function categoriesReducer(state, action) {
    switch (action.type) {
        case actions.types.CATEGORIES_REQUEST_STARTED: {
            return Object.assign({}, state, { content: state.content, isLoading: true });
        }

        case actions.types.CATEGORIES_REQUEST_FAILED: {
            console.log('categories loading failed');
            return state;
        }

        case actions.types.CATEGORIES_REQUEST_SUCCESSED: {
            console.log('categories loading success');
            return Object.assign({}, state, { content: action.categories, isLoading: false });
        }
    }
}

function typesReducer(state, action) {
    switch (action.type) {
        case actions.types.TYPES_REQUEST_STARTED: {
            console.log('types loading started');
            return Object.assign({}, state, { content: state.content, isLoading: true });
        }

        case actions.types.TYPES_REQUEST_FAILED: {
            console.log('types loading failed');
            return state;
        }

        case actions.types.TYPES_REQUEST_SUCCESSED: {
            console.log('types loading success');
            return Object.assign({}, state, { content: action.types, isLoading: false });
        }
    }
}

function businessesReducer(state, action) {
    console.log(action);
    switch (action.type) {
        case actions.types.BUSINESSES_REQUEST_STARTED: {
            console.log('businesses loading started');
            return Object.assign({}, state, { isLoading: true });
        }

        case actions.types.BUSINESSES_REQUEST_FAILED: {
            console.log('businesses loading failed');
            return state;
        }

        case actions.types.BUSINESSES_REQUEST_SUCCESSED: {
            console.log('businesses loading success');
            return Object.assign({}, state, { isLoading: false, content: state.content.concat(action.result.content), offset: action.result.offset, needMore: action.result.needMore });
        }
    }
}

export default reducer;