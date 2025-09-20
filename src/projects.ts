import './style.css';
import { projects } from "./projects-list.js";
import {
    initDarkLightMode,
    attachEventHandler as addDarkLightToggleListener,
} from "./utils.js";
import type { Project, ProjectTile } from './types.js';

window.onload = (): void => {
    initDarkLightMode();
    addDarkLightToggleListener();
    loadProjects();
    addEventListeners();
};

function addEventListeners(): void {
    document.querySelector(".dialog-close")!.addEventListener("click", closeModal);
    document
        .querySelectorAll(".tile")
        .forEach((tile) => tile.addEventListener("click", openProjectModal));
}

function loadProjects(): void {
    const parser = new DOMParser();
    const projectsBox = document.querySelector(".box.index")!;

    projects.forEach((project: Project) => {
        const {
            name,
            image,
            about,
            tech,
            webApp,
            demoVideo,
            download,
            sourceCode,
        } = project;
        const doc = parser.parseFromString(
            `
        <div
          class="tile"
          data-about="${about}"
          data-tech="${tech}"
          ${webApp ? `data-web-app="${webApp}"` : ""}
          ${demoVideo ? `data-demo-video="${demoVideo}"` : ""}
          ${download ? `data-download="${download}"` : ""}
          ${sourceCode ? `data-source-code="${sourceCode}"` : ""}
        >
          <img src="${image}" alt="${name}" />
          <div class="title">${name}</div>
        </div>
      `,
            "text/html"
        );
        projectsBox.appendChild(doc.body.firstChild!);
    });
}

function createAnchor(type: string, link: string, svgName: string, parent: HTMLElement) {
    // @ts-ignore
    const fragment = document
        .querySelector("#project-link-template")
        // @ts-ignore
        .content.cloneNode(true);
    const anchor = fragment.querySelector("a");
    anchor.href = link;
    anchor.querySelector("span").innerText = type;
    anchor.querySelector("img").alt = type;
    anchor.querySelector("img").src = `${svgName}.svg`;
    parent.appendChild(anchor);
}

export function openProjectModal(event: Event) {
    const target: HTMLElement = event.target as HTMLElement;
    const tile: ProjectTile = target.closest(".tile") as ProjectTile;
    const img = tile!.querySelector("img")!.cloneNode();
    const {
        dataset: { about, tech, webApp, demoVideo, download, sourceCode },
    } = tile;

    const projectDialog: HTMLDialogElement = document.getElementById("project-dialog") as HTMLDialogElement;

    const imgBox = projectDialog.querySelector(".img-box")!;
    imgBox.innerHTML = "";
    imgBox.appendChild(img);

    projectDialog.querySelector(".about")!.textContent = about as string;

    const techContainer = projectDialog.querySelector(".tech")!;
    techContainer.innerHTML = "";
    tech!.split(",").forEach((word) => {
        const div = document.createElement("div");
        div.innerText = word;
        techContainer.appendChild(div);
    });

    const links: HTMLElement = projectDialog.querySelector(".links") as HTMLElement;
    links!.innerHTML = "";
    if (webApp) createAnchor("Web App", webApp, "sparkle", links);
    if (demoVideo) createAnchor("Demo Video", demoVideo, "youtube", links);
    if (download) createAnchor("Download", download, "download", links);
    if (sourceCode) createAnchor("Source Code", sourceCode, "github", links);

    projectDialog.showModal();
}

export function closeModal(event: Event) {
    const closeBtn: HTMLElement = event.target as HTMLElement;
    const dialog: HTMLDialogElement = closeBtn.parentElement as HTMLDialogElement;
    dialog.close();
}
