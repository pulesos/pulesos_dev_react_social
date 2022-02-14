import { usersAPI, profileAPI } from "../api/api";

const ADD_POST = 'ADD_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    posts: [
        {id: 1, message: 'Hi! How are you?', like: 4}, 
        {id: 2, message: 'It\'s my first post', like: 3}
    ],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_POST: {
            let newPost = {
                id: 3,
                message: action.newPostText,
                like: 0
            };
            let stateCopy = {...state};
            stateCopy.posts = [...state.posts];
            stateCopy.posts.push(newPost);
            stateCopy.newPostText = '';
            return stateCopy;
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        default: 
            return state;
        
    }  
}

export const addPostActionCreator = (newPostText) => {
    return { type: 'ADD_POST', newPostText }
}
  
export const setUserProfileActionCreator = (profile) => {
    return { type: 'SET_USER_PROFILE', profile }
}

export const setStatusActionCreator = (status) => {
    return { type: 'SET_STATUS', status }
}


export const getUserProfile = (userId) => {
    return (dispatch) => {

        usersAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfileActionCreator(response.data));
        }); 
    }
}

export const getStatus = (userId) => {
    return (dispatch) => {

        profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setStatusActionCreator(response.data));
        }); 
    }
}

export const updateStatus = (status) => {
    return (dispatch) => {

        profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatusActionCreator(status));
            }
        }); 
    }
}

//// ТАК ПРАВИЛЬНЕЕ (через async/await)
// export const updateStatus = (status) => async (dispatch) => {

//     let response = await profileAPI.updateStatus(status)
    
//     if (response.data.resultCode === 0) {
//         dispatch(setStatusActionCreator(status));
//     }    
// }

export default profileReducer;