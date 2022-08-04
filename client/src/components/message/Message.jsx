import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import "./message.css";

export default function Message({ own, message }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios(
          `${process.env.REACT_APP_API}/api/users?userId=` + message.sender
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [message]);

  const pf = process.env.REACT_APP_PUBLIC_FOLDER;
  const picture = user?.profilePicture
    ? user.profilePicture
    : "person/noAvatar.png";

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={pf + picture} alt="" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
