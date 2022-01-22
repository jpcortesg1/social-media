import "./rightbar.css";
import { Users } from "./../../dummyData";
import Online from "../online/Online";

export default function Rightbar({ profile }) {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={`${publicFolder}/gift.png`} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img src={`${publicFolder}/ad.png`} alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((user) => (
            <Online key={user.id} user={user} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitleProfile">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rigthbarInfoKey">City: </span>
            <span className="rigthbarInfoValue">New York</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rigthbarInfoKey">From: </span>
            <span className="rigthbarInfoValue">Madrid</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rigthbarInfoKey">Relationship: </span>
            <span className="rigthbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className="rightbarTitleProfile">User friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src={`${publicFolder}/person/1.jpeg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Jhon Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${publicFolder}/person/2.jpeg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Jhon Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${publicFolder}/person/3.jpeg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Jhon Carter</span>
          </div>

          <div className="rightbarFollowing">
            <img
              src={`${publicFolder}/person/4.jpeg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Jhon Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${publicFolder}/person/5.jpeg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Jhon Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${publicFolder}/person/6.jpeg`}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Jhon Carter</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
