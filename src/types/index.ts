import { NextRouter } from 'next/router'
import { ReactNode } from 'react'

export type $Next = {
    $meta: Meta,
    $category: Record<string, Category>,
    $productionOrder: ProductionOrder,
    $state: Record<string, string | number | ReactNode>,
    $methods: Record<string, Function>,
    $judgments: Record<string, boolean>,
    $router: NextRouter
}

export type HomeList = {
    name: string,
    className: string,
    method: () => void,
    children: {
        image: {
            src: string,
            alt: string
        },
        etc?: JSX.Element
    },
    display?: boolean
}

export type TabList = {
    name: string,
    url: string,
    state?: string
}

export type Meta = {
    SITE_TITLE: string,
    SITE_URL: string,
    SITE_DESCRIPTION: string,
    SITE_IMAGE: {
        SRC: string,
        ALT: string
    }
}

export type Category = {
    ID: string,
    NAME: string,
    URL: string,
    STATE: string,
    DATASET?: any[]
}

export type ProductionOrder = {
    framework: Record<string, number>,
    website: Record<string, number>
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

export type ProductPage = {
    framework: string,
    title: string,
    image: string,
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

export type ProfilePage = {
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
