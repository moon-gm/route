import { PROFILE, PRODUCTION } from '../config/index.json'

export type Order = {
    framework: {},
    website: {}
}

export type CategoryArray = [
    typeof PROFILE,
    typeof PRODUCTION
]

export type Category = {
    ID: string,
    NAME: string,
    URL: string,
    STATE: string,
    DATASET: any[]
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
    SKILL: Array<{
        title: string,
        image: string,
        contents: string[]
    }>
}

export type ProductPageData = {
    head: string,
    title: string,
    logo: string,
    createDate: string,
    upDate: string,
    summary: string,
    link: {
        site: string,
        source: string,
    },	
    description: string,			
    howToMake: string,
    skill: Array<{
        title: string,
        image: string,
        contents: string[]
    }>
}

export type ProductModalData = {
    description: {
        title: string,
        content: string,
    },
    howToMake: {
        title: string,
        content: string,
    },
    skill: {
        title: string,
        content: string,
    },
    iframe: {
        title: string,
        content: string,
    },
}
