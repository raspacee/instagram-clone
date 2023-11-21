import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookie from "universal-cookie";
import { fetchPhotos, fetchRequest } from "../../api/fetchRequest";
import ProfilePosts from "../../components/ProfilePosts";
import ProfileMetric from "../../components/ProfileMetric";

export default function Other() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [showFollow, setShowFollow] = useState(false);
  const [showUnfollow, setShowUnfollow] = useState(false);
  const [targetID, setTargetID] = useState("");
  const [photos, setPhotos] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const cookies = new Cookie(import.meta.env.VITE_COOKIES_NAME);
  const navigate = useNavigate();

  let { query } = useParams();

  const fetchProfile = async () => {
    const response = await fetchRequest("users/profile/" + query, true, "GET");
    const data = await response.json();
    if (!data.user) {
      alert("Not found");
    } else {
      const user = data.user;

      if (user._id == cookies.get("_id")) {
        console.log("re");
        navigate("/profile/me");
      } else if (
        user.followers.filter((u) => u.userID == cookies.get("_id")).length == 0
      ) {
        setShowFollow(true);
      } else {
        setShowUnfollow(true);
      }

      setUsername(user.username);
      setBio(user.bio);
      setTargetID(user._id);
      setFollowers(user.followers);
      setFollowing(user.following);
      const p = await fetchPhotos(user._id);
      setPhotos(p);
    }
  };

  const fetchFollow = async (action) => {
    const response = await fetchRequest(
      "users/" + action + "/" + targetID,
      true,
      "POST"
    );
    if (response.status !== 200) {
      console.log("Authorization problem");
    } else {
      const data = await response.json();
      if (data.message && action == "follow") {
        setShowFollow(false);
        setShowUnfollow(true);
      } else if (data.message && action == "unfollow") {
        setShowFollow(true);
        setShowUnfollow(false);
      } else {
        console.log(data);
      }
    }
  };

  const handleFollow = () => {
    fetchFollow("follow");
  };

  const handleUnfollow = () => {
    fetchFollow("unfollow");
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div className="grid grid-cols-6 gap-4 h-screen rounded-lg">
      <div className="col-span-2 border-r border-gray-300 shadow-xl">
        <Sidebar />
      </div>
      <div className="col-span-4 p-4 mt-4">
        <div className="profile grid w-full gap-2 grid-cols-8">
          <div className="col-span-2">
            <img
              className="w-48 h-48 object-cover rounded-full"
              src="https://www.rollingstone.com/wp-content/uploads/2018/06/bladerunner-2-trailer-watch-8bd914b0-744f-43fe-9904-2564e9d7e15c.jpg"
            />
          </div>
          <div className="col-span-4 ml-4">
            <div className="names flex flex-row justify-between w-4/5">
              <span className="font-medium text-lg">{username}</span>
              <span className="flex flex-row">
                {showFollow && (
                  <button
                    onClick={handleFollow}
                    className="mr-5 bg-blue-500 text-white font-md rounded-md px-5 py-1"
                  >
                    Follow
                  </button>
                )}
                {showUnfollow && (
                  <button
                    onClick={handleUnfollow}
                    className="mr-5 bg-blue-500 text-white font-md rounded-md px-5 py-1"
                  >
                    Unfollow
                  </button>
                )}
                <svg
                  fill="#000000"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 32.055 32.055"
                  xmlSpace="preserve"
                  className="w-5"
                >
                  <g>
                    <path
                      d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967
		C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967
		s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967
		c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"
                    />
                  </g>
                </svg>
              </span>
            </div>
            <ProfileMetric
              followersLen={followers.length}
              followingLen={following.length}
              photosLen={photos.length}
              bio={bio}
            />
          </div>
        </div>
        <hr className="mt-5 border-2" />
        <ProfilePosts photos={photos} />
      </div>
    </div>
  );
}
