import { Link } from "react-router-dom";

const NotFound = (): JSX.Element => {
  return (
    <div className="my-28 flex flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold text-white">Page not Found</h1>
      <Link
        to="/"
        className="rounded bg-blue-600 py-2 px-4 font-bold text-white hover:bg-blue-700"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
