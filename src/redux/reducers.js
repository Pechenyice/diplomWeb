import actions from "./actions";
import { v4 as uuidv4 } from "uuid";

const initialState = {
	user: {
		id: null,
		login: null,
		nickname: null,
		auth: {
			isChecking: false,
		},
		isLoading: false,
	},
	userUpdateData: {
		nicknameIsLoading: false,
		passwordIsLoading: false,
		logoutInProcess: false,
	},
	guest: {
		nickname: null,
		isLoading: false,
	},
	filters: {
		category: -1,
		type: -1,
		sort: 0,
		pattern: "",
	},
	plan: {
		isLoading: false,
		isChecked: false,
		isFetched: false,
		activeBusiness: null,
		activeEdition: null,
		activeOwner: null,
		activeOwnerNickname: null,
		data: null,
		editions: [],
		comments: {
			isLoading: false,
			needMore: true,
			offset: 0,
			count: 21,
			content: [],
		},
	},
	planActions: {
		reactionIsUpdating: false
	},
	categories: {
		isLoading: false,
		content: [],
	},
	types: {
		isLoading: false,
		content: [],
	},
	businesses: {
		isLoading: false,
		offset: 0,
		count: 21,
		needMore: true,
		content: [],
	},
	profilePlans: {
		forUser: null,
		own: {
			isFetched: false,
			isLoading: false,
			content: [],
		},
		liked: {
			isFetched: false,
			isLoading: false,
			content: [],
		},
		disliked: {
			isFetched: false,
			isLoading: false,
			content: [],
		},
	},
	errors: {
		content: [],
	},
	successes: {
		content: [],
	},
};

