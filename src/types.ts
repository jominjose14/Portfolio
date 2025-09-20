export interface Project {
    name: string,
    image: string,
    about: string,
    tech: string,
    webApp?: string,
    demoVideo?: string,
    sourceCode?: string,
    download?: string,
}

export interface ProjectDataAttributes {
    dataName: string,
    dataImage: string,
    dataAbout: string,
    dataTech: string,
    dataWebApp?: string,
    dataDemoVideo?: string,
    dataSourceCode?: string,
    dataDownload?: string,
}

export type ProjectTile = HTMLElement & {
    dataset: DOMStringMap & ProjectDataAttributes
}