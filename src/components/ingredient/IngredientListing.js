import {DocumentAddIcon} from "@heroicons/react/outline";
import {SearchIcon} from "@heroicons/react/solid";
import {useEffect, useState} from "react";
import {
  useAddIngredient,
  useDeleteIngredient,
  useGetIngredients,
} from "../../apiService/ingredientQueries";

export default function IngredientListing() {
  const [search, setSearch] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [caloriesPer100g, setCaloriesPer100g] = useState("");
  const [currentPageCount, setCurrentPageCount] = useState(1);

  const {
    data: ingredientList = {},
    isLoading,
    refetch,
  } = useGetIngredients({
    search: search,
  });

  const ingredients = !isLoading ? ingredientList?.ingredient : [];
  const slicedIngredients = ingredients.slice(
    currentPageCount - 1,
    currentPageCount + 19
  );

  const {mutate: createIngredient} = useAddIngredient({
    onSuccess() {
      setIngredientName("");
      setCaloriesPer100g("");
      document.getElementById("ingredientForm").reset();
      refetch();
      setCurrentPageCount(1);
    },
  });

  const {mutate: deleteIngredient} = useDeleteIngredient({
    onSuccess() {
      refetch();
    },
  });

  useEffect(() => {
    setTimeout(() => {
      refetch();
    }, 500);
  }, [search]);

  const handleFormSubmit = e => {
    const payload = {
      name: ingredientName,
      calories_p_100: Number(caloriesPer100g),
    };
    e.preventDefault();
    createIngredient(payload);
  };

  const handleXClick = id => {
    deleteIngredient({id: id});
  };

  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-2 md:gap-6 mb-5">
          <div className="md:col-span-1">
            <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6 ml-4">
              <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                <div className="w-full">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                      <SearchIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                      placeholder="Search"
                      type="search"
                      onChange={e => setSearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            {!isLoading && (
              <div className="px-4 sm:px-0">
                {slicedIngredients.map(item => (
                  <p
                    key={item._id}
                    className="m-2 inline-flex align-center rounded-full border border-gray-200 py-1.5 pl-3 pr-2 text-sm font-medium bg-white text-gray-900"
                  >
                    <p className="text-gray-500">Name: &nbsp;</p>
                    <p className="text-red-600">{item.name} &nbsp;</p>
                    <p className="text-gray-500">Calories/100g: &nbsp;</p>
                    <p className="text-red-600">{item.calories_p_100}</p>
                    <button
                      type="button"
                      className="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                      onClick={() => handleXClick(item._id)}
                    >
                      <svg
                        className="h-2 w-2"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 8 8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          d="M1 1l6 6m0-6L1 7"
                        />
                      </svg>
                    </button>
                  </p>
                ))}
                <nav
                  className="bg-white mt-10 px-4 pt-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                  aria-label="Pagination"
                >
                  <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                      Showing{" "}
                      <span className="font-medium">{currentPageCount}</span> to{" "}
                      <span className="font-medium">
                        {currentPageCount + 19 < ingredientList.count
                          ? currentPageCount + 19
                          : ingredientList.count}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium">
                        {ingredientList.count}
                      </span>{" "}
                      results
                    </p>
                  </div>
                  <div className="flex-1 flex justify-between sm:justify-end">
                    <button
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      onClick={() => setCurrentPageCount(currentPageCount - 20)}
                      disabled={!!(currentPageCount <= 1)}
                    >
                      Previous
                    </button>
                    <button
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      onClick={() => setCurrentPageCount(currentPageCount + 20)}
                      disabled={
                        !!(currentPageCount + 20 >= ingredientList.count)
                      }
                    >
                      Next
                    </button>
                  </div>
                </nav>
              </div>
            )}
          </div>
          <div className="mt-5 md:mt-0 md:col-span-1">
            <form onSubmit={handleFormSubmit} id="ingredientForm">
              <div className="text-center">
                <h2 className="mt-10 text-3xl font-light text-red-900">
                  Add New Ingredient
                </h2>
              </div>
              <div className="shadow sm:rounded-md sm:overflow-hidden mt-5 mx-5">
                <div>
                  <label htmlFor="ingredientName" className="sr-only">
                    Ingredient Name
                  </label>
                  <input
                    id="ingredientName"
                    name="ingredientName"
                    type="text"
                    autoComplete="ingredientName"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm mb-2"
                    placeholder="Ingredient Name"
                    onChange={e => setIngredientName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="calories" className="sr-only">
                    Calories/100grams
                  </label>
                  <input
                    id="calories"
                    name="calories"
                    type="number"
                    autoComplete="calories"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm mb-2"
                    placeholder="Enter Calories/100grams"
                    onChange={e => setCaloriesPer100g(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <DocumentAddIcon
                        className="h-5 w-5 text-red-500 group-hover:text-red-400"
                        aria-hidden="true"
                      />
                    </span>
                    Add Ingredient
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
