import React from "react";
import { NavLink } from "react-router-dom";
import s from './../Dialogs.module.css';

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;
    let picture = "https://stihi.ru/pics/2017/02/05/6700.jpg";

    return (
        <div className={s.dialog + ' ' + s.active}>
            <img className={s.dialogPicture} src={picture}/>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;