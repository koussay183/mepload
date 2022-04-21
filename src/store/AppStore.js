import { Store } from "pullstate";

export const AppStore = new Store({
  isLoggedIn: false,
  room: {},
});
