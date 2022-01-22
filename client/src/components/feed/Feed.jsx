import { useEffect, useState } from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import "./feed.css";
import axios from "axios";

export default function Feed() {
  // To save posts from this person and those they follow
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Api request to posts
    const fetchPosts = async () => {
      const res = await axios.get("posts/timeline/61e8d8c809af7e0cfdb1f341");
      const { data } = res;
      // Update all posts
      setPosts(data);
    };
    fetchPosts();
  }, []);

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
