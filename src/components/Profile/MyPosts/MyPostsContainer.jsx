import React from 'react';
import { connect } from 'react-redux';
import { addPostActionCreator } from '../../../redux/profileReducer';
import MyPosts from './MyPosts';

let mapStateToProps = (state) => {  //при изменении state запускается эта ф-ци и новый объект сравнивается со старым, если изм. нет компан. не перерисовывается
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText));
        }
    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts) //MyPosts перересуйся когд в тебе измениться posts


export default MyPostsContainer;