export default function ProfilePosts({ photos }) {
  return (
    <div className="posts grid grid-cols-3 gap-2 mr-4 mt-4">
      {photos.length > 0 ? (
        photos.map((p) => (
          <img src={p.imgData} className="object-cover" key={p._id} />
        ))
      ) : (
        <h2>Empty posts</h2>
      )}
    </div>
  );
}
