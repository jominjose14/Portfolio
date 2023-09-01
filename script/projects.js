import { projects } from "./projects-list.js";
import { attachEventHandler as addDarkLightToggleListener } from "./dark-light-mode.js";

window.onload = () => {
  addDarkLightToggleListener();
  loadProjects();
  addEventListeners();
};

function addEventListeners() {
  document.querySelector(".dialog-close").addEventListener("click", closeModal);
  document
    .querySelectorAll(".tile")
    .forEach((tile) => tile.addEventListener("click", openProjectModal));
}

function loadProjects() {
  const parser = new DOMParser();
  const projectsBox = document.querySelector(".box.index");

  projects.forEach((project) => {
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
          <img src="image/${image}" alt="${name}" />
          <div class="title">${name}</div>
        </div>
      `,
      "text/html"
    );
    projectsBox.appendChild(doc.body.firstChild);
  });
}

function createAnchor(type, link, svgName, parent) {
  const fragment = document
    .querySelector("#project-link-template")
    .content.cloneNode(true);
  const anchor = fragment.querySelector("a");
  anchor.href = link;
  anchor.querySelector("span").innerText = type;
  anchor.querySelector("img").alt = type;
  anchor.querySelector("img").src = `/image/${svgName}.svg`;
  parent.appendChild(anchor);
}

export function openProjectModal(event) {
  const tile = event.target.closest(".tile");
  const img = tile.querySelector("img").cloneNode();
  const {
    dataset: { about, tech, webApp, demoVideo, download, sourceCode },
  } = tile;

  const projectDialog = document.getElementById("project-dialog");

  const imgBox = projectDialog.querySelector(".img-box");
  imgBox.innerHTML = "";
  imgBox.appendChild(img);

  projectDialog.querySelector(".about").innerText = about;

  const techContainer = projectDialog.querySelector(".tech");
  techContainer.innerHTML = "";
  tech.split(",").forEach((word) => {
    const div = document.createElement("div");
    div.innerText = word;
    techContainer.appendChild(div);
  });

  const links = projectDialog.querySelector(".links");
  links.innerHTML = "";
  if (webApp) createAnchor("Web App", webApp, "sparkle", links);
  if (demoVideo) createAnchor("Demo Video", demoVideo, "youtube", links);
  if (download) createAnchor("Download", download, "download", links);
  if (sourceCode) createAnchor("Source Code", sourceCode, "github", links);

  projectDialog.showModal();
}

export function closeModal(event) {
  const closeBtn = event.target;
  closeBtn.parentElement.close();
}
