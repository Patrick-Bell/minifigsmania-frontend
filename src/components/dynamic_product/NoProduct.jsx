import { Link } from "react-router-dom"; // Change this to "next/link" if using Next.js

const NoProduct = () => {
  return (
    <main className="grid place-items-center bg-white px-6 py-24 sm:py-20 lg:px-4">
      <div className="text-center max-w-7xl">
        <p className="text-sm font-medium text-indigo-600 uppercase tracking-wide">404 Error</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Product Not Found
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          The product you're looking for doesn't seem to exist. Try browsing our categories or contact our support team.
        </p>

        <div className="mt-8">
          <p className="text-md text-gray-700 mb-3">Explore popular categories:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Football", "Marvel", "Sonic"].map((category) => (
              <Link
                key={category}
                to={`/products?category=${category.toLowerCase()}`}
                className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-500 transition"
          >
            View All Products
          </Link>
          <Link
            to="/support"
            className="inline-flex items-center justify-center text-sm font-semibold text-gray-900 hover:underline"
          >
            Contact Support &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NoProduct;