function reducer(state = initialState, action) {
	console.log("ACTION", action);
	switch (action.type) {
		case actions.types.APPLY_FILTERS: {
			return Object.assign({}, state, {
				filters: action.filters,
				businesses: {
					isLoading: false,
					offset: 0,
					count: 21,
					needMore: true,
					content: [],
				},
			});
		}

		case actions.types.PUBLISH_COMMENT_REQUEST_STARTED:
		case actions.types.PUBLISH_COMMENT_REQUEST_SUCCESSED:
		case actions.types.PUBLISH_COMMENT_REQUEST_FAILED: {
			if (action?.result?.AUTH === "FAIL")
				return Object.assign({}, state, toInitialState(state));

			return Object.assign({}, state, {
				plan: publishCommentReducer(state.plan, action),
			});
		}

		case actions.types.NEW_REACTION_REQUEST_STARTED:
		case actions.types.NEW_REACTION_REQUEST_SUCCESSED:
		case actions.types.NEW_REACTION_REQUEST_FAILED: {
			if (action?.result?.AUTH === "FAIL")
				return Object.assign({}, state, toInitialState(state));

			return Object.assign({}, state, {
				plan: reactionReducer(state.plan, action),
				planActions: planActionsReducer(state.planActions, action),
				profilePlans: dropProfilePlans(state),
			});
		}

		case actions.types.DELETE_PLAN_REQUEST_STARTED:
		case actions.types.DELETE_PLAN_REQUEST_SUCCESSED:
		case actions.types.DELETE_PLAN_REQUEST_FAILED: {
			console.log("actions.types.DELETE_PLAN_REQUEST_SUCCESSED", action);

			if (action?.result?.AUTH === "FAIL")
				return Object.assign({}, state, toInitialState(state));

			return Object.assign({}, state, {
				profilePlans: dropProfilePlans(state),
				businesses: dropBusinessses(state),
				filters: dropFilters(state)
			});
		}

		case actions.types.LOGOUT_REQUEST_STARTED:
		case actions.types.LOGOUT_REQUEST_SUCCESSED:
		case actions.types.LOGOUT_REQUEST_FAILED: {
			if (action?.result?.AUTH === "FAIL")
				return Object.assign({}, state, toInitialState(state));

			if (action?.result?.success)
				return Object.assign({}, state, toInitialState(state));

			return Object.assign({}, state, {
				userUpdateData: logoutStatusesReducer(state.userUpdateData, action),
				user: logoutReducer(state.user, action),
			});
		}

		case actions.types.NULLIFY_GUEST: {
			return Object.assign({}, state, {
				guest: {
					nickname: null,
					isLoading: false,
				},
			});
		}

		case actions.types.UPDATE_PROFILE_DATA_REQUEST_STARTED:
		case actions.types.UPDATE_PROFILE_DATA_REQUEST_SUCCESSED:
		case actions.types.UPDATE_PROFILE_DATA_REQUEST_FAILED: {
			if (action?.result?.AUTH === "FAIL")
				return Object.assign({}, state, toInitialState(state));

			return Object.assign({}, state, {
				userUpdateData: updateProfileDataStatusesReducer(state.userUpdateData, action),
				user: updateProfileDataReducer(state.user, action),
			});
		}

		case actions.types.UPDATE_PROFILE_PASSWORD_REQUEST_STARTED:
		case actions.types.UPDATE_PROFILE_PASSWORD_REQUEST_SUCCESSED:
		case actions.types.UPDATE_PROFILE_PASSWORD_REQUEST_FAILED: {
			if (action?.result?.AUTH === "FAIL")
				return Object.assign({}, state, toInitialState(state));

			return Object.assign({}, state, {
				userUpdateData: updateProfilePasswordStatusesReducer(state.userUpdateData, action)
			});
		}

		case actions.types.NEW_PLAN_CREATED_REQUEST_STARTED:
		case actions.types.NEW_PLAN_CREATED_REQUEST_SUCCESSED:
		case actions.types.NEW_PLAN_CREATED_REQUEST_FAILED: {
			if (action?.result?.AUTH === "FAIL")
				return Object.assign({}, state, toInitialState(state));

			return Object.assign({}, state, {
				profilePlans: newPlanReducer(state.profilePlans, action),
				businesses: dropBusinessses(state),
				filters: dropFilters(state)
			});
		}

		case actions.types.PLAN_EDITION_CREATED_REQUEST_STARTED:
		case actions.types.PLAN_EDITION_CREATED_REQUEST_SUCCESSED:
		case actions.types.PLAN_EDITION_CREATED_REQUEST_FAILED: {
			if (action?.result?.AUTH === "FAIL")
				return Object.assign({}, state, toInitialState(state));

			return Object.assign({}, state, {
				profilePlans: dropProfilePlans(state),
				businesses: dropBusinessses(state),
				filters: dropFilters(state)
			});
		}

		case actions.types.SIGN_UP_REQUEST_STARTED:
		case actions.types.SIGN_UP_REQUEST_SUCCESSED:
		case actions.types.SIGN_UP_REQUEST_FAILED: {
			return Object.assign({}, state, {
				user: signReducer(state.user, action),
			});
		}

		case actions.types.USER_NICKNAME_REQUEST_STARTED:
		case actions.types.USER_NICKNAME_REQUEST_SUCCESSED:
		case actions.types.USER_NICKNAME_REQUEST_FAILED: {
			return Object.assign({}, state, {
				guest: guestReducer(state.guest, action),
			});
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
			if (action?.result?.AUTH === "FAIL")
				return Object.assign({}, state, toInitialState(state));

			return Object.assign({}, state, {
				profilePlans: profilePlansReducer(state.profilePlans, action),
			});
		}

		case actions.types.AUTH_REQUEST_STARTED:
		case actions.types.AUTH_REQUEST_SUCCESSED:
		case actions.types.AUTH_REQUEST_FAILED:
		case actions.types.USER_AUTH_CHECK_REQUEST_STARTED:
		case actions.types.USER_AUTH_CHECK_REQUEST_SUCCESSED:
		case actions.types.USER_AUTH_CHECK_REQUEST_FAILED: {
			if (action?.result?.AUTH === "FAIL")
				return Object.assign({}, state, toInitialState(state));

			return Object.assign({}, state, {
				profilePlans: dropProfilePlans(state),
				businesses: dropBusinessses(state),
				filters: dropFilters(state),
				user: userReducer(state.user, action),
			});
		}

		case actions.types.FIND_ACTIVE_PLAN:
		case actions.types.NULLIFY_ACTIVE_PLAN:
		case actions.types.PLAN_REQUEST_STARTED:
		case actions.types.PLAN_REQUEST_SUCCESSED:
		case actions.types.PLAN_REQUEST_FAILED: {
			return Object.assign({}, state, {
				plan: planReducer(state.plan, action, state.businesses),
			});
		}

		case actions.types.REMOVE_ERROR:
		case actions.types.ADD_ERROR: {
			return Object.assign({}, state, {
				errors: errorsReducer(state.errors, action),
			});
		}

		case actions.types.REMOVE_SUCCESS:
		case actions.types.ADD_SUCCESS: {
			return Object.assign({}, state, {
				successes: successesReducer(state.successes, action),
			});
		}

		case actions.types.CATEGORIES_REQUEST_STARTED:
		case actions.types.CATEGORIES_REQUEST_FAILED:
		case actions.types.CATEGORIES_REQUEST_SUCCESSED: {
			return Object.assign({}, state, {
				categories: categoriesReducer(state.categories, action),
			});
		}

		case actions.types.TYPES_REQUEST_STARTED:
		case actions.types.TYPES_REQUEST_FAILED:
		case actions.types.TYPES_REQUEST_SUCCESSED: {
			return Object.assign({}, state, {
				types: typesReducer(state.types, action),
			});
		}

		case actions.types.BUSINESSES_REQUEST_STARTED:
		case actions.types.BUSINESSES_REQUEST_FAILED:
		case actions.types.BUSINESSES_REQUEST_SUCCESSED: {
			return Object.assign({}, state, {
				businesses: businessesReducer(state.businesses, action),
			});
		}

		case actions.types.COMMENTS_REQUEST_STARTED:
		case actions.types.COMMENTS_REQUEST_FAILED:
		case actions.types.COMMENTS_REQUEST_SUCCESSED: {
			return Object.assign({}, state, {
				plan: Object.assign(
					{},
					{ ...state.plan },
					{
						comments: planCommentsReducer(
							state.plan.comments,
							action
						),
					}
				),
			});
		}

		default:
			return state;
	}
}

