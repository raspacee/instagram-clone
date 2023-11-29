import ProfileSuggestionLink from "./ProfileSuggestionLink";

export default function ProfileSuggestions() {
  return (
    <div className="col-span-2 p-3 px-5">
      <span className="font-normal text-gray-500 mb-6">
        Suggestions for you
      </span>
      <ProfileSuggestionLink username="darkKnight" />
      <ProfileSuggestionLink username="bijay" />
    </div>
  );
}
