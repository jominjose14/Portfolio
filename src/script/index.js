import {
  initDarkLightMode,
  attachEventHandler as addDarkLightToggleListener,
} from "./dark-light-mode.js";

window.onload = () => {
  initDarkLightMode();
  addDarkLightToggleListener();
};
