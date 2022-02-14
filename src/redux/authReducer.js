import { authAPI } from "../api/api";

const SET_USER_DATA = 'FOLLOW';


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: null    //нужно поставить false
    // isFetching: false
}

const authReducer = (state = initialState, action) => {

    switch(action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        
        default: 
            return state;
    }  
}

export const setAuthUserDataActionCreator = (userId, email, login, isAuth) => {
    return { type: 'SET_USER_DATA', payload: {userId, email, login, isAuth} }
}
  
export const getAuthUserData = () => {
    return(dispatch) => {
        authAPI.me()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data;
                    dispatch(setAuthUserDataActionCreator(id, email, login, true));
                }
        }); 
    }
}
  
export const login = (email, password, rememberMe) => {
    return(dispatch) => {
        authAPI.login(email, password, rememberMe)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(getAuthUserData());
                }
        }); 
    }
}

export const logout = () => {
    return(dispatch) => {
        authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(getAuthUserData(null, null, null, false));
                }
        }); 
    }
}

////// ТАК ПРАВИЛЬНЕЕ (через async/await)
// export const logout = () => async (dispatch) => {
//     let response = await authAPI.logout()

//     if (response.data.resultCode === 0) {
//         dispatch(getAuthUserData(null, null, null, false));
//     }
// }

export default authReducer;