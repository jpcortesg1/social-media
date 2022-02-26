import { useEffect, useState } from "react";
import axios from "axios";
import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  // All friends of users
  const [friends, setFriends] = useState([]);
  // Only friends online
  const [onlineFriends, setOnlineFriends] = useState([]);

  // Get friends
  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get("/users/friends/" + currentId);
      setFriends(res.data);
    };
    getUsers();
  }, [currentId]);

  // Only online friends
  useEffect(() => {
    setOnlineFriends(
      friends.filter((f) => onlineUsers.some((o) => o === f._id))
    );
  }, [friends, onlineUsers]);

  const pf = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleClick = async (user) => {
    try {
      let res = await axios.get(`/conversation/find/${currentId}/${user._id}/`);
      if (!res.data) {
        res = await axios.post("/conversation", {
          senderId: currentId,
          receiverId: user._id,
        });
        console.log(res.data);
      }
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div
          className="chatOnlineFriend"
          key={o._id}
          onClick={() => handleClick(o)}
        >
          <div className="chatOnlineContainer">
            <img
              className="chatOnlineImg"
              src={
                pf +
                (o?.profilePicture ? o.profilePicture : "person/noAvatar.png")
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}
