const getAccessToken = () => {};
const state = { accessToken: getAccessToken(), username: "default", avatar: "" };
const getters = {
  accessToken: (state: any) => state.accessToken,
  username: (state) => state.name,
  avatar: (state) => state.avatar,
};
const mutation = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
    // setAccessToken(accessToken);
  },
};
export default { name: "user", state, getters };
