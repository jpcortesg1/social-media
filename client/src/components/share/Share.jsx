import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "./../../context/AuthContext";
import axios from "axios";

export default function Share() {
  // Public folder
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // Current user
  const { user } = useContext(AuthContext);

  // Publication fields
  const desc = useRef();

  // If is selected a file
  const [file, setFile] = useState(null);

  // When submit publication
  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;

      data.append("fileName", fileName);
      data.append("file", file);
      newPost.img = fileName;

      try {
        await axios.post(`${process.env.REACT_APP_API}/api/upload`, data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.post(`${process.env.REACT_APP_API}/api/posts`, newPost);
      window.location.reload();
    } catch (error) {}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImgP"
            src={
              PF +
              (user.profilePicture
                ? user.profilePicture
                : "person/noAvatar.png")
            }
            alt=""
          />
          <input
            type="text"
            className="shareInput"
            placeholder={`What's in ypur mind ${user.username}?`}
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>

            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>

            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>

            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
