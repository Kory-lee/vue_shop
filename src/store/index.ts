// const files = require.context("./modules", false, /\.ts$/);
import files from "globby!/@/store/modules/*";
import { createStore, StoreOptions } from "vuex";
const modules: StoreOptions= {};
Object.keys(files).forEach((key: string) => {
  const obj= files[key];
  obj["namespaced"] = true;
  modules[obj.name] = obj;
  // delete modules[obj.name].name;
});
console.log("files", modules);

export default createStore(modules);
