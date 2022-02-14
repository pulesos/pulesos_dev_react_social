import {applyMiddleware, combineReducers, createStore} from "redux";
import authReducer from "./authReducer";
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import thunkMiddleware from "redux-thunk";
import { reducer as reduxForm } from 'redux-form';
import appReducer from "./appReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: reduxForm,
    app: appReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;