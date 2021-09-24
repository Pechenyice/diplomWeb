import Client from "../Client/Client"

const actions = {
    types: {
        APPLY_FILTERS: 'APPLY_FILTERS',
        REMOVE_ERROR: 'REMOVE_ERROR',
        ADD_ERROR: 'ADD_ERROR',
        REMOVE_SUCCESS: 'REMOVE_SUCCESS',
        ADD_SUCCESS: 'ADD_SUCCESS',
        CATEGORIES_REQUEST_STARTED: 'CATEGORIES_REQUEST_STARTED',
        CATEGORIES_REQUEST_FAILED: 'CATEGORIES_REQUEST_FAILED',
        CATEGORIES_REQUEST_SUCCESSED: 'CATEGORIES_REQUEST_SUCCESSED',
        TYPES_REQUEST_STARTED: 'TYPES_REQUEST_STARTED',
        TYPES_REQUEST_FAILED: 'TYPES_REQUEST_FAILED',
        TYPES_REQUEST_SUCCESSED: 'TYPES_REQUEST_SUCCESSED',
        BUSINESSES_REQUEST_STARTED: 'BUSINESSES_REQUEST_STARTED',
        BUSINESSES_REQUEST_FAILED: 'BUSINESSES_REQUEST_FAILED',
        BUSINESSES_REQUEST_SUCCESSED: 'BUSINESSES_REQUEST_SUCCESSED',
        FIND_ACTIVE_PLAN: 'FIND_ACTIVE_PLAN',
        NULLIFY_ACTIVE_PLAN: 'NULLIFY_ACTIVE_PLAN',
        PLAN_REQUEST_STARTED: 'PLAN_REQUEST_STARTED',
        PLAN_REQUEST_SUCCESSED: 'PLAN_REQUEST_SUCCESSED',
        PLAN_REQUEST_FAILED: 'PLAN_REQUEST_FAILED',
        COMMENTS_REQUEST_STARTED: 'COMMENTS_REQUEST_STARTED',
        COMMENTS_REQUEST_SUCCESSED: 'COMMENTS_REQUEST_SUCCESSED',
        COMMENTS_REQUEST_FAILED: 'COMMENTS_REQUEST_FAILED',
        AUTH_REQUEST_STARTED: 'AUTH_REQUEST_STARTED',
        AUTH_REQUEST_SUCCESSED: 'AUTH_REQUEST_SUCCESSED',
        AUTH_REQUEST_FAILED: 'AUTH_REQUEST_FAILED',
        USER_AUTH_CHECK_REQUEST_STARTED: 'USER_AUTH_CHECK_REQUEST_STARTED',
        USER_AUTH_CHECK_REQUEST_SUCCESSED: 'USER_AUTH_CHECK_REQUEST_SUCCESSED',
        USER_AUTH_CHECK_REQUEST_FAILED: 'USER_AUTH_CHECK_REQUEST_FAILED',
        OWN_PLANS_REQUEST_STARTED: 'OWN_PLANS_REQUEST_STARTED',
        OWN_PLANS_REQUEST_SUCCESSED: 'OWN_PLANS_REQUEST_SUCCESSED',
        OWN_PLANS_REQUEST_FAILED: 'OWN_PLANS_REQUEST_FAILED',
        LIKED_PLANS_REQUEST_STARTED: 'LIKED_PLANS_REQUEST_STARTED',
        LIKED_PLANS_REQUEST_SUCCESSED: 'LIKED_PLANS_REQUEST_SUCCESSED',
        LIKED_PLANS_REQUEST_FAILED: 'LIKED_PLANS_REQUEST_FAILED',
        DISLIKED_PLANS_REQUEST_STARTED: 'DISLIKED_PLANS_REQUEST_STARTED',
        DISLIKED_PLANS_REQUEST_SUCCESSED: 'DISLIKED_PLANS_REQUEST_SUCCESSED',
        DISLIKED_PLANS_REQUEST_FAILED: 'DISLIKED_PLANS_REQUEST_FAILED',
        SIGN_UP_REQUEST_STARTED: 'SIGN_UP_REQUEST_STARTED',
        SIGN_UP_REQUEST_SUCCESSED: 'SIGN_UP_REQUEST_SUCCESSED',
        SIGN_UP_REQUEST_FAILED: 'SIGN_UP_REQUEST_FAILED',
        USER_NICKNAME_REQUEST_STARTED: 'USER_NICKNAME_REQUEST_STARTED',
        USER_NICKNAME_REQUEST_SUCCESSED: 'USER_NICKNAME_REQUEST_SUCCESSED',
        USER_NICKNAME_REQUEST_FAILED: 'USER_NICKNAME_REQUEST_FAILED',
        LOGOUT_REQUEST_STARTED: 'LOGOUT_REQUEST_STARTED',
        LOGOUT_REQUEST_SUCCESSED: 'LOGOUT_REQUEST_SUCCESSED',
        LOGOUT_REQUEST_FAILED: 'LOGOUT_REQUEST_FAILED',
        NULLIFY_GUEST: 'NULLIFY_GUEST',
        UPDATE_PROFILE_DATA_REQUEST_STARTED: 'UPDATE_PROFILE_DATA_REQUEST_STARTED',
        UPDATE_PROFILE_DATA_REQUEST_SUCCESSED: 'UPDATE_PROFILE_DATA_REQUEST_SUCCESSED',
        UPDATE_PROFILE_DATA_REQUEST_FAILED: 'UPDATE_PROFILE_DATA_REQUEST_FAILED',
        UPDATE_PROFILE_PASSWORD_REQUEST_STARTED: 'UPDATE_PROFILE_PASSWORD_REQUEST_STARTED',
        UPDATE_PROFILE_PASSWORD_REQUEST_SUCCESSED: 'UPDATE_PROFILE_PASSWORD_REQUEST_SUCCESSED',
        UPDATE_PROFILE_PASSWORD_REQUEST_FAILED: 'UPDATE_PROFILE_PASSWORD_REQUEST_FAILED',
        NEW_PLAN_CREATED_REQUEST_STARTED: 'NEW_PLAN_CREATED_REQUEST_STARTED',
        NEW_PLAN_CREATED_REQUEST_SUCCESSED: 'NEW_PLAN_CREATED_REQUEST_SUCCESSED',
        NEW_PLAN_CREATED_REQUEST_FAILED: 'NEW_PLAN_CREATED_REQUEST_FAILED'
    },

    findPlan: function ({ planId, edId }) {
        return {
            type: this.types.FIND_ACTIVE_PLAN,
            q: {
                planId,
                edId
            }
        }
    },

    clearPlanInfo: function () {
        return {
            type: this.types.NULLIFY_ACTIVE_PLAN
        }
    },

    clearGuest: function () {
        return {
            type: this.types.NULLIFY_GUEST
        }
    },

    fetchPlanRequest: function () {
        return {
            type: this.types.PLAN_REQUEST_STARTED
        }
    },

    fetchPlanSuccess: function (plan, planId, edId) {
        return {
            type: this.types.PLAN_REQUEST_SUCCESSED,
            plan,
            planId,
            edId
        }
    },

    fetchPlanFail: function () {
        return {
            type: this.types.PLAN_REQUEST_FAILED
        }
    },

    fetchPlan: function ({ planId, edId }) {
        return (dispatch) => {
            dispatch(this.fetchPlanRequest());
            Client.loadPlan(planId, edId)
                .then((plan) => {
                    dispatch(this.fetchPlanSuccess(plan, planId, edId));
                })
                .catch((e) => {
                    if (e.name === 'AbortError') {
                        console.warn(`Request aborted`);
                    }
                    dispatch(this.fetchPlanFail());
                    dispatch(this.addError('Failed load current business plan!'));
                })
        }
    },

    applyFilters: function (filters) {
        return {
            type: this.types.APPLY_FILTERS,
            filters
        }
    },

    removeError: function (id) {
        return {
            type: this.types.REMOVE_ERROR,
            id
        }
    },

    addError: function (text) {
        return {
            type: this.types.ADD_ERROR,
            text
        }
    },

    removeSuccess: function (id) {
        return {
            type: this.types.REMOVE_SUCCESS,
            id
        }
    },

    addSuccess: function (text) {
        return {
            type: this.types.ADD_SUCCESS,
            text
        }
    },

    fetchCategoriesRequest: function () {
        return {
            type: this.types.CATEGORIES_REQUEST_STARTED
        }
    },

    fetchCategoriesSuccess: function (categories) {
        return {
            type: this.types.CATEGORIES_REQUEST_SUCCESSED,
            categories
        }
    },

    fetchCategoriesFail: function () {
        return {
            type: this.types.CATEGORIES_REQUEST_FAILED
        }
    },

    fetchCategories: function () {
        return (dispatch) => {
            dispatch(this.fetchCategoriesRequest());
            Client.loadCategories()
                .then((categories) => {
                    dispatch(this.fetchCategoriesSuccess(categories));
                })
                .catch((e) => {
                    if (e.name === 'AbortError') {
                        console.warn(`Request aborted`);
                    }
                    dispatch(this.fetchCategoriesFail());
                    dispatch(this.addError('Failed load categories for businesses!'));
                })
        }
    },

    fetchBusinessesRequest: function () {
        return {
            type: this.types.BUSINESSES_REQUEST_STARTED
        }
    },

    fetchBusinessesSuccess: function (result) {
        return {
            type: this.types.BUSINESSES_REQUEST_SUCCESSED,
            result
        }
    },

    fetchBusinessesFail: function () {
        return {
            type: this.types.BUSINESSES_REQUEST_FAILED
        }
    },

    fetchBusinesses: function (offset, count, filters) {
        return (dispatch) => {
            dispatch(this.fetchBusinessesRequest());
            Client.loadBusinesses(offset, count, filters)
                .then((result) => {
                    dispatch(this.fetchBusinessesSuccess(result));
                })
                .catch((e) => {
                    if (e.name === 'AbortError') {
                        console.warn(`Request aborted`);
                    }
                    dispatch(this.fetchBusinessesFail());
                    dispatch(this.addError('Failed load businesses!'));
                })
        }
    },

    fetchCommentsRequest: function () {
        return {
            type: this.types.COMMENTS_REQUEST_STARTED
        }
    },

    fetchCommentsSuccess: function (result) {
        return {
            type: this.types.COMMENTS_REQUEST_SUCCESSED,
            result
        }
    },

    fetchCommentsFail: function () {
        return {
            type: this.types.COMMENTS_REQUEST_FAILED
        }
    },

    // fetchInitialComments: function(businessId, edId, offset, count) {
    //     return (dispatch) => {
    //         dispatch(this.fetchCommentsRequest());
    //         Client.loadComments(businessId, edId, offset, count)
    //             .then((result) => {
    //                 dispatch(this.fetchCommentsSuccess(result));
    //             })
    //             .catch(() => {
    //                 dispatch(this.fetchCommentsFail());
    //                 dispatch(this.addError('Failed load comments!'));
    //             })
    //     }
    // },

    fetchComments: function (businessId, edId, offset, count) {
        return (dispatch) => {
            dispatch(this.fetchCommentsRequest());
            Client.loadComments(businessId, edId, offset, count)
                .then((result) => {
                    dispatch(this.fetchCommentsSuccess(result));
                })
                .catch((e) => {
                    if (e.name === 'AbortError') {
                        console.warn(`Request aborted`);
                    }
                    dispatch(this.fetchCommentsFail());
                    dispatch(this.addError('Failed load comments!'));
                })
        }
    },

    fetchAuthRequest: function () {
        return {
            type: this.types.AUTH_REQUEST_STARTED
        }
    },

    fetchAuthSuccess: function (result) {
        return {
            type: this.types.AUTH_REQUEST_SUCCESSED,
            result
        }
    },

    fetchAuthFail: function () {
        return {
            type: this.types.AUTH_REQUEST_FAILED
        }
    },

    fetchAuth: function (login, pass) {
        return (dispatch) => {
            dispatch(this.fetchAuthRequest());
            Client.loadAuthData(login, pass)
                .then((result) => {
                    result.success ?
                        dispatch(this.fetchAuthSuccess(result)) :
                        dispatch(this.addError(result.cause));
                })
                .catch((e) => {
                    if (e.name === 'AbortError') {
                        console.warn(`Request aborted`);
                    }
                    dispatch(this.fetchAuthFail());
                    dispatch(this.addError('Failed load account data: something went wrong!'));
                })
        }
    },

    fetchSignUpRequest: function () {
        return {
            type: this.types.SIGN_UP_REQUEST_STARTED
        }
    },

    fetchSignUpSuccess: function (result) {
        return {
            type: this.types.SIGN_UP_REQUEST_SUCCESSED,
            result
        }
    },

    fetchSignUpFail: function () {
        return {
            type: this.types.SIGN_UP_REQUEST_FAILED
        }
    },

    fetchSignUp: function (login, nickname, pass) {
        return (dispatch) => {
            dispatch(this.fetchSignUpRequest());
            Client.sendSignUpRequest(login, nickname, pass)
                .then((result) => {
                    result.success ?
                        dispatch(this.fetchSignUpSuccess(result)) :
                        dispatch(this.addError(result.cause));
                })
                .catch((e) => {
                    if (e.name === 'AbortError') {
                        console.warn(`Request aborted`);
                    }
                    dispatch(this.fetchSignUpFail());
                    dispatch(this.addError('Failed register user, try later!'));
                })
        }
    },

    fetchLogoutRequest: function () {
        return {
            type: this.types.LOGOUT_REQUEST_STARTED
        }
    },

    fetchLogoutSuccess: function (result) {
        return {
            type: this.types.LOGOUT_REQUEST_SUCCESSED,
            result
        }
    },

    fetchLogoutFail: function () {
        return {
            type: this.types.LOGOUT_REQUEST_FAILED
        }
    },

    fetchLogout: function () {
        return (dispatch) => {
            dispatch(this.fetchLogoutRequest());
            Client.logout()
                .then((result) => {
                    result.success ?
                        dispatch(this.fetchLogoutSuccess(result)) :
                        dispatch(this.addError(result.cause));
                })
                .catch((e) => {
                    if (e.name === 'AbortError') {
                        console.warn(`Request aborted`);
                    }
                    dispatch(this.fetchLogoutFail());
                    dispatch(this.addError('Failed logout!'));
                })
        }
    },

    fetchUpdateProfileDataRequest: function () {
        return {
            type: this.types.UPDATE_PROFILE_DATA_REQUEST_STARTED
        }
    },

    fetchUpdateProfileDataSuccess: function (result) {
        return {
            type: this.types.UPDATE_PROFILE_DATA_REQUEST_SUCCESSED,
            result
        }
    },

    fetchUpdateProfileDataFail: function (result) {
        return {
            type: this.types.UPDATE_PROFILE_DATA_REQUEST_FAILED,
            result
        }
    },

    updateProfileData: function (nickname) {
        return (dispatch) => {
            dispatch(this.fetchUpdateProfileDataRequest());
            Client.updateProfileData(nickname)
                .then((result) => {
                    if (result.success) {
                        dispatch(this.fetchUpdateProfileDataSuccess(result));
                        dispatch(this.addSuccess('Nickname changed succesfully!'))
                    } else {
                        dispatch(this.fetchUpdateProfileDataFail({AUTH: 'FAIL'}));
                        dispatch(this.addError(result.cause))
                    }
                })
                .catch((e) => {
                    if (e.name === 'AbortError') {
                        console.warn(`Request aborted`);
                    }
                    console.log('e', e)
                    dispatch(this.fetchUpdateProfileDataFail());
                    dispatch(this.addError('Failed update profile data!'));
                })
        }
    },

    fetchUpdateProfilePasswordRequest: function () {
        return {
            type: this.types.UPDATE_PROFILE_PASSWORD_REQUEST_STARTED
        }
    },

    fetchUpdateProfilePasswordSuccess: function (result) {
        return {
            type: this.types.UPDATE_PROFILE_PASSWORD_REQUEST_SUCCESSED,
            result
        }
    },

    fetchUpdateProfilePasswordFail: function (result) {
        return {
            type: this.types.UPDATE_PROFILE_PASSWORD_REQUEST_FAILED,
            result
        }
    },

    updateProfilePassword: function(oldPass, pass) {
        return (dispatch) => {
            dispatch(this.fetchUpdateProfilePasswordRequest());
            Client.updateProfilePassword(oldPass, pass)
                .then((result) => {
                    if (result.success) {
                        dispatch(this.fetchUpdateProfilePasswordSuccess(result));
                        dispatch(this.addSuccess('Password changed succesfully!'))
                    } else {
                        dispatch(this.fetchUpdateProfilePasswordFail({AUTH: 'FAIL'}));
                        dispatch(this.addError(result.cause))
                    }
                })
                .catch((e) => {
                    if (e.name === 'AbortError') {
                        console.warn(`Request aborted`);
                    }
                    console.log('e', e)
                    dispatch(this.fetchUpdateProfilePasswordFail());
                    dispatch(this.addError('Failed update profile password!'));
                })
        }
    },

    fetchNewPlanCreatedRequest: function () {
        return {
            type: this.types.NEW_PLAN_CREATED_REQUEST_STARTED
        }
    },

    fetchNewPlanCreatedSuccess: function (result) {
        return {
            type: this.types.NEW_PLAN_CREATED_REQUEST_SUCCESSED,
            result
        }
    },

    fetchNewPlanCreatedFail: function (result) {
        return {
            type: this.types.NEW_PLAN_CREATED_REQUEST_FAILED,
            result
        }
    },

    fetchNewPlanCreated: function(data) {
        return (dispatch) => {
            dispatch(this.fetchNewPlanCreatedRequest());
            Client.createNewPlan(data)
                .then((result) => {
                    if (result.success) {
                        dispatch(this.fetchNewPlanCreatedSuccess(result));
                        dispatch(this.addSuccess('Plan created succesfully!'))
                    } else {
                        dispatch(this.fetchNewPlanCreatedFail({AUTH: 'FAIL'}));
                        dispatch(this.addError(result.cause))
                    }
                })
                .catch((e) => {
                    if (e.name === 'AbortError') {
                        console.warn(`Request aborted`);
                    }
                    console.log('e', e)
                    dispatch(this.fetchNewPlanCreatedFail());
                    dispatch(this.addError('Failed create new plan!'));
                })
        }
    },

    fetchUserNicknameRequest: function () {
        return {
            type: this.types.USER_NICKNAME_REQUEST_STARTED
        }
    },

    fetchUserNicknameSuccess: function (result) {
        return {
            type: this.types.USER_NICKNAME_REQUEST_SUCCESSED,
            result
        }
    },

    fetchUserNicknameFail: function () {
        return {
            type: this.types.USER_NICKNAME_REQUEST_FAILED
        }
    },

    fetchUserNickname: function (id) {
        return (dispatch) => {
            dispatch(this.fetchUserNicknameRequest());
            Client.loadUserNickname(id)
                .then((result) => {
                    result.success ?
                        dispatch(this.fetchUserNicknameSuccess(result)) :
                        dispatch(this.addError(result.cause));
                })
                .catch((e) => {
                    if (e.name === 'AbortError') {
                        console.warn(`Request aborted`);
                    }
                    dispatch(this.fetchUserNicknameFail());
                    dispatch(this.addError('Failed load user nickname!'));
                })
        }
    },

    fetchOwnPlansRequest: function () {
        return {
            type: this.types.OWN_PLANS_REQUEST_STARTED
        }
    },

    fetchOwnPlansSuccess: function (result, userId) {
        return {
            type: this.types.OWN_PLANS_REQUEST_SUCCESSED,
            result,
            userId
        }
    },

    fetchOwnPlansFail: function () {
        return {
            type: this.types.OWN_PLANS_REQUEST_FAILED
        }
    },

    fetchOwnPlans: function (userId) {
        return (dispatch) => {
            dispatch(this.fetchOwnPlansRequest());
            Client.loadOwnPlans(userId)
                .then((result) => {
                    dispatch(this.fetchOwnPlansSuccess(result, userId));
                })
                .catch((e) => {
                    if (e.name === 'AbortError') {
                        console.warn(`Request aborted`);
                    }
                    dispatch(this.fetchOwnPlansFail());
                    dispatch(this.addError('Failed load own plans for account!'));
                })
        }
    },

    fetchLikedPlansRequest: function () {
        return {
            type: this.types.LIKED_PLANS_REQUEST_STARTED
        }
    },

    fetchLikedPlansSuccess: function (result, userId) {
        return {
            type: this.types.LIKED_PLANS_REQUEST_SUCCESSED,
            result,
            userId
        }
    },

    fetchLikedPlansFail: function () {
        return {
            type: this.types.LIKED_PLANS_REQUEST_FAILED
        }
    },

    fetchLikedPlans: function (userId) {
        return (dispatch) => {
            dispatch(this.fetchLikedPlansRequest());
            Client.loadLikedPlans(userId)
                .then((result) => {
                    dispatch(this.fetchLikedPlansSuccess(result, userId));
                })
                .catch((e) => {
                    if (e.name === 'AbortError') {
                        console.warn(`Request aborted`);
                    }
                    dispatch(this.fetchLikedPlansFail());
                    dispatch(this.addError('Failed load liked plans for account!'));
                })
        }
    },

    fetchDislikedPlansRequest: function () {
        return {
            type: this.types.DISLIKED_PLANS_REQUEST_STARTED
        }
    },

    fetchDislikedPlansSuccess: function (result, userId) {
        return {
            type: this.types.DISLIKED_PLANS_REQUEST_SUCCESSED,
            result,
            userId
        }
    },

    fetchDislikedPlansFail: function () {
        return {
            type: this.types.DISLIKED_PLANS_REQUEST_FAILED
        }
    },

    fetchDislikedPlans: function (userId) {
        return (dispatch) => {
            dispatch(this.fetchDislikedPlansRequest());
            Client.loadDislikedPlans(userId)
                .then((result) => {
                    dispatch(this.fetchDislikedPlansSuccess(result, userId));
                })
                .catch((e) => {
                    if (e.name === 'AbortError') {
                        console.warn(`Request aborted`);
                    }
                    dispatch(this.fetchDislikedPlansFail());
                    dispatch(this.addError('Failed load disliked plans for account!'));
                })
        }
    },

    fetchUserAuthCheckRequest: function () {
        return {
            type: this.types.USER_AUTH_CHECK_REQUEST_STARTED
        }
    },

    fetchUserAuthCheckSuccess: function (result) {
        return {
            type: this.types.USER_AUTH_CHECK_REQUEST_SUCCESSED,
            result
        }
    },

    fetchUserAuthCheckFail: function () {
        return {
            type: this.types.USER_AUTH_CHECK_REQUEST_FAILED
        }
    },

    fetchUserAuthCheck: function () {
        return (dispatch) => {
            dispatch(this.fetchUserAuthCheckRequest());
            Client.loadUserAuthCheckData()
                .then((result) => {
                    result.success ?
                        dispatch(this.fetchUserAuthCheckSuccess(result)) :
                        dispatch(this.fetchUserAuthCheckFail());
                })
                .catch((e) => {
                    if (e.name === 'AbortError') {
                        console.warn(`Request aborted`);
                    }
                    dispatch(this.fetchUserAuthCheckFail());
                    dispatch(this.addError('Failed load account data token: request failed!'));
                })
        }
    },

    fetchEditionDataForPlanView: function (planId, edId) {
        return (dispatch) => {
            dispatch(this.fetchEditionDataForPlanViewRequest());
            Client.loadEditionForPlanView(planId, edId)
                .then((result) => {
                    dispatch(this.fetchEditionDataForPlanViewSuccess(result));
                })
                .catch((e) => {
                    if (e.name === 'AbortError') {
                        console.warn(`Request aborted`);
                    }
                    dispatch(this.fetchEditionDataForPlanViewFail());
                    dispatch(this.addError('Failed load plan edition data!'));
                })
        }
    },

    fetchTypesRequest: function () {
        return {
            type: this.types.TYPES_REQUEST_STARTED
        }
    },

    fetchTypesSuccess: function (types) {
        return {
            type: this.types.TYPES_REQUEST_SUCCESSED,
            types
        }
    },

    fetchTypesFail: function () {
        return {
            type: this.types.TYPES_REQUEST_FAILED
        }
    },

    fetchTypes: function () {
        return (dispatch) => {
            dispatch(this.fetchTypesRequest());
            Client.loadTypes()
                .then((types) => {
                    dispatch(this.fetchTypesSuccess(types));
                })
                .catch((e) => {
                    if (e.name === 'AbortError') {
                        console.warn(`Request aborted`);
                    }
                    dispatch(this.fetchTypesFail());
                    dispatch(this.addError('Failed load types for businesses!'));
                })
        }
    }
}

export default actions;
