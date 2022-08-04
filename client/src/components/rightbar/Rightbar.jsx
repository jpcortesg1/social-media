import "./rightbar.css";
import { Users } from "./../../dummyData";
import Online from "../online/Online";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import { useContext } from "react";

export default function Rightbar({ user }) {
  // Public folder
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // Friends of user the profile
  const [friends, setFriends] = useState([]);

  // Current user
  const { user: currentUser, dispatch } = useContext(AuthContext);

  // Current user follow user
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  // To reload friends of actual user
  useEffect(() => {
    const getFriends = async () => {
      try {
        if (user._id) {
          const friendList = await axios.get(
            `${process.env.REACT_APP_API}/api/users/friends/` + user._id
          );
          setFriends(friendList.data);
        }
      } catch (error) {}
    };
    if (user) getFriends();
  }, [user]);

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser.followings, user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(
          `${process.env.REACT_APP_API}/api/users/` + user._id + "/unfollow",
          {
            userId: currentUser._id,
          }
        );
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(
          `${process.env.REACT_APP_API}/api/users/` + user._id + "/follow",
          {
            userId: currentUser._id,
          }
        );
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img src="./assets/ad.png" alt="" className="rightbarAd" />
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
        {user.username !== currentUser.username && (
          <button className="buttonrightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitleProfile">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rigthbarInfoKey">City: </span>
            <span className="rigthbarInfoValue">{user.city}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rigthbarInfoKey">From: </span>
            <span className="rigthbarInfoValue">{user.from}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rigthbarInfoKey">Relationship: </span>
            <span className="rigthbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitleProfile">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <div className="rightbarFollowing" key={friend._id}>
              <Link
                to={"/profile/" + friend.username}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={
                    PF +
                    (friend.profilePicture
                      ? friend.profilePicture
                      : "person/noAvatar.png")
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
              </Link>
              <span className="rightbarFollowingName">{friend.username}</span>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