function toInitialState(state) {
	return {
		user: {
			id: null,
			login: null,
			nickname: null,
			auth: {
				isChecking: false,
			},
			isLoading: false,
		},
		userUpdateData: {
			nicknameIsLoading: false,
			passwordIsLoading: false,
			logoutInProcess: false,
		},
		profilePlans: {
			forUser: null,
			own: {
				isFetched: false,
				isLoading: false,
				content: [],
			},
			liked: {
				isFetched: false,
				isLoading: false,
				content: [],
			},
			disliked: {
				isFetched: false,
				isLoading: false,
				content: [],
			},
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
				count: 21,
				content: [],
			},
		},
		businesses: {
			isLoading: false,
			offset: 0,
			count: 21,
			needMore: true,
			content: [],
		},
		filters: {
			category: -1,
			type: -1,
			sort: 0,
			pattern: "",
		},
	};
}

function dropProfilePlans(state) {
	return {
		forUser: null,
		own: {
			isFetched: false,
			isLoading: false,
			content: [],
		},
		liked: {
			isFetched: false,
			isLoading: false,
			content: [],
		},
		disliked: {
			isFetched: false,
			isLoading: false,
			content: [],
		},
	};
}

function dropBusinessses(state) {
	return {
		isLoading: false,
		offset: 0,
		count: 21,
		needMore: true,
		content: [],
	};
}

