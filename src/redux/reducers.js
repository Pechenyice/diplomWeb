import actions from "./actions";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    user: {
        id: null,
        login: null,
        nickname: null,
        auth: {
            isChecking: false
        },
        isLoading: false
    },
    guest: {
        nickname: null,
        isLoading: false
    },
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
        activeOwner: null,
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
    profilePlans: {
        forUser: null,
        own: {
            isFetched: false,
            isLoading: false,
            content: []
        },
        liked: {
            isFetched: false,
            isLoading: false,
            content: []
        },
        disliked: {
            isFetched: false,
            isLoading: false,
            content: []
        }
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

        case actions.types.SIGN_UP_REQUEST_STARTED:
        case actions.types.SIGN_UP_REQUEST_SUCCESSED:
        case actions.types.SIGN_UP_REQUEST_FAILED: {
            return Object.assign({}, state, { user: signReducer(state.user, action) });
        }

        case actions.types.USER_NICKNAME_REQUEST_STARTED:
        case actions.types.USER_NICKNAME_REQUEST_SUCCESSED:
        case actions.types.USER_NICKNAME_REQUEST_FAILED: {
            return Object.assign({}, state, { guest: guestReducer(state.guest, action) });
        }

        case actions.types.OWN_PLANS_REQUEST_STARTED:
        case actions.types.OWN_PLANS_REQUEST_SUCCESSED:
        case actions.types.OWN_PLANS_REQUEST_FAILED:
        case actions.types.LIKED_PLANS_REQUEST_STARTED:
        case actions.types.LIKED_PLANS_REQUEST_SUCCESSED:
        case actions.types.LIKED_PLANS_REQUEST_FAILED:
        case actions.types.DISLIKED_PLANS_REQUEST_STARTED:
        case actions.types.DISLIKED_PLANS_REQUEST_SUCCESSED:
        case actions.types.DISLIKED_PLANS_REQUEST_FAILED: {
            if (action?.result?.AUTH === 'FAIL') return Object.assign({}, state, toInitialState(state));

            return Object.assign({}, state, { profilePlans: profilePlansReducer(state.profilePlans, action) });
        }

        case actions.types.AUTH_REQUEST_STARTED:
        case actions.types.AUTH_REQUEST_SUCCESSED:
        case actions.types.AUTH_REQUEST_FAILED:
        case actions.types.USER_AUTH_CHECK_REQUEST_STARTED:
        case actions.types.USER_AUTH_CHECK_REQUEST_SUCCESSED:
        case actions.types.USER_AUTH_CHECK_REQUEST_FAILED: {
            if (action?.result?.AUTH === 'FAIL') return Object.assign({}, state, toInitialState(state));

            return Object.assign({}, state, { user: userReducer(state.user, action) });
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

        case actions.types.COMMENTS_REQUEST_STARTED:
        case actions.types.COMMENTS_REQUEST_FAILED:
        case actions.types.COMMENTS_REQUEST_SUCCESSED: {
            return Object.assign({}, state, { plan: Object.assign({}, { ...state.plan }, { comments: planCommentsReducer(state.plan.comments, action) }) });
        }

        default: return state;
    }
}

