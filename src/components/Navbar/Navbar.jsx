import React from "react";
import {NavLink} from 'react-router-dom';
import FriendsBlock from './FriendsBlock/FriendsBlock';
import s from './Navbar.module.css';


const Navbar = (props) => {

    let friendsElements = props.friends.map( f => <FriendsBlock picture={f.picture} name={f.name} key={f.id} id={f.id}/>)
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to='/profile' activeClassName={s.activeLink}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/dialogs' activeClassName={s.activeLink}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/users' activeClassName={s.activeLink}>Users</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='#'>Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='#'>Settings</NavLink>
            </div>
            <div className={s.item}>
                <h2>Friends</h2>
                {friendsElements}
            </div>
            
        </nav>
    )
}

export default Navbar;