import store from "@store";
export function buttonPermission(permission) {
  const button = store.getters["permission/button"];
  return button.indexOf(permission) !== -1;
}
