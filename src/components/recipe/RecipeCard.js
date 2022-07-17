import utilService from "../../utils/utils.service";

export default function RecipeCard({recipes}) {
  return (
    <>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map(recipe => (
          <div
            key={recipe.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="w-0 flex-1">
                  <dl>
                    <dt>
                      <div>
                        <img
                          src={recipe.image}
                          className="object-cover w-full h-48"
                          alt=""
                        />
                      </div>
                    </dt>
                    <div className="mt-4 flex justify-between md:mt-2">
                      <dt className="text-lg font-medium text-gray-500 truncate">
                        {utilService.capitalizedString(recipe.name)}
                      </dt>
                    </div>
                    <dd>
                      <div className="text-sm text-gray-900">
                        {utilService.capitalizedString(recipe.cuisine)}
                      </div>
                    </dd>
                    <dd>
                      <div className="text-sm text-gray-900">
                        {utilService.capitalizedString(recipe.meal_type)}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="flex justify-between bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <button
                  onClick={() =>
                    utilService.redirectTo(`/recipe/${recipe._id}`)
                  }
                  className="font-medium text-red-700 hover:text-red-900"
                >
                  View detail
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
