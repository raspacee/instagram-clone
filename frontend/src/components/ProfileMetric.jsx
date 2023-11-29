export default function ProfileMetric({
  photosLen,
  followersLen,
  followingLen,
  bio,
}) {
  return (
    <>
      <div className="metric flex flex-row justify-between w-4/5 mt-3">
        <span>
          <span className="font-medium">{photosLen}</span>
          <span className="ml-1">posts</span>
        </span>
        <span>
          <span className="font-medium">{followersLen}</span>
          <span className="ml-1">followers</span>
        </span>
        <span>
          <span className="font-medium">{followingLen}</span>
          <span className="ml-1">following</span>
        </span>
      </div>
      <div className="bio mt-8">
        {bio != "" ? (
          bio
        ) : (
          <span className="font-medium text-gray-600">Empty bio</span>
        )}
      </div>
    </>
  );
}
