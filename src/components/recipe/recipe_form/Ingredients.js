import {PlusIcon} from "@heroicons/react/solid";
import {createRef, useEffect, useState} from "react";
import AutoComplete from "react-autocomplete";
import {useGetIngredients} from "../../../apiService/ingredientQueries";

export default function Ingredients({setFormValues}) {
  let weightInput = createRef();

  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState({});
  const [weightInputValue, setWeightInputValue] = useState("");
  const [search, setSearch] = useState("");
  const {
    data: item,
    isLoading,
    refetch,
  } = useGetIngredients({
    search: search,
  });

  useEffect(() => {
    setTimeout(() => {
      refetch();
    }, 500);
  }, [search]);

  const handleClick = () => {
    const weight = Number(weightInput.current.value);
    if (weight > 0) {
      if (!ingredients.includes({...inputValue, weight})) {
        setIngredients(e => [...e, {...inputValue, weight}]);
        setInputValue({});
        setWeightInputValue(0);
        setSearch("");
        setFormValues(e => [...e, {...inputValue, weight}]);
      } else {
        alert("Item already exists");
      }
    } else {
      alert("Enter weight");
    }
  };

  const handleXClick = ingredient => {
    setIngredients(ingredients.filter(x => x !== ingredient));
    setFormValues(ingredients.filter(x => x !== ingredient));
  };

  return (
    <div>
      <div>
        <h1 className="text-lg leading-6 font-medium text-gray-900">
          Ingredients
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Add the necessary ingredients for your recipe.
        </p>
      </div>

      <div>
        <main>
          <section aria-labelledby="filter-heading">
            {/* Active Ingredients */}
            <div className="bg-gray-50">
              <div className="max-w-7xl mx-auto py-3 px-4 sm:flex sm:items-center sm:px-6 lg:px-8">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Ingredients
                  <span className="sr-only">, active</span>
                </h3>

                <div
                  aria-hidden="true"
                  className="hidden w-px h-5 bg-gray-300 sm:block sm:ml-4"
                />

                <div className="mt-2 sm:mt-0 sm:ml-4">
                  <div className="-m-1 flex flex-wrap items-center">
                    {ingredients.map(ingredient => (
                      <span
                        key={ingredient._id}
                        className="m-1 inline-flex rounded-full border border-gray-200 items-center py-1.5 pl-3 pr-2 text-sm font-medium bg-white text-gray-900"
                      >
                        <span>{`${ingredient.name} - ${ingredient.weight}grams`}</span>
                        <button
                          type="button"
                          className="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                          onClick={() => handleXClick(ingredient)}
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
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="products-heading"
            className="max-w-2xl mx-auto pt-4 pb-4 px-4 sm:pt-4 sm:pb-8 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              <div className="space-y-1">
                <label
                  htmlFor="add-ingredients"
                  className="block text-sm font-medium text-gray-700"
                >
                  Add Ingredients
                </label>
                <div className="flex">
                  <div className="flex-grow">
                    <AutoComplete
                      className="block shadow-sm p-2 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm text-lg border border-gray-300 rounded-md"
                      wrapperProps={{
                        type: "text",
                        name: "add-ingredients",
                        id: "add-ingredients",
                        className:
                          "block shadow-sm p-2 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm text-lg border border-gray-300 rounded-md",
                        placeholder: "Enter an ingredient",
                        "aria-describedby": "add-ingredients",
                      }}
                      getItemValue={item => item.name}
                      items={!isLoading ? item : []}
                      renderItem={(item, isHighlighted) => (
                        <div
                          className="block shadow-sm p-2 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm text-lg border border-gray-300"
                          style={{
                            background: isHighlighted ? "lightgray" : "white",
                          }}
                        >
                          {item.name}
                        </div>
                      )}
                      value={search}
                      onChange={e => {
                        setSearch(e.target.value);
                      }}
                      onSelect={(item, obj) => {
                        setSearch(item);
                        setInputValue(obj);
                      }}
                    />
                  </div>
                  <div className="flex-grow">
                    <input
                      type="number"
                      name="weight"
                      id="weight"
                      className="block shadow-sm p-2 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm text-lg border border-gray-300 rounded-md"
                      placeholder="Enter weight in grams"
                      aria-describedby="add-ingredients"
                      ref={weightInput}
                      value={weightInputValue}
                      onChange={e => setWeightInputValue(e.target.value)}
                    />
                  </div>
                  <span className="ml-3">
                    <button
                      type="button"
                      className="bg-white inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      onClick={handleClick}
                    >
                      <PlusIcon
                        className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span>Add</span>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
