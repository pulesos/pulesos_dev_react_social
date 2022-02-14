import React from 'react';
import { connect } from 'react-redux';
import { addMessageActionCreator } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from 'redux';


let mapStateToProps = (state) =>{
    return{
        dialogsPage: state.dialogsPage,
        newMessageBody: state.dialogsPage.newMessageBody
    }
}

let mapDispatchToProps = (dispatch) => {

    return{
        addMessage: (newMessageBody) => {
            dispatch(addMessageActionCreator(newMessageBody));
        },
    }
}

export default compose(
    connect (mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);

