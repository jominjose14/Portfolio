import './style.css';
import {
    initDarkLightMode,
    attachEventHandler as addDarkLightToggleListener,
} from "./utils.js";

window.onload = (): void => {
    initDarkLightMode();
    addDarkLightToggleListener();
};
