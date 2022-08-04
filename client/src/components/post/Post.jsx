import { MoreVert } from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import "./post.css";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  // Public folder
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // Change status and view of like in post
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  // User of post
  const [user, setUser] = useState({});

  // Current user
  const { user: currentUser } = useContext(AuthContext);
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  // Load the user of post
  useEffect(() => {
    // Api request to user
    const fetchUser = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/users?userId=${post.userId}`
      );
      const { data } = res;
      // User of this post
      setUser(data);
    };
    fetchUser();
  }, [post.userId]);

  // Change status of like
  const likeHandler = () => {
    try {
      axios.put(`${process.env.REACT_APP_API}/api/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (error) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  // Render post with info of user
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  PF +
                  (user.profilePicture
                    ? user.profilePicture
                    : "person/noAvatar.png")
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post?.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.img ? PF + post.img : ""} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              alt=""
              onClick={likeHandler}
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              alt=""
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post?.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
