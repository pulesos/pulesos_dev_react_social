import React from "react";
import s from '../Navbar.module.css';
const FriendsBlock = (props) => {
    return (
        
        <div className={s.friendsWrapper}>
            <img className={s.friendsPicture} src={props.picture}/>
            <div>{props.name}</div>
        </div>
        
    )
}

export default FriendsBlock;