function dropFilters(state) {
	return {
		category: -1,
		type: -1,
		sort: 0,
		pattern: "",
	};
}

function planReducer(state, action, businesses) {
	switch (action.type) {
		case actions.types.FIND_ACTIVE_PLAN: {
			const bId = action.q.planId;
			const eId = action.q.edId;

			let plan = businesses.content.find((b) => b.id === bId);

			let edition = plan?.editions.find((e) => e.id === eId);

			let newPlan = plan
				? {
						isLoading: false,
						isChecked: true,
						activeBusiness: plan?.id,
						activeEdition: edition?.id,
						activeOwner: plan?.owner,
						activeOwnerNickname: plan?.ownerNickname,
						data: edition?.content || null,
						editions: plan?.editions,
						comments: {
							isLoading: false,
							needMore: true,
							offset: 0,
							count: 21,
							content: [],
						},
				  }
				: {};

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
				activeOwnerNickname: null,
				data: null,
				editions: [],
				comments: {
					isLoading: false,
					needMore: true,
					offset: 0,
					count: 21,
					content: [],
				},
			});
		}

		case actions.types.PLAN_REQUEST_STARTED: {
			return Object.assign({}, state, {
				isChecked: true,
				isLoading: true,
			});
		}

		case actions.types.PLAN_REQUEST_SUCCESSED: {
			console.log("action plan successed", action);
			console.log("action.plan.owner", action.plan.owner);

			return Object.assign({}, state, {
				isLoading: false,
				isFetched: true,
				activeOwner: action.plan.plan.owner,
				activeOwnerNickname: action.plan.plan.ownerNickname,
				activeBusiness: action.planId,
				activeEdition: action.edId,
				editions: action.plan.plan.editions,
				data: action.plan.plan,
			});
		}

		case actions.types.PLAN_REQUEST_FAILED: {
			return Object.assign({}, state, { isFetched: true });
		}
	}
}

function successesReducer(state, action) {
	switch (action.type) {
		case actions.types.REMOVE_SUCCESS: {
			let ind = state.content.findIndex((e) => e.id === action.id);

			return {
				content: [
					...state.content.slice(0, ind),
					...state.content.slice(ind + 1, state.content.length),
				],
			};
		}

		case actions.types.ADD_SUCCESS: {
			return {
				content: state.content.concat({
					id: uuidv4(),
					text: action.text,
					type: "success",
					created: Date.now(),
				}),
			};
		}
	}
}

function errorsReducer(state, action) {
	switch (action.type) {
		case actions.types.REMOVE_ERROR: {
			let ind = state.content.findIndex((e) => e.id === action.id);

			return {
				content: [
					...state.content.slice(0, ind),
					...state.content.slice(ind + 1, state.content.length),
				],
			};
		}

		case actions.types.ADD_ERROR: {
			return {
				content: state.content.concat({
					id: uuidv4(),
					text: action.text,
					type: "error",
					created: Date.now(),
				}),
			};
		}
	}
}

function guestReducer(state, action) {
	switch (action.type) {
		case actions.types.USER_NICKNAME_REQUEST_STARTED: {
			return Object.assign({}, state, { isLoading: true });
		}

		case actions.types.USER_NICKNAME_REQUEST_SUCCESSED: {
			return Object.assign({}, state, {
				isLoading: false,
				nickname: action.result.nickname,
			});
		}

		case actions.types.USER_NICKNAME_REQUEST_FAILED: {
			return Object.assign({}, state, { isLoading: false });
		}
	}
}

function planActionsReducer(state, action) {
	switch (action.type) {
		case actions.types.NEW_REACTION_REQUEST_STARTED: {
			return Object.assign({}, state, {
				reactionIsUpdating: true
			});
		}
		case actions.types.NEW_REACTION_REQUEST_SUCCESSED:
		case actions.types.NEW_REACTION_REQUEST_FAILED: {
			return Object.assign({}, state, {
				reactionIsUpdating: false
			});
		}
	}
}

