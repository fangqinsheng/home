import Cookies from "js-cookie";

const TokenKey = "admin";

const role = "admin";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getRoles() {
  return Cookies.get(role);
}

export function setRoles(roles) {
  return Cookies.set(role, roles);
}
