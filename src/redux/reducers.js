import actions from "./actions";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    user: null,
    filters: {
        category: null,
        type: null,
        pattern: ''
    },
    activeEdition: null,
    comments: [],
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