function reactionReducer(state, action) {
	switch (action.type) {
		case actions.types.NEW_REACTION_REQUEST_STARTED: {
			return state;
		}

		case actions.types.NEW_REACTION_REQUEST_SUCCESSED: {
			if (action.result.type === 'like') {
				return Object.assign({}, state, {
					data: Object.assign({}, state.data, {
						disliked: false,
						liked: true,
						likes: state.data.liked ? state.data.likes : state.data.likes + 1,
						dislikes: state.data.disliked ? state.data.dislikes - 1 : state.data.dislikes
					})
				});
			} else if (action.result.type === 'dislike') {
				return Object.assign({}, state, {
					data: Object.assign({}, state.data, {
						disliked: true,
						liked: false,
						dislikes: state.data.disliked ? state.data.dislikes : state.data.dislikes + 1,
						likes: state.data.liked ? state.data.likes - 1 : state.data.likes
					})
				});
			} else if (action.result.type === 'dropLike') {
				return Object.assign({}, state, {
					data: Object.assign({}, state.data, {
						disliked: false,
						liked: false,
						likes: state.data.liked ? state.data.likes - 1 : state.data.likes,
					})
				});
			} else if (action.result.type === 'dropDislike') {
				return Object.assign({}, state, {
					data: Object.assign({}, state.data, {
						disliked: false,
						liked: false,
						dislikes: state.data.disliked ? state.data.dislikes - 1 : state.data.dislikes,
					})
				});
			}
		}

		case actions.types.NEW_REACTION_REQUEST_FAILED: {
			return state;
		}
	}
}

function publishCommentReducer(state, action) {
	switch (action.type) {
		case actions.types.PUBLISH_COMMENT_REQUEST_STARTED: {
			return state;
		}

		case actions.types.PUBLISH_COMMENT_REQUEST_SUCCESSED: {
			return Object.assign({}, state, {
				comments: Object.assign(
					{},
					{
						content: state.comments.content.concat([
							action.result.comment,
						]),
					}
				),
			});
		}

		case actions.types.PUBLISH_COMMENT_REQUEST_FAILED: {
			return state;
		}
	}
}

function updateProfilePasswordStatusesReducer(state, action) {
	switch (action.type) {
		case actions.types.UPDATE_PROFILE_PASSWORD_REQUEST_STARTED: {
			return Object.assign({}, state, {passwordIsLoading: true});
		}

		case actions.types.UPDATE_PROFILE_PASSWORD_REQUEST_SUCCESSED:
		case actions.types.UPDATE_PROFILE_PASSWORD_REQUEST_FAILED: {
			return Object.assign({}, state, {passwordIsLoading: false});
		}
	}
}

function updateProfileDataStatusesReducer(state, action) {
	switch (action.type) {
		case actions.types.UPDATE_PROFILE_DATA_REQUEST_STARTED: {
			return Object.assign({}, state, {nicknameIsLoading: true});
		}

		case actions.types.UPDATE_PROFILE_DATA_REQUEST_SUCCESSED:
		case actions.types.UPDATE_PROFILE_DATA_REQUEST_FAILED: {
			return Object.assign({}, state, {nicknameIsLoading: false});
		}
	}
}

function updateProfileDataReducer(state, action) {
	switch (action.type) {
		case actions.types.UPDATE_PROFILE_DATA_REQUEST_STARTED: {
			return state;
		}

		case actions.types.UPDATE_PROFILE_DATA_REQUEST_SUCCESSED: {
			return Object.assign({}, state, {
				nickname: action.result.nickname,
			});
		}

		case actions.types.UPDATE_PROFILE_DATA_REQUEST_FAILED: {
			return state;
		}
	}
}

