export const API_CONFIG = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
  BASE_URL_DEV: "https://delicious-web.herokuapp.com",
};

export const API_ROUTES = {
  //Users
  login: "/api/users/login",
  register: "/api/users/register",
  favourites: "/api/users/favourites?page={page}&limit={limit}",
  getUser: "/api/users/current",
  updateUser: "/api/users",
  deleteUser: "/api/users",

  //Recipes
  recipeList: "api/recipes?page={page}&limit={limit}",
  recipeDetails: "/api/recipes/{id}",
  deleteRecipe: "/api/recipes/{id}",
  handleFavourites: "/api/recipes/favourite/{id}/{action}",
  suggested: "/api/recipes/suggested?page={page}&limit={limit}",
  createRecipe: "/api/recipes/create",

  //Ingredients
  getIngredients: "/api/ingredients?name={search}",
  createIngredient: "/api/ingredients/create",
  deleteIngredient: "/api/ingredients/{id}",
};

export const CONTENT_TYPE = {
  JSON: "application/json",
  FORM_DATA: "multipart/form-data",
  TEXT: "text/plain",
};

export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  OK: 200,
  CREATED: 201,
  PAYLOAD_TOO_LARGE: 413,
  SERVER_ERROR: 500,
};

export const PAGE_SIZE = 10;
