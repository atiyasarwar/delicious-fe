import {useMutation, useQuery} from "react-query";
import {request} from "../utils/ServiceAction";
import {API_CONFIG, API_ROUTES} from "../Constants/APIs";
import {STORAGE_KEY} from "../Constants/Storage";
import utilService from "../utils/utils.service";

export function useGetRecipeList(params) {
  return useQuery([STORAGE_KEY.RECIPES], async () => {
    const {data} = await request({
      url: utilService.createDynamicUrl(API_ROUTES.recipeList, params),
      method: API_CONFIG.GET,
    });

    return data;
  });
}

export function useGetRecipeDetails(id) {
  return useQuery([STORAGE_KEY.RECIPE_DETAILS, id], async () => {
    const {data} = await request({
      url: utilService.createDynamicUrl(API_ROUTES.recipeDetails, id),
      method: API_CONFIG.GET,
    });
    return data;
  });
}

export function useDeleteRecipe(options) {
  return useMutation(async id => {
    const {data} = await request({
      url: utilService.createDynamicUrl(API_ROUTES.deleteRecipe, id),
      method: API_CONFIG.DELETE,
    });
    return data;
  }, options);
}

export function useHandleFavourites(options) {
  return useMutation(async params => {
    const {data} = await request({
      url: utilService.createDynamicUrl(API_ROUTES.handleFavourites, params),
      method: API_CONFIG.POST,
    });
    return data;
  }, options);
}

export function useGetSuggested(params) {
  return useQuery([STORAGE_KEY.SUGGESTED], async () => {
    const {data} = await request({
      url: utilService.createDynamicUrl(API_ROUTES.suggested, params),
      method: API_CONFIG.GET,
    });

    return data;
  });
}

export function useCreateRecipe(options) {
  return useMutation(async params => {
    const {data} = await request({
      url: API_ROUTES.createRecipe,
      method: API_CONFIG.POST,
      params,
    });
    return data;
  }, options);
}
