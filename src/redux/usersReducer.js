import { usersAPI } from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {

    switch(action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {...state, followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId] : state.followingInProgress.filter(id => id !== action.userId)}
        }
        default: 
            return state;
    }  
}

export const followSuccess = (userId) => {
    return { type: 'FOLLOW', userId }
}
  
export const unfollowSuccess = (userId) => {
    return { type: 'UNFOLLOW', userId }
}

export const setUsersActionCreator = (users) => {
    return { type: 'SET_USERS', users }
}

export const setCurrentPageActionCreator = (currentPage) => {
    return { type: 'SET_CURRENT_PAGE', currentPage: currentPage }
}

export const setUsersTotalCountActionCreator = (totalUsersCount) => {
    return { type: 'SET_TOTAL_USERS_COUNT', count: totalUsersCount }
}

export const toggleIsFetchingActionCreator = (isFetching) => {
    return { type: 'TOGGLE_IS_FETCHING', isFetching }
}

export const toggleIsFollowingProgressActionCreator = (isFetching, userId) => {
    return { type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId }
}

export const getUsersThunkCreator = (currentPage, pageSize) => {
    return (dispatch) => {

        dispatch(toggleIsFetchingActionCreator(true));
        dispatch(setCurrentPageActionCreator(currentPage))

        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(toggleIsFetchingActionCreator(false));
                dispatch(setCurrentPageActionCreator(currentPage));
                dispatch(setUsersActionCreator(data.items));
                dispatch(setUsersTotalCountActionCreator(data.totalCount));
        }); 
    }
}

export const follow = (userId) => {
    return (dispatch) => {

        dispatch(toggleIsFollowingProgressActionCreator(true, userId));
        usersAPI.follow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followSuccess(userId));
            }
            dispatch(toggleIsFollowingProgressActionCreator(false, userId));
        });
    }
}

export const unfollow = (userId) => {
    return (dispatch) => {

        dispatch(toggleIsFollowingProgressActionCreator(true, userId));
        usersAPI.unfollow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(unfollowSuccess(userId));
            }
            dispatch(toggleIsFollowingProgressActionCreator(false, userId));
        });
    }
}


///////// ТАК ПРАВИЛЬНЕЕ (через async/await)
// export const unfollow = (userId) => {
//     return async (dispatch) => {

//         dispatch(toggleIsFollowingProgressActionCreator(true, userId));
//         let response = await usersAPI.unfollow(userId)
//             if (response.data.resultCode === 0) {
//                 dispatch(unfollowSuccess(userId));
//             }
//         dispatch(toggleIsFollowingProgressActionCreator(false, userId));
        
//     }
// }

// export const getUsersThunkCreator = (currentPage, pageSize) => {
//     return async (dispatch) => {

//         dispatch(toggleIsFetchingActionCreator(true));
//         dispatch(setCurrentPageActionCreator(currentPage))

//         let data = await usersAPI.getUsers(currentPage, pageSize)

//         dispatch(toggleIsFetchingActionCreator(false));
//         dispatch(setCurrentPageActionCreator(currentPage));
//         dispatch(setUsersActionCreator(data.items));
//         dispatch(setUsersTotalCountActionCreator(data.totalCount));
        
//     }
// }


export default usersReducer;