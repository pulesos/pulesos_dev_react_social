import React from "react";
import Preloader from "../../Preloader/Preloader";
import no from '../../../assets/images/no.png';
import yes from '../../../assets/images/yes.png';
import userPhoto from '../../../assets/images/user.png';
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import s from '../Profile.module.css';


const ProfileInfo = (props) => {

  if (!props.profile) {
    return <Preloader/>
  }
  return (
    <div>
        <div>
          <img id={s.picture__top} src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'/>
        </div>
        <div className={s.descriptionBlock}>
          <ProfileData profile={props.profile} />
          <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
        </div>
    </div>
  )
}

const ProfileData = (props) => {
  return (
    <>
      <img className={s.userPhoto} src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto}/>
      <div>{props.profile.aboutMe}</div>
      <div>{props.profile.contacts.facebook}</div>
      <div>Is looking for a job: {props.profile.lookingForAJob ? <img src={yes}/> : <img src={no}/>}</div>
      <div>{props.profile.lookingForAJobDescription}</div>
      <div>{props.profile.fullName}</div>
    </>
  )
}


export default ProfileInfo;