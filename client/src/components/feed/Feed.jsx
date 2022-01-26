import { useEffect, useState } from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import "./feed.css";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./../../context/AuthContext";

export default function Feed({ username }) {
  // To save posts from this person and those they follow
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Api request to posts
    const fetchPosts = async () => {
      // If this page is username
      const res = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get("/posts/timeline/" + user._id);
      const { data } = res;
      // Update all posts
      setPosts(data);
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {/* Render all posts */}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
