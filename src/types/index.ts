import { ReactNode } from 'react'

export type $Next = {
    $meta: Meta,
    $category: Record<string, Category>,
    $productionOrder: ProductionOrder,
    $state: Record<string, string | number | ReactNode>,
    $methods: Record<string, Function>,
    $judgments: Record<string, boolean>
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
    siteTitle: string,
    siteURL: string,
    siteDescription: string,
    siteImage: {
        src: string,
        alt: string
    }
}

export type Category = {
    id: string,
    name: string,
    URL: string,
    state: string,
    dataSet?: any[]
}

export type ProductionOrder = {
    framework: Record<string, number>,
    website: Record<string, number>
}

export type Framework = {
    id: string,
    name: string,
    state: string,
    imageSrc: string,
    pages: Website[]
}

export type Website = {
    id: string,
    name: string,
    URL: string,
    state: number,
    imageSrc: string,
    createDate: string,
    updateDate: string,
    summary: string,
    link: {
        site: string,
        source: string,
    },
    description: string,
    howToMake: string,
    skills: Skill[]
}

export type Skill = {
    title: string,
    image: string,
    contents: string[]
}

export type ProductionPage = {
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
