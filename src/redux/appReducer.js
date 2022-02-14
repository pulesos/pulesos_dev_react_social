import { getAuthUserData } from "./authReducer";

const INITIALIZED_SUCCESSED = 'INITIALIZED_SUCCESSED';


let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {

    switch(action.type) {
        case INITIALIZED_SUCCESSED:
            return {
                ...state,
                initialized: true
            }
        
        default: 
            return state;
    }  
}

export const initializedSuccessActionCreator = () => {
    return ({ type: 'INITIALIZED_SUCCESSED' })
}
  
export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());

    Promise.all([promise])
        .then(() => {
        dispatch(initializedSuccessActionCreator());
    });
}
  


export default appReducer;