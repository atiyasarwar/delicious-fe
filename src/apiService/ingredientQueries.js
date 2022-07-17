import {useMutation, useQuery} from "react-query";
import {API_CONFIG, API_ROUTES} from "../Constants/APIs";
import {STORAGE_KEY} from "../Constants/Storage";
import {request} from "../utils/ServiceAction";
import utilService from "../utils/utils.service";

export function useGetIngredients(params) {
  return useQuery([STORAGE_KEY.INGREDIENTS], async () => {
    const {data} = await request({
      url: utilService.createDynamicUrl(API_ROUTES.getIngredients, params),
      method: API_CONFIG.GET,
    });

    return data;
  });
}

export function useAddIngredient(options) {
  return useMutation(async params => {
    const {data} = await request({
      url: API_ROUTES.createIngredient,
      method: API_CONFIG.POST,
      params,
    });
    return data;
  }, options);
}

export function useDeleteIngredient(options) {
  return useMutation(async id => {
    const {data} = await request({
      url: utilService.createDynamicUrl(API_ROUTES.deleteIngredient, id),
      method: API_CONFIG.DELETE,
    });
    return data;
  }, options);
}
