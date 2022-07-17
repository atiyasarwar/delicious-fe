import get from "lodash.get";
import * as lodashIsEmpty from "lodash.isempty";
import {STORAGE_KEY} from "../Constants/Storage";
import LocalStorageService from "../services/local-storage.service";

const utilService = {
  getLoginUrl,
  loginUser,
  logoutUser,
  getValue,
  redirectToLogin,
  redirectTo,
  isEmpty,
  capitalizedString,
  getKeyByValue,
  createDynamicUrl,
};

function getLoginUrl() {
  return "/login";
}

function loginUser(data) {
  LocalStorageService.clear();
  LocalStorageService.set(STORAGE_KEY.USER_INFO, JSON.stringify(data.user));
  LocalStorageService.set(STORAGE_KEY.TOKEN, data?.token);
  redirectTo("/");
}

function logoutUser() {
  LocalStorageService.clear();
  redirectTo("/login");
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function capitalizedString(value, placeholder = "--") {
  if (!value) {
    return placeholder;
  }
  let valueArray = value.split(" ");
  valueArray = valueArray.map(item => {
    return item.charAt(0).toUpperCase() + item.slice(1);
  });
  return valueArray.join(" ");
}

function getValue(...param) {
  return get(...param);
}

function redirectToLogin(loginUrl = getLoginUrl()) {
  utilService.redirectTo(loginUrl);
}

function redirectTo(url) {
  window.location.href = url;
}

function isEmpty(value) {
  return lodashIsEmpty(value);
}

function createDynamicUrl(dynamicUrl, object) {
  for (const key in object) {
    dynamicUrl = dynamicUrl.replace(`{${key}}`, object[key]);
  }
  return dynamicUrl;
}

export default utilService;
