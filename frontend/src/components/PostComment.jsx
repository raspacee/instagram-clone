import { Link } from "react-router-dom";

export default function PostComment() {
  return (
    <div className="bg-gray-200 p-2 rounded-md mb-3">
      <div className="flex flex-row items-center">
        <img
          src="https://t3.ftcdn.net/jpg/01/61/94/36/360_F_161943605_EtOwfyOlGQeuKUA1AOrdUBzrCb6oZosd.jpg"
          className="w-7 h-7 rounded-full mr-2"
        />
        <Link to="/profile/bigshak">
          <h3 className="font-medium text-base">bigshak</h3>
        </Link>
        <span className="ml-2 text-sm font-normal text-gray-500">
          Nov 23, 2023
        </span>
      </div>
      <span className="mt-2">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        recusandae quibusdam repudiandae
      </span>
    </div>
  );
}