function newPlanReducer(state, action) {
	switch (action.type) {
		case actions.types.NEW_PLAN_CREATED_REQUEST_STARTED: {
			return state;
		}

		case actions.types.NEW_PLAN_CREATED_REQUEST_SUCCESSED: {
			return Object.assign({}, state, {
				own: Object.assign({}, state.own, {
					content: [action.result.data].concat(state.own.content),
				}),
			});
		}

		case actions.types.NEW_PLAN_CREATED_REQUEST_FAILED: {
			return state;
		}
	}
}

function editPlanReducer(state, action) {
	switch (action.type) {
		case actions.types.PLAN_EDITION_CREATED_REQUEST_STARTED: {
			return state;
		}

		case actions.types.PLAN_EDITION_CREATED_REQUEST_SUCCESSED: {
			return Object.assign({}, state, {
				own: Object.assign({}, state.own, {
					content: [],
					isLoading: false,
					isFetched: false,
				}),
			});
		}

		case actions.types.PLAN_EDITION_CREATED_REQUEST_FAILED: {
			return state;
		}
	}
}

function logoutStatusesReducer(state, action) {
	switch (action.type) {
		case actions.types.LOGOUT_REQUEST_STARTED: {
			return Object.assign({}, state, {
				logoutInProcess: true
			});
		}

		case actions.types.LOGOUT_REQUEST_SUCCESSED:
		case actions.types.LOGOUT_REQUEST_FAILED: {
			return Object.assign({}, state, {
				logoutInProcess: false
			});
		}
	}
}

function logoutReducer(state, action) {
	switch (action.type) {
		case actions.types.LOGOUT_REQUEST_STARTED: {
			return state;
		}

		case actions.types.LOGOUT_REQUEST_SUCCESSED: {
			return Object.assign({}, state, { id: null });
		}

		case actions.types.LOGOUT_REQUEST_FAILED: {
			return state;
		}
	}
}

function signReducer(state, action) {
	switch (action.type) {
		case actions.types.SIGN_UP_REQUEST_STARTED: {
			return Object.assign({}, state, { isLoading: true });
		}

		case actions.types.SIGN_UP_REQUEST_SUCCESSED: {
			return Object.assign({}, state, {
				id: action.result.id,
				login: action.result.login,
				nickname: action.result.nickname,
				isLoading: false,
			});
		}

		case actions.types.SIGN_UP_REQUEST_FAILED: {
			return Object.assign({}, state, { isLoading: false });
		}
	}
}

function userReducer(state, action) {
	switch (action.type) {
		case actions.types.USER_AUTH_CHECK_REQUEST_STARTED: {
			console.log("auth check started");
			return Object.assign({}, state, { auth: { isChecking: true } });
		}

		case actions.types.USER_AUTH_CHECK_REQUEST_SUCCESSED: {
			console.log("auth check completed", action.result.id);
			return Object.assign({}, state, {
				id: action.result.id,
				login: action.result.login,
				nickname: action.result.nickname,
				auth: { isChecking: false },
			});
		}

		case actions.types.USER_AUTH_CHECK_REQUEST_FAILED: {
			console.log("auth check failed");
			return Object.assign({}, state, {
				id: null,
				auth: { isChecking: false },
			});
		}

		case actions.types.AUTH_REQUEST_STARTED: {
			console.log("auth started");
			return Object.assign({}, state, { isLoading: true });
		}

		case actions.types.AUTH_REQUEST_FAILED: {
			console.log("auth failed");
			return Object.assign({}, state, { id: null, isLoading: false });
		}

		case actions.types.AUTH_REQUEST_SUCCESSED: {
			console.log("auth successed", action.result.id);
			return Object.assign({}, state, {
				id: action.result.id,
				login: action.result.login,
				nickname: action.result.nickname,
				isLoading: false,
			});
		}
	}
}

