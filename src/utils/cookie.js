import Cookie from "cookie_js";
export function getToken() {
  return Cookie.get("admin_token");
}
export function setToken(key, value) {
  return Cookie.set({ username: key, admin_token: value });
}
export function removeToken() {
  return Cookie.remove("username", "admin_token");
}
export function getUsername() {
  return Cookie.get("username");
}
