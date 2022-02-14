import React from 'react';
import {reduxForm, Field } from 'redux-form';
import { Redirect } from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import { Textarea } from '../FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';


const Dialogs = (props) => {

    let state = props.dialogsPage; //ссылка на dialogsPage

    let dialogsElements = state.dialogs.map(d =>
        <DialogItem name={d.name} key={d.id} id={d.id} />) //везде где у нас map'ится массив нужно добовлять эл. key, в качестве key нужно указывать id эл. из которого мы получаем JSX элемент. Потому что важно чтобы эти эл. были уникальны. В данном случае d
    let messagesElements = state.messages.map(m =>
        <Message message={m.message} key={m.id} />) //тут индекс m. Это делается что бы в консоли браузера не вылетала ошибка


    let addNewMessage = (values) => {
        props.addMessage(values.newMessageBody);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                {messagesElements}
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.area}>
            <Field component={Textarea} validate={[required, maxLength50]} name="newMessageBody" placeholder="Введите сообщение"/>
            <div>
                <button>Add Message</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm)


export default Dialogs;