function toInitialState(state) {
    return {
        user: {
            id: null,
            login: null,
            nickname: null,
            auth: {
                isChecking: false
            },
            isLoading: false
        },
        profilePlans: {
            forUser: null,
            own: {
                isFetched: false,
                isLoading: false,
                content: []
            },
            liked: {
                isFetched: false,
                isLoading: false,
                content: []
            },
            disliked: {
                isFetched: false,
                isLoading: false,
                content: []
            }
        },
        plan: {
            isLoading: false,
            isChecked: false,
            isFetched: false,
            activeBusiness: null,
            activeEdition: null,
            activeOwner: null,
            data: null,
            comments: {
                isLoading: false,
                needMore: true,
                offset: 0,
                count: 20,
                content: []
            },
        }
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
                    activeBusiness: plan?.id,
                    activeEdition: edition?.id,
                    activeOwner: plan?.owner,
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

            return Object.assign({}, state, newPlan, { isChecked: true });
        }

        case actions.types.NULLIFY_ACTIVE_PLAN: {
            return Object.assign({}, state, {
                isLoading: false,
                isChecked: false,
                isFetched: false,
                activeBusiness: null,
                activeEdition: null,
                activeOwner: null,
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
            return Object.assign({}, state, { isChecked: true, isLoading: true });
        }

        case actions.types.PLAN_REQUEST_SUCCESSED: {
            return Object.assign({}, state, { isLoading: false, isFetched: true, activeOwner: action.plan.owner, activeBusiness: action.planId, activeEdition: action.edId, data: action.plan });
        }

        case actions.types.PLAN_REQUEST_FAILED: {
            return Object.assign({}, state, { isFetched: true });
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

function guestReducer(state, action) {
    switch (action.type) {
        case actions.types.USER_NICKNAME_REQUEST_STARTED: {
            return Object.assign({}, state, { isLoading: true });
        }

        case actions.types.USER_NICKNAME_REQUEST_SUCCESSED: {
            return Object.assign({}, state, { isLoading: false, nickname: action.result.nickname });
        }

        case actions.types.USER_NICKNAME_REQUEST_FAILED: {
            return Object.assign({}, state, { isLoading: false });
        }
    }
}

function signReducer(state, action) {
    switch (action.type) {
        case actions.types.SIGN_UP_REQUEST_STARTED: {
            return Object.assign({}, state, { isLoading: true });
        }

        case actions.types.SIGN_UP_REQUEST_SUCCESSED: {
            return Object.assign({}, state, { id: action.result.id, login: action.result.login, nickname: action.result.nickname, isLoading: false });
        }

        case actions.types.SIGN_UP_REQUEST_FAILED: {
            return Object.assign({}, state, { isLoading: false });
        }
    }
}

function userReducer(state, action) {
    switch (action.type) {
        case actions.types.USER_AUTH_CHECK_REQUEST_STARTED: {
            console.log('auth check started')
            return Object.assign({}, state, { auth: { isChecking: true } });
        }

        case actions.types.USER_AUTH_CHECK_REQUEST_SUCCESSED: {
            console.log('auth check completed', action.result.id)
            return Object.assign({}, state, { id: action.result.id, login: action.result.login, nickname: action.result.nickname, auth: { isChecking: false } });
        }

        case actions.types.USER_AUTH_CHECK_REQUEST_FAILED: {
            console.log('auth check failed')
            return Object.assign({}, state, { id: null, auth: { isChecking: false } });
        }

        case actions.types.AUTH_REQUEST_STARTED: {
            console.log('auth started')
            return Object.assign({}, state, { isLoading: true });
        }

        case actions.types.AUTH_REQUEST_FAILED: {
            console.log('auth failed')
            return Object.assign({}, state, { id: null, isLoading: false });
        }

        case actions.types.AUTH_REQUEST_SUCCESSED: {
            console.log('auth successed', action.result.id)
            return Object.assign({}, state, { id: action.result.id, login: action.result.login, nickname: action.result.nickname, isLoading: false });
        }
    }
}

function profilePlansReducer(state, action) {
    switch (action.type) {
        case actions.types.OWN_PLANS_REQUEST_STARTED: {
            return Object.assign({}, state, { forUser: action.userId, own: Object.assign({}, state.own, { isLoading: true }) });
        }

        case actions.types.OWN_PLANS_REQUEST_SUCCESSED: {
            return Object.assign({}, state, { forUser: action.userId, own: Object.assign({}, state.own, { isLoading: false, isFetched: true, content: action.result }) });
        }

        case actions.types.OWN_PLANS_REQUEST_FAILED: {
            return Object.assign({}, state, { forUser: action.userId, own: Object.assign({}, state.own, { isLoading: false, isFetched: true }) });
        }

        case actions.types.LIKED_PLANS_REQUEST_STARTED: {
            return Object.assign({}, state, { forUser: action.userId, liked: Object.assign({}, state.liked, { isLoading: true }) });
        }

        case actions.types.LIKED_PLANS_REQUEST_SUCCESSED: {
            return Object.assign({}, state, { forUser: action.userId, liked: Object.assign({}, state.liked, { isLoading: false, isFetched: true, content: action.result }) });
        }

        case actions.types.LIKED_PLANS_REQUEST_FAILED: {
            return Object.assign({}, state, { forUser: action.userId, liked: Object.assign({}, state.liked, { isLoading: false, isFetched: true }) });
        }

        case actions.types.DISLIKED_PLANS_REQUEST_STARTED: {
            return Object.assign({}, state, { forUser: action.userId, disliked: Object.assign({}, state.disliked, { isLoading: true }) });
        }

        case actions.types.DISLIKED_PLANS_REQUEST_SUCCESSED: {
            return Object.assign({}, state, { forUser: action.userId, disliked: Object.assign({}, state.disliked, { isLoading: false, isFetched: true, content: action.result }) });
        }

        case actions.types.DISLIKED_PLANS_REQUEST_FAILED: {
            return Object.assign({}, state, { forUser: action.userId, disliked: Object.assign({}, state.disliked, { isLoading: false, isFetched: true }) });
        }
    }
}

function categoriesReducer(state, action) {
    switch (action.type) {
        case actions.types.CATEGORIES_REQUEST_STARTED: {
            return Object.assign({}, state, { content: state.content, isLoading: true });
        }

        case actions.types.CATEGORIES_REQUEST_FAILED: {
            return state;
        }

        case actions.types.CATEGORIES_REQUEST_SUCCESSED: {
            return Object.assign({}, state, { content: action.categories, isLoading: false });
        }
    }
}

function typesReducer(state, action) {
    switch (action.type) {
        case actions.types.TYPES_REQUEST_STARTED: {
            return Object.assign({}, state, { content: state.content, isLoading: true });
        }

        case actions.types.TYPES_REQUEST_FAILED: {
            return state;
        }

        case actions.types.TYPES_REQUEST_SUCCESSED: {
            return Object.assign({}, state, { content: action.types, isLoading: false });
        }
    }
}

function businessesReducer(state, action) {
    switch (action.type) {
        case actions.types.BUSINESSES_REQUEST_STARTED: {
            return Object.assign({}, state, { isLoading: true });
        }

        case actions.types.BUSINESSES_REQUEST_FAILED: {
            return state;
        }

        case actions.types.BUSINESSES_REQUEST_SUCCESSED: {
            return Object.assign({}, state, { isLoading: false, content: state.content.concat(action.result.content), offset: action.result.offset, needMore: action.result.needMore });
        }
    }
}

function planCommentsReducer(state, action) {
    console.log(action);
    switch (action.type) {
        case actions.types.COMMENTS_REQUEST_STARTED: {
            console.log('comments loading started');
            return Object.assign({}, state, { isLoading: true });
        }

        case actions.types.COMMENTS_REQUEST_FAILED: {
            console.log('comments loading failed');
            return state;
        }

        case actions.types.COMMENTS_REQUEST_SUCCESSED: {
            console.log('comments loading success');
            console.log(Object.assign({}, state, { isLoading: false, content: state.content.concat(action.result.content), offset: action.result.offset, needMore: action.result.needMore }))
            return Object.assign({}, state, { isLoading: false, content: state.content.concat(action.result.content), offset: action.result.offset, needMore: action.result.needMore });
        }
    }
}

export default reducer;