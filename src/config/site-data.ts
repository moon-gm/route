import { ReactNode } from 'react'

// ---------- Types ---------- //
export type $Next = {
    $meta: Meta,
    $category: Record<string, Category<unknown>>,
    $state: Record<string, string | number | ReactNode>,
    $methods: Record<string, Function>,
    $judgments: Record<string, boolean>
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

export type Category<T> = {
    id: string,
    name: string,
    URL: string,
    state: string,
    dataSet?: T[] | Record<string, T>
}

export type IdName = {
	id: string,
	name: string
}

// ---------- Values ---------- //
export const siteTitle = 'Portfolio Show'
export const siteURL = 'https://route-eight.vercel.app/'
export const siteDescription = '各種フレームワークを用いて学習しながら作成'
export const siteImage = {
    src: '/logo/top-logo.png',
    alt: 'Top Logo'
}

export default {
    siteTitle, siteURL, siteDescription, siteImage
}