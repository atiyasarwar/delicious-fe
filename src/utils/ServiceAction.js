import ApiService from "../services/ApiService";

export async function request({url, method, params, config}) {
  const response = (await ApiService[method]?.(url, params, config)) || {};

  if (response.ok) {
    return response;
  } else {
    alert(response?.response.message);
  }
}
