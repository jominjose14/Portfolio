// dark/light modes
export function initDarkLightMode(): void {
    if (window.matchMedia(`(prefers-color-scheme: dark)`).matches) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
    } else {
        document.documentElement.classList.remove("dark-mode");
        document.documentElement.classList.add("light-mode");
    }
}

export function attachEventHandler() {
    document
        .querySelector(".dark-light-switch")!
        .addEventListener("click", toggleDarkLightMode);
}

function toggleDarkLightMode() {
    const img: HTMLImageElement = document.querySelector(".dark-light-switch img")!;
    if (img.src.includes("sun.svg")) {
        img.src = "moon.svg";
        img.alt = "Dark Mode";
    } else {
        img.src = "sun.svg";
        img.alt = "Light Mode";
    }
    document.documentElement.classList.toggle("dark-mode");
    document.documentElement.classList.toggle("light-mode");
}
