import {useQuery} from "react-query";
import {request} from "../utils/ServiceAction";
import {API_CONFIG, API_ROUTES} from "../Constants/APIs";
import {STORAGE_KEY} from "../Constants/Storage";
import utilService from "../utils/utils.service";

export function useGetVehicleListing(payload) {
  return useQuery([STORAGE_KEY.VEHICLE_LIST, payload], async () => {
    const {data} = await request({
      url: API_ROUTES.vehicleList,
      method: API_CONFIG.GET,
    });

    return data;
  });
}

export function useGetVehicleDetails(vehicleId) {
  return useQuery(
    [STORAGE_KEY.VEHICLE_INFO, vehicleId],
    async () => {
      const {data} = await request({
        url: utilService.createDynamicUrl(API_ROUTES.vehicleDetail, vehicleId),
        method: API_CONFIG.GET,
      });

      return data;
    },
    {staleTime: Infinity, cacheTime: Infinity}
  );
}
