import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-neutral-800">
        <div id="error-page">
          <h1 className="lg:text-6xl font-bold text-4xl text-white mb-6">Oops!</h1>
          <p className="text-xl text-white mb-4">
            Sorry, an unexpected error has occurred.
          </p>
          <p className="text-xl text-white mb-16 text-red-400">
            {error.statusText || error.message}
          </p>
          <div className="mt-4">
            <Link
              to="/"
              className="px-5 py-2 bg-white rounded-md hover:bg-gray-100 text-neutral-800"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;