import {useState} from "react";
import {useParams} from "react-router-dom";

import {HeartIcon, TrashIcon} from "@heroicons/react/outline";

import {
  useGetRecipeDetails,
  useHandleFavourites,
} from "../../apiService/recipeQueries";
import AuthService from "../../utils/auth.service";
import RecipeDelete from "./RecipeDelete";
import {useQueryClient} from "react-query";
import {STORAGE_KEY} from "../../Constants/Storage";

export default function RecipeDetail() {
  const [modal, setModal] = useState(false);
  const {id} = useParams();

  const userInfo = AuthService.getUserInfo();
  const queryClient = useQueryClient();
  const {
    data: recipeDetails,
    isFetched,
    refetch,
  } = useGetRecipeDetails({id: id});
  const {mutate: handleFavourites} = useHandleFavourites({
    onSuccess() {
      refetch();
      queryClient.invalidateQueries(STORAGE_KEY.FAVOURITES);
    },
  });

  if (!AuthService.isTokenExist())
    return (
      <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-15">
        <p className="text-3xl text-center text-gray-700">
          Please login or register to view this page.
        </p>
      </div>
    );

  if (!recipeDetails && isFetched)
    return (
      <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-15">
        <p className="text-3xl text-center text-gray-700">No recipe found!</p>
      </div>
    );

  return (
    <>
      {isFetched && (
        <div className="bg-white">
          <main className="max-w-7xl mx-auto sm:pt-16 sm:px-6 lg:px-8 mb-5">
            <div className="max-w-2xl mx-auto lg:max-w-none">
              <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                <div className="flex flex-col-reverse">
                  <div className="w-full aspect-w-1 aspect-h-1">
                    <div>
                      <img
                        src={recipeDetails.image}
                        alt=""
                        className="w-full h-full object-center object-cover sm:rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                  <div className="flex sm:flex-col1">
                    <h1 className="flex text-3xl font-extrabold tracking-tight text-gray-900">
                      {recipeDetails.name}
                    </h1>
                    {recipeDetails.user_id === userInfo._id && (
                      <button
                        type="button"
                        className="group ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                        onClick={() => setModal(true)}
                      >
                        <TrashIcon
                          className="h-5 w-5 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <p className="hidden ml-1 group-hover:block">
                          Delete Recipe
                        </p>
                      </button>
                    )}
                  </div>
                  <div className="mt-3">
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-red-600 mx-2 my-2">
                      <p className="text-gray-500">Cuisine:&nbsp;</p>
                      <p className="text-red-600">{recipeDetails.cuisine}</p>
                    </span>
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-red-600 mx-2 my-2">
                      <p className="text-gray-500">Meal Type:&nbsp;</p>
                      <p className="text-red-600">{recipeDetails.meal_type}</p>
                    </span>
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 mx-2 my-2">
                      <p className="text-gray-500">Calories/Serving:&nbsp;</p>
                      <p className="text-red-600">
                        {recipeDetails.calories_per_serving}
                      </p>
                    </span>
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 mx-2 my-2">
                      <p className="text-gray-500">Serving Size:&nbsp;</p>
                      <p className="text-red-600">
                        {recipeDetails.serving_size}
                      </p>
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-gray-9005 my-5">
                      Ingredients
                    </h3>
                    <ul>
                      {recipeDetails.ingredients.map(item => (
                        <li>
                          <p className="text-base tracking-tight text-gray-500">
                            {item.name}
                          </p>
                          <p className="text-base tracking-tight text-red-600 mb-5">{`${item.weight} grams`}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-gray-9005 my-5">
                      Procedure
                    </h3>
                    <ul>
                      {recipeDetails.procedure.map((item, index) => (
                        <li>
                          <p className="text-base tracking-tight text-gray-500 mb-3">
                            {`${index + 1} - ${item}`}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    className="group py-3 px-3 rounded-md flex items-center justify-center text-red-600 hover:bg-gray-100"
                  >
                    <HeartIcon
                      className={`h-6 w-6 flex-shrink-0 ${
                        !!recipeDetails.is_favourite && "fill-red-600"
                      }`}
                      aria-hidden="true"
                      onClick={() =>
                        handleFavourites({
                          id: recipeDetails._id,
                          action: !!recipeDetails.is_favourite ? 2 : 1,
                        })
                      }
                    />
                    <p className="hidden ml-1 group-hover:block">
                      {!!recipeDetails.is_favourite
                        ? "Remove from Favourites"
                        : "Add to Favourites"}
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </main>
          {modal && <RecipeDelete modal={modal} setModal={setModal} id={id} />}
        </div>
      )}
    </>
  );
}
