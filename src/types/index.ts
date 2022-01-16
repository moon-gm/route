export type TopList = {
    name: string,
    className: string,
    method: () => void,
    children: {
        image: {
            src: string,
            alt: string,
            className?: string
        },
        etc?: JSX.Element
    },
    display?: boolean
}

export type HeaderTabList = {
    name: string,
    url: string,
    state?: string
}

export type ProductionOrder = {
    framework: {
        [key: string]: number
    },
    website: {
        [key: string]: number
    }
}

export type Category = {
    ID: string,
    NAME: string,
    URL: string,
    STATE: string,
    DATASET?: any[]
}

export type Framework = {
    ID: string,
    NAME: string,
    STATE: string,
    IMG: string,
    PAGES: Website[]
}

export type Website = {
    ID: string,
    NAME: string,
    URL: string,
    STATE: number,
    IMG: string,
    CREATE_DATE: string,
    UPDATE_DATE: string,
    SUMMARY: string,
    LINK: {
        SITE: string,
        SOURCE: string,
    },
    DESCRIPTION: string,
    HOW_TO_MAKE: string,
    SKILL: Skill[]
}

export type Skill = {
    title: string,
    image: string,
    contents: string[]
}

export type ProductPageData = {
    framework: string,
    title: string,
    logo: string,
    summary: string,
    baseData: {
        id: string,
        title: string,
        content: string,
        url?: string
    }[],
    sectionData: {
        id: string,
        name: string,
        modal: string,
        content: string | Skill[]
    }[]
}

export type ProfilePageData = {
    sectionData: {
        id: string,
        name: string,
        modal?: string,
        contents: {
            id: string,
            title?: string,
            lists: {
                type?: string,
                text: string,
                note?: string[]
            }[]
        }[]
    }[]
}
