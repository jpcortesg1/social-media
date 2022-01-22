import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  // Public folder
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // User of profile
  const [user, setUser] = useState({});
  // Paramas of url
  const username = useParams().username;

  useEffect(() => {
    // Api request to user
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      const { data } = res;
      // User of this post
      setUser(data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  PF +
                  (user.coverPicture ? user.coverPicture : "person/noCover.png")
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  PF +
                  (user.profilePicture
                    ? user.profilePicture
                    : "person/noAvatar.png")
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
