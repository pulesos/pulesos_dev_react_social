import React, {Component, Suspense} from 'react';
import {connect} from 'react-redux';
import { compose } from "redux";
import {Route, withRouter} from 'react-router-dom';
import { initializeApp } from './redux/appReducer';
import HeaderContainer from './components/Header/HeaderContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';
// import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import LoginPage from './components/Login/Login';

import './App.css';
import Preloader from './components/Preloader/Preloader';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


class App extends Component {
  componentDidMount() {
    this.props.initializeApp(); 
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader/>
    }

    return (
      <div className='app-wrapper'>
        <HeaderContainer/>
        <NavbarContainer />
        <div className='app-wrapper-content'>
          <Suspense fallback={<Preloader/>}>

            <Route path='/dialogs'
              render={() => <DialogsContainer />}/>
            <Route path='/profile/:userId?' 
              render={() => <ProfileContainer />}/>
            <Route path='/users' 
              render={() => <UsersContainer /> }/> 
            <Route path='/login' 
              render={() => <LoginPage /> }/> 
          </Suspense>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})


export default compose(
  withRouter,
  connect(mapStateToProps, {initializeApp})) (App);
