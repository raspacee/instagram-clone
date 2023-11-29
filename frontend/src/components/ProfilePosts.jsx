import { Link } from "react-router-dom";

export default function ProfilePosts({ photos }) {
  return (
    <div className="posts grid grid-cols-3 gap-2 mr-4 mt-4">
      {photos.length > 0 ? (
        photos.map((p) => (
          <Link to={`/post/${p._id}`}>
            <img
              src={p.imgData}
              className="object-cover cursor-pointer"
              key={p._id}
            />
          </Link>
        ))
      ) : (
        <h2>Empty posts</h2>
      )}
    </div>
  );
}
