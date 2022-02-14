import React from 'react';
import {reduxForm, Field } from 'redux-form';
import { maxLengthCreator ,required } from '../../../utils/validators/validators';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Textarea } from '../../FormsControls/FormsControls';


const maxLength10 = maxLengthCreator(10) ;

const MyPosts = React.memo(props => {

    let postsElements =
        props.posts.map(p => 
        <Post message={p.message} like={p.like} key={p.id} />)  //в качестве "p" у нас придёт строка массива posts (p можно заменить на что угодно)
    //и из строки массива как с props мы забераем один из элементов p.message или p.likesCount
    // т.е. .map это цикл который повторяет элемент за элементом из указанного массива.
    //let postsElements = (props.posts.map (p)) => {
    //<Post message={p.message} like={p.likesCount} />  это props Post'ов (момент отрисовки Post)
    //})

    
    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <h3> My posts </h3>
                <AddNewPostFormRedux onSubmit={onAddPost}/>

            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )

})


const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="newPostText" component={Textarea} placeholder={"Post message"} validate={[required, maxLength10]}/>
            </div>
            <div>
                <button> Add post</button>
            </div>
        </form>
    )
}

let AddNewPostFormRedux = reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm);

export default MyPosts;