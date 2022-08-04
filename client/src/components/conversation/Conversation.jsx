import { useEffect, useState } from "react";
import axios from "axios";
import "./conversation.css";

export default function Conversations({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Find the other user
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUSer = async () => {
      try {
        const res = await axios(
          `${process.env.REACT_APP_API}/api/users?userId=` + friendId
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUSer();
  }, [conversation, currentUser]);

  const pf = process.env.REACT_APP_PUBLIC_FOLDER;
  const picture = user?.profilePicture
    ? user.profilePicture
    : "person/noAvatar.png";

  return (
    <div className="conversation">
      <img className="conversationImg" src={`${pf + picture}`} alt="" />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
