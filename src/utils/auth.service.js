import {STORAGE_KEY} from "../Constants/Storage";
import LocalStorageService from "../services/local-storage.service";

const AuthService = {
  isTokenExist,
  getToken,
  getUserInfo,
  getRole,
};

function getRole() {
  let userInfo = LocalStorageService.get(STORAGE_KEY.USER_INFO);
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    return userInfo?.user?.is_admin;
  }
  return null;
}

function isTokenExist() {
  let token = LocalStorageService.get(STORAGE_KEY.TOKEN);
  if (token) {
    return true;
  }
  return false;
}

function getToken() {
  let token = LocalStorageService.get(STORAGE_KEY.TOKEN);

  if (token) {
    return token;
  }
  return null;
}

function getUserInfo() {
  let userInfo = LocalStorageService.get(STORAGE_KEY.USER_INFO);
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    return userInfo;
  }
  return null;
}

export default AuthService;
