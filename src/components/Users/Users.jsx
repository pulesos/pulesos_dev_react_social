import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import userPhoto from '../../assets/images/user.png';
import s from './Users.module.css';
import cn from 'classnames';

let Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, portionSize = 10, ...props}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
    
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);

    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;

    let rightPortionPageNumber = portionNumber * portionSize;


    return (
        
        <div className={cn(s.paginator)}>
        { portionNumber > 1 &&
        <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button> }

            {pages
                .filter(p => p >= leftPortionPageNumber && p<=rightPortionPageNumber)
                .map((p) => {
                return <span className={ cn({
                    [s.selectedPage]: currentPage === p
                }, s.pageNumber) }
                             key={p}
                             onClick={(e) => {
                                onPageChanged(p);
                             }}>{p}</span>
            })}

        { portionCount > portionNumber &&
        <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button> }
        
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed 
                                ? <button disabled={props.followingInProgress
                                .some(id => id === u.id)} 
                                    onClick={() => {
                                        props.unfollow(u.id);

                                    }}>Unfollow</button> 
                                    : <button disabled={props.followingInProgress
                                    .some(id => id === u.id)} 
                                        onClick={() => {
                                            props.follow(u.id);

                                    }}>Follow</button>}
                            
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{'u.location.contry'}</div>
                            <div>{'u.location.city'}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}

export default Users;