import { useState, useEffect } from "react";
import Post from "../components/Post";
import Sidebar from "../components/Sidebar";
import { fetchRequest } from "../api/fetchRequest";
import ProfileSuggestions from "../components/ProfileSuggestions";

export default function Root() {
  const [posts, setPosts] = useState([]);

  const fetchHomePosts = async () => {
    const response = await fetchRequest("posts/", true, "GET");
    if (response.status == 204) {
      console.log(response);
      setPosts(null);
    } else {
      const p = await response.json();
      setPosts(p.posts);
    }
  };

  useEffect(() => {
    fetchHomePosts();
  }, []);

  return (
    <div className="grid grid-cols-6 gap-4 h-screen rounded-lg">
      <div className="col-span-2 border-r border-gray-300 shadow-xl">
        <Sidebar />
      </div>
      <div className="col-span-2 p-4">
        {posts === null && (
          <div className="w-full flex flex-col items-center h-full justify-center">
            <h2 className="w-auto font-medium text-xl">
              Follow some people to see posts
            </h2>
          </div>
        )}
        {posts !== null &&
          posts.length > 0 &&
          posts.map((p) => (
            <Post
              key={p._id}
              imgData={p.imgData}
              text={p.text}
              username={p.authorUsername}
              likes={p.likes}
              _id={p._id}
            />
          ))}
      </div>
      <ProfileSuggestions />
    </div>
  );
}
