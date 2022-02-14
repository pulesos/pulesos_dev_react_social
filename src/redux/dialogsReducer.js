const ADD_MESSAGE = 'ADD_MESSAGE'

let initialState = {
        dialogs: [
            {id: 1, name: 'Dimych'}, 
            {id: 2, name: 'Andrey'},
            {id: 3, name: 'Sasha'},
            {id: 4, name: 'Viktor'},
            {id: 5, name: 'Valera'}
        ],  
        messages: [
            {id: 1, message: 'Hi'}, 
            {id: 2, message: 'How are you'},
            {id: 3, message: 'Yo'},
            {id: 4, message: 'Yo'},
            {id: 5, message: 'Yo'}
        ],
    
}

const dialogsReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_MESSAGE: {
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}],
                newMessageBody: ''
            }
        }
        default:
            return state;

    }
}

export const addMessageActionCreator = (newMessageBody) => {
    return { type: 'ADD_MESSAGE', newMessageBody }
}




export default dialogsReducer;