function profilePlansReducer(state, action) {
	switch (action.type) {
		case actions.types.OWN_PLANS_REQUEST_STARTED: {
			return Object.assign({}, state, {
				forUser: action.userId,
				own: Object.assign({}, state.own, { isLoading: true }),
			});
		}

		case actions.types.OWN_PLANS_REQUEST_SUCCESSED: {
			return Object.assign({}, state, {
				forUser: action.userId,
				own: Object.assign({}, state.own, {
					isLoading: false,
					isFetched: true,
					content: action.result.businesses,
				}),
			});
		}

		case actions.types.OWN_PLANS_REQUEST_FAILED: {
			return Object.assign({}, state, {
				forUser: action.userId,
				own: Object.assign({}, state.own, {
					isLoading: false,
					isFetched: true,
				}),
			});
		}

		case actions.types.LIKED_PLANS_REQUEST_STARTED: {
			return Object.assign({}, state, {
				forUser: action.userId,
				liked: Object.assign({}, state.liked, { isLoading: true }),
			});
		}

		case actions.types.LIKED_PLANS_REQUEST_SUCCESSED: {
			console.log('IN SUCCESS LIKED: ', action)
			return Object.assign({}, state, {
				forUser: action.userId,
				liked: Object.assign({}, state.liked, {
					isLoading: false,
					isFetched: true,
					content: action.result.businesses,
				}),
			});
		}

		case actions.types.LIKED_PLANS_REQUEST_FAILED: {
			return Object.assign({}, state, {
				forUser: action.userId,
				liked: Object.assign({}, state.liked, {
					isLoading: false,
					isFetched: true,
				}),
			});
		}

		case actions.types.DISLIKED_PLANS_REQUEST_STARTED: {
			return Object.assign({}, state, {
				forUser: action.userId,
				disliked: Object.assign({}, state.disliked, {
					isLoading: true,
				}),
			});
		}

		case actions.types.DISLIKED_PLANS_REQUEST_SUCCESSED: {
			return Object.assign({}, state, {
				forUser: action.userId,
				disliked: Object.assign({}, state.disliked, {
					isLoading: false,
					isFetched: true,
					content: action.result.businesses,
				}),
			});
		}

		case actions.types.DISLIKED_PLANS_REQUEST_FAILED: {
			return Object.assign({}, state, {
				forUser: action.userId,
				disliked: Object.assign({}, state.disliked, {
					isLoading: false,
					isFetched: true,
				}),
			});
		}
	}
}

function categoriesReducer(state, action) {
	switch (action.type) {
		case actions.types.CATEGORIES_REQUEST_STARTED: {
			return Object.assign({}, state, {
				content: state.content,
				isLoading: true,
			});
		}

		case actions.types.CATEGORIES_REQUEST_FAILED: {
			return state;
		}

		case actions.types.CATEGORIES_REQUEST_SUCCESSED: {
			return Object.assign({}, state, {
				content: action.categories,
				isLoading: false,
			});
		}
	}
}

function typesReducer(state, action) {
	switch (action.type) {
		case actions.types.TYPES_REQUEST_STARTED: {
			return Object.assign({}, state, {
				content: state.content,
				isLoading: true,
			});
		}

		case actions.types.TYPES_REQUEST_FAILED: {
			return state;
		}

		case actions.types.TYPES_REQUEST_SUCCESSED: {
			return Object.assign({}, state, {
				content: action.types,
				isLoading: false,
			});
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
			return Object.assign({}, state, {
				isLoading: false,
				content: state.content.concat(action.result.content),
				offset: action.result.offset,
				needMore: action.result.needMore,
			});
		}
	}
}

function planCommentsReducer(state, action) {
	switch (action.type) {
		case actions.types.COMMENTS_REQUEST_STARTED: {
			return Object.assign({}, state, { isLoading: true });
		}

		case actions.types.COMMENTS_REQUEST_FAILED: {
			return state;
		}

		case actions.types.COMMENTS_REQUEST_SUCCESSED: {
			return Object.assign({}, state, {
				isLoading: false,
				content: state.content.concat(action.result.content),
				offset: action.result.offset,
				needMore: action.result.needMore,
			});
		}
	}
}

export default reducer;
