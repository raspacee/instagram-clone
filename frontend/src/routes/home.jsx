import Post from "../components/Post";
import Sidebar from "../components/Sidebar";
import ProfileSuggestionLink from "../components/ProfileSuggestionLink";

export default function Root() {
  return (
    <div className="grid grid-cols-6 gap-4 h-screen rounded-lg">
      <div className="col-span-2 border-r border-gray-300 shadow-xl">
        <Sidebar />
      </div>
      <div className="col-span-2 p-4">
        <Post />
        <Post />
      </div>
      <div className="col-span-2 p-3 px-5">
        <span className="font-normal text-gray-500 mb-6">
          Suggestions for you
        </span>
        <ProfileSuggestionLink />
        <ProfileSuggestionLink />
      </div>
    </div>
  );
}
