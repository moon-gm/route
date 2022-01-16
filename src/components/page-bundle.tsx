import { ReactNode } from 'react'
import Head from 'next/head'
import Loading from './loading'
import styles from '../styles/modules/page.module.scss'

interface Page {
	state: {
		[key: string]: any
	},
	categoryState: string,
	pageName: string,
	children: ReactNode,
	siteTitle: string
}

interface Children {
	children: ReactNode
}

interface ClassNames {
	children: ReactNode,
	classNames?: string[]
}

interface ClassNamesStyle {
	children: ReactNode,
	classNames?: string[],
	style?: {
		[key: string]: string | number
	},
}

interface Text {
	children: ReactNode,
	classNames?: string[],
	right?: boolean
}

interface Image {
	src: string,
	alt: string,
	classNames?: string[],
	type?: string,
	style?: {
		[key: string]: string | number
	}
}

interface Iframe {
	src: string,
	classNames?: string[]
}

const joinClassName = (
	className: string,
	classNames: string[]
): string => {
	classNames.unshift(className)
	return classNames.join(' ')
}

export const Page = ({ state, categoryState, pageName, children, siteTitle }: Page): JSX.Element => {
	return state.categoryName !== categoryState ? <Loading/> : (
		<>
			<Head>
				<title>{pageName} | {siteTitle}</title>
			</Head>

			<div className={styles.contentsBox}>
				{children}
			</div>
		</>
	)
}

export const BaseSection = ({ children }: Children): JSX.Element => {
	return (
		<section className={styles.titleBox}>
			{children}
		</section>
	)
}

export const ContentSection = ({ children }: Children): JSX.Element => {
	return (
		<section className={styles.sectionBox}>
			{children}
		</section>
	)
}

export const SectionTitle = ({ children }: Children): JSX.Element => {
	return (
		<div className={styles.sectionTitle}>
			{children}
		</div>
	)
}

export const H1 = ({ children, classNames = [] }: ClassNames): JSX.Element => {
	const className: string = styles.h1
	return (
		<h1 className={classNames.length !== 0 ? joinClassName(className, classNames) : className}>
			{children}
		</h1>
	)
}

export const H2 = ({ children, classNames = [] }: ClassNames): JSX.Element => {
	const className: string = styles.h2
	return (
		<h2 className={classNames.length !== 0  ? joinClassName(className, classNames) : className}>
			{children}
		</h2>
	)
}

export const H3 = ({ children, classNames = [] }: ClassNames): JSX.Element => {
	const className: string = styles.h3
	return (
		<h3 className={classNames.length !== 0  ? joinClassName(className, classNames) : className}>
			{children}
		</h3>
	)
}

export const P = ({ children, classNames = [], style = {} }: ClassNamesStyle): JSX.Element => {
	const className: string = styles.p
	return (
		<p
			className={classNames.length !== 0  ? joinClassName(className, classNames) : className}
			style={style}
		>
			{children}
		</p>
	)
}

export const Text = ({ children, classNames = [], right = false }: Text): JSX.Element => {
	const className: string = right ? styles.rightSpace : styles.text
	return (
		<span className={classNames.length !== 0 ? joinClassName(className, classNames) : className}>
			{children}
		</span>
	)
}

export const Image = ({ src, alt, classNames = [], type = '', style = {} }: Image): JSX.Element => {
	let className: string
	switch(type) {
		case 'logo': className = styles.logo; break
		case 'link': className = styles.link; break
		default: className = styles.img; break
	}
	return (
		<img
			src={src}
			alt={alt}
			className={classNames.length !== 0 ? joinClassName(className, classNames) : className}
			style={style}
		/>
	)
}

export const ImageBox = ({ children }: Children): JSX.Element => {
	return (
		<div className={styles.imgBox}>
			{children}
		</div>
	)
}

export const ListBox = ({ children, classNames = []}: ClassNames): JSX.Element => {
	const className: string = styles.listBox
	return (
		<ul className={classNames.length !== 0 ? joinClassName(className, classNames) : className}>
			{children}
		</ul>
	)
}

export const List = ({ children, classNames = []}: ClassNames): JSX.Element => {
	const className: string = styles.li
	return (
		<li className={classNames.length !== 0 ? joinClassName(className, classNames) : className}>
			{children}
		</li>
	)
}

export const ListText = ({ children, classNames = [] }: ClassNames): JSX.Element => {
	const className: string = styles.liText
	return (
		<span className={classNames.length !== 0 ? joinClassName(className, classNames) : className}>
			{children}
		</span>
	)
}

export const ListNote = ({ children, classNames = [] }: ClassNames): JSX.Element => {
	const className: string = styles.liNote
	return (
		<p className={classNames.length !== 0 ? joinClassName(className, classNames) : className}>
			{children}
		</p>
	)
}

export const Iframe = ({ src, classNames = [] }: Iframe): JSX.Element => {
	const className: string = styles.iframe
	return (
		<iframe
			src={src}
			className={classNames.length !== 0 ? joinClassName(className, classNames) : className}
		/>
	)
}

export default {
	Page, BaseSection, ContentSection, SectionTitle,
	H1, H2, H3, P, Text, Image, ImageBox,
	ListBox, List, ListText, ListNote, Iframe
}
