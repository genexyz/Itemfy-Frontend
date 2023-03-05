const Home = (): JSX.Element => {
  return (
    <div className="my-10 flex flex-col items-center justify-center p-4 text-white">
      <h1 className="mb-4 text-4xl font-bold">Welcome to ITEMFY</h1>
      <p className="mb-6 p-2 text-lg">
        Our app allows you to create, view, and review products in a simple and
        easy-to-use interface.
      </p>
      <div className="flex flex-wrap justify-center">
        <div className="m-4 max-w-sm rounded-lg bg-gray-800 p-4">
          <h2 className="mb-2 text-2xl font-bold">Create Products</h2>
          <p className="text-base">
            Use our app to create new products and share them with the world.
          </p>
        </div>
        <div className="m-4 max-w-sm rounded-lg bg-gray-800 p-4">
          <h2 className="mb-2 text-2xl font-bold">View Products</h2>
          <p className="text-base">
            Browse through our extensive selection of products and find the perfect one
            for you.
          </p>
        </div>
        <div className="m-4 max-w-sm rounded-lg bg-gray-800 p-4">
          <h2 className="mb-2 text-2xl font-bold">Review Products</h2>
          <p className="text-base">
            Leave reviews and ratings for your favorite products and share your
            experiences with other users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
