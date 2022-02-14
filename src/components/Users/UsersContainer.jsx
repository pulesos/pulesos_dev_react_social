import React from "react";
import {connect} from 'react-redux';
import { follow, unfollow, setCurrentPageActionCreator, toggleIsFollowingProgressActionCreator, getUsersThunkCreator } from "../../redux/usersReducer";
import { getUsers, getPageSize, getCurrentPage, getFollowingInProgress, getIsFetching, getTotalUsersCount } from "../../redux/usersSelectors";
import Users from "./Users";
import Preloader from '../Preloader/Preloader';
import { compose } from "redux";

class UsersContainer extends React.Component {
    componentDidMount() {

        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
        
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize); 
    }

    render() {
        return  ( 
            <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users 
                totalUsersCount={this.props.totalUsersCount} 
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}/>
            </>
        )
    }
}

// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followActionCreator(userId));
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowActionCreator(userId));
//         },
//         setUsers: (users) => {
//             dispatch(setUsersActionCreator(users));
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageActionCreator(pageNumber));
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setUsersTotalCountActionCreator(totalCount));
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingActionCreator(isFetching));
//         }
//     }
// }


// export default connect(mapStateToProps, {
//     follow,
//     unfollow,
//     setCurrentPage: setCurrentPageActionCreator,
//     toggleIsFollowingProgress: toggleIsFollowingProgressActionCreator,
//     getUsersThunkCreator
// }) (UsersContainer);


export default compose(
    connect(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage: setCurrentPageActionCreator,
        toggleIsFollowingProgress: toggleIsFollowingProgressActionCreator,
        getUsersThunkCreator
    })
)(UsersContainer)