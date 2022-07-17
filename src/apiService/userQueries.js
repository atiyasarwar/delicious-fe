import {useMutation, useQuery} from "react-query";
import {API_CONFIG, API_ROUTES} from "../Constants/APIs";
import {STORAGE_KEY} from "../Constants/Storage";
import {request} from "../utils/ServiceAction";
import utilService from "../utils/utils.service";

export function useLogin(options) {
  return useMutation(async payload => {
    const {data} = await request({
      url: API_ROUTES.login,
      method: API_CONFIG.POST,
      params: payload,
    });
    return data;
  }, options);
}

export function useRegister(options) {
  return useMutation(async payload => {
    const {data} = await request({
      url: API_ROUTES.register,
      method: API_CONFIG.POST,
      params: payload,
    });
    return data;
  }, options);
}

export function useGetFavourites(params) {
  return useQuery(STORAGE_KEY.FAVOURITES, async () => {
    const {data} = await request({
      url: utilService.createDynamicUrl(API_ROUTES.favourites, params),
      method: API_CONFIG.GET,
    });

    return data;
  });
}

export function useGetCurrentUser() {
  return useQuery(STORAGE_KEY.CURRENT_USER, async () => {
    const {data} = request({
      url: API_ROUTES.getUser,
      method: API_CONFIG.GET,
    });
    return data;
  });
}

export function useUpdateUser(options) {
  return useMutation(async payload => {
    const {data} = await request({
      url: API_ROUTES.updateUser,
      method: API_CONFIG.PUT,
      params: payload,
    });
    return data;
  }, options);
}

export function useDeleteUser(options) {
  return useMutation(() => {
    const {data} = request({
      url: API_ROUTES.deleteUser,
      method: API_CONFIG.DELETE,
    });
    return data;
  }, options);
}
