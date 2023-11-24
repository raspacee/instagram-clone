import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PostComment from "../components/PostComment";
import { fetchRequest } from "../api/fetchRequest";
import { getCookie } from "../api/cookie";

export default function PostDetail() {
  const [isLiked, setIsLiked] = useState(false);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState("");
  let { postID } = useParams();

  const fetchPost = async () => {
    const response = await fetchRequest("posts/" + postID, true, "GET");
    const data = await response.json();
    setPost(data.post);
    setComments(data.comments);
    const userID = getCookie("_id");
    if (data.post.likes.find((l) => l.userID == userID)) {
      setIsLiked(true);
    }
  };

  const handleLike = async () => {
    if (isLiked) {
      const response = await fetchRequest(
        "posts/unlike/" + postID,
        true,
        "POST"
      );
      if (response.status == 200) {
        const d = await response.json();
        setIsLiked(false);
      }
    } else {
      const response = await fetchRequest("posts/like/" + postID, true, "POST");
      if (response.status == 200) {
        setIsLiked(true);
      }
    }
  };

  const handleCreateComment = async () => {
    const body = { text: inputComment };
    if (inputComment != "") {
      const response = await fetchRequest(
        "comments/" + postID,
        true,
        "POST",
        JSON.stringify(body),
        {
          "Content-Type": "application/json",
        }
      );
      if (response.status == 201) {
        const data = await response.json();
        setComments((old) => [data.comment, ...old]);
        setInputComment("");
      } else {
        console.log("ERROR");
      }
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="grid grid-cols-6 gap-4 h-screen rounded-lg">
      <div className="col-span-2 border-r border-gray-300 shadow-xl">
        <Sidebar />
      </div>
      <div className="col-span-4 mt-2 flex flex-col items-center">
        <div className="w-2/3 ">
          {post && (
            <img
              className="object-cover shadow-xl drop-shadow-lg mb-3"
              src={post.imgData}
            />
          )}
          {post && (
            <span className="font-normal text-gray-800 text-base">
              {post.text}
            </span>
          )}
          <div className="flex flex-row gap-3 py-1 px-2 mt-1">
            <span onClick={handleLike} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 ${isLiked ? "fill-red-500" : ""}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                />
              </svg>
            </span>
          </div>
          <div className="mb-2">
            <label
              htmlFor="large-input"
              className="block mb-2 mt-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Write a comment
            </label>
            <input
              placeholder="write your thoughts"
              type="text"
              id="large-input"
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={inputComment}
              onChange={(e) => setInputComment(e.target.value)}
            />
            <button
              type="button"
              className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleCreateComment}
            >
              Comment
            </button>
          </div>
          <div className="w-full border mb-2 bg-black"></div>
          <div className=" w-full mt-2">
            {comments.map((c) => (
              <PostComment
                key={c._id}
                text={c.text}
                postedDate={c.postedDate}
                authorID={c.authorID}
                authorUsername={c.authorUsername}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
