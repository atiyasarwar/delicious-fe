import Ingredients from "./recipe_form/Ingredients";
import Procedure from "./recipe_form/Procedure";

import {useState} from "react";
import {useCreateRecipe} from "../../apiService/recipeQueries";
import utilService from "../../utils/utils.service";

export default function RecipeCreate() {
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [meal_type, setMealType] = useState("");
  const [procedure, setProcedure] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [image, setImage] = useState(null);

  const {mutate: create} = useCreateRecipe({
    onSuccess() {
      utilService.redirectTo("/");
    },
  });

  const handleFormSubmit = e => {
    e.preventDefault();
    const payload = {name, cuisine, meal_type, procedure, ingredients, image};

    create(payload);
  };

  return (
    <>
      <div>
        <div>
          <form onSubmit={handleFormSubmit}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Image
                  </h1>
                  {image && (
                    <img
                      src={image}
                      className="rounded my-5"
                      alt="Incorrect URL"
                    />
                  )}
                  <input
                    type="text"
                    name="image"
                    id="image"
                    className="shadow-sm p-2 focus:outline-none focus:ring-red-500 focus:border-red-500 mt-1 block w-full border border-gray-300 rounded-md"
                    placeholder="Add Image URL"
                    onChange={e => {
                      setImage(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Name
                  </h1>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="shadow-sm p-2 focus:outline-none focus:ring-red-500 focus:border-red-500 mt-1 block w-full border border-gray-300 rounded-md"
                    placeholder="Recipe Name"
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Cuisine
                  </h1>
                  <input
                    type="text"
                    name="cuisine"
                    id="cuisine"
                    className="shadow-sm p-2 focus:outline-none focus:ring-red-500 focus:border-red-500 mt-1 block w-full border border-gray-300 rounded-md"
                    placeholder="Recipe's Cuisine"
                    onChange={e => setCuisine(e.target.value)}
                  />
                </div>
                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Meal Type
                  </h1>
                  <input
                    type="text"
                    name="meal_type"
                    id="meal_type"
                    className="shadow-sm p-2 focus:outline-none focus:ring-red-500 focus:border-red-500 mt-1 block w-full border border-gray-300 rounded-md"
                    placeholder="Enter Meal Type e.g Snack, Lunch etc."
                    onChange={e => setMealType(e.target.value)}
                  />
                </div>
                <Ingredients setFormValues={setIngredients} />
                <Procedure setFormValues={setProcedure} />
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="w-full bg-red-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-cyan-500"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
