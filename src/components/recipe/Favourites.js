import {useGetFavourites} from "../../apiService/userQueries";

import RecipeCard from "./RecipeCard";

export default function Favourites() {
  const payload = {page: 1, limit: 100};
  const {data: recipes, isFetched} = useGetFavourites(payload);

  if (recipes?.count === 0 && isFetched)
    return (
      <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-15">
        <p className="text-3xl text-center text-gray-700">
          No recipes found...!
        </p>
      </div>
    );

  return (
    <>
      {isFetched && (
        <div className="px-4 py-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-14">
          <div className="flex flex-col w-full mb-6 lg:justify-between lg:flex-row md:mb-8">
            <div className="flex items-center mb-5 md:mb-6 group lg:max-w-xl">
              <a href="/" aria-label="Item" className="mr-3">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50">
                  <svg
                    className="w-12 h-12 text-red-600"
                    stroke="currentColor"
                    viewBox="0 0 52 52"
                  >
                    <polygon
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      points="29 13 14 29 25 29 23 39 38 23 27 23"
                    />
                  </svg>
                </div>
              </a>
              <h2 className="font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl">
                <span className="inline-block mb-2">Favourites</span>
                <div className="h-1 ml-auto duration-300 origin-left transform bg-red-600 scale-x-30 group-hover:scale-x-100" />
              </h2>
            </div>
          </div>
          <RecipeCard recipes={recipes.recipes} />
          <nav
            className="bg-white mt-10 px-4 pt-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
            aria-label="Pagination"
          >
            <div className="hidden sm:block">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{1}</span> to{" "}
                <span className="font-medium">{recipes.count}</span> of{" "}
                <span className="font-medium">{recipes.count}</span> results
              </p>
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
              <button
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                onClick={(payload.page = payload.page - 1)}
                disabled={!!(payload.page <= 1)}
              >
                Previous
              </button>
              <button
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                onClick={(payload.page = payload.page + 1)}
              >
                Next
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
