import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";


let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi! How are you?', like: 4}, 
                {id: 2, message: 'It\'s my first post', like: 3}
            ],
            newPostText: 'it-kamasutra'
        },
        dialogsPage: {  
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
            newMessageBody: ""
        },
        sidebar: {
            friends: [
                {id: 1, picture: 'https://stihi.ru/pics/2017/02/05/6700.jpg', name: 'Andrew'},
                {id: 2, picture: 'https://stihi.ru/pics/2017/02/05/6700.jpg', name: 'Sasha'},
                {id: 3, picture: 'https://stihi.ru/pics/2017/02/05/6700.jpg', name: 'Sveta'}
            ]
        }
    },
    _callSubscriber() {
        console.log('State was changed');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
}

export default store;