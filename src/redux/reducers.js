import actions from "./actions";

const initialState = {
    user: null,
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
        content: [],
        filters: {
            category: null,
            type: null,
            pattern: ''
        }
    },
    activeEdition: null,
    comments: [],
    error: {
        shouldDisplay: false,
        content: ''
    }
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.types.APPLY_FILTERS: {
            console.log('dispatched ' + JSON.stringify(action.filters))
            return state;
        }

        case actions.types.CATEGORIES_REQUEST_STARTED:
        case actions.types.CATEGORIES_REQUEST_FAILED:
        case actions.types.CATEGORIES_REQUEST_SUCCESSED: {
            
            return Object.assign({}, state, {categories: categoriesReducer(state.categories, action.type)});
        }

        case actions.types.TYPES_REQUEST_STARTED:
        case actions.types.TYPES_REQUEST_FAILED:
        case actions.types.TYPES_REQUEST_SUCCESSED: {
            return Object.assign({}, state, {types: typesReducer(state.types, action.type)});
        }

        default: return state;
    }
}

function categoriesReducer(state, action) {
    switch (action) {
        case actions.types.CATEGORIES_REQUEST_STARTED: {
            return Object.assign({}, state, {content: state.content, isLoading: true});
        }

        case actions.types.CATEGORIES_REQUEST_FAILED: {
            console.log('categories loading failed');
            return state;
        }

        case actions.types.CATEGORIES_REQUEST_SUCCESSED: {
            console.log('categories loading success');
            return Object.assign({}, state, {content: action.categories, isLoading: false});
        }
    }
}

function typesReducer(state, action) {
    switch (action) {
        case actions.types.TYPES_REQUEST_STARTED: {
            console.log('types loading started');
            return Object.assign({}, state, {content: state.content, isLoading: true});
        }

        case actions.types.TYPES_REQUEST_FAILED: {
            console.log('types loading failed');
            return state;
        }

        case actions.types.TYPES_REQUEST_SUCCESSED: {
            console.log('types loading success');
            return Object.assign({}, state, {content: action.types, isLoading: false});
        }
    }
}

export default reducer;