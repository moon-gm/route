import { ReactNode } from 'react'
import Head from 'next/head'
import Loading from './loading'
import styles from '../styles/modules/page.module.scss'
import { SITE_TITLE } from '../config/meta-data.json'

interface Page {
	state: {
		[key: string]: any
	},
	categoryState: string,
	pageName: string,
	children: ReactNode
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

interface Iframe {
	src: string,
	classNames?: string[]
}

const joinClassName = (
	className: string,
	classNames: string[]
): string => {
	if (classNames.length !== 0) {
		classNames.unshift(className)
		className = classNames.join(' ')
	}
	return className
}

export const Page = ({ state, categoryState, pageName, children }: Page): JSX.Element => {
	return state.categoryName !== categoryState ? <Loading/> : (
		<>
			<Head>
				<title>{pageName} | {SITE_TITLE}</title>
			</Head>

			<div className={styles.contentsBox}>
				{children}
			</div>
		</>
	)
}

export const BaseSection = ({ children }: Children): JSX.Element => {
	return (
		<section className={styles.baseSection}>
			{children}
		</section>
	)
}

export const ContentSection = ({ children }: Children): JSX.Element => {
	return (
		<section className={styles.contentSection}>
			{children}
		</section>
	)
}

export const ContentSectionTitle = ({ children }: Children): JSX.Element => {
	return (
		<div className={styles.contentSectionTitle}>
			{children}
		</div>
	)
}

export const H1 = ({ children, classNames = [] }: ClassNames): JSX.Element => {
	const className: string = styles.h1
	return (
		<h1 className={joinClassName(className, classNames)}>
			{children}
		</h1>
	)
}

export const H2 = ({ children, classNames = [] }: ClassNames): JSX.Element => {
	const className: string = styles.h2
	return (
		<h2 className={joinClassName(className, classNames)}>
			{children}
		</h2>
	)
}

export const H3 = ({ children, classNames = [] }: ClassNames): JSX.Element => {
	const className: string = styles.h3
	return (
		<h3 className={joinClassName(className, classNames)}>
			{children}
		</h3>
	)
}

export const P = ({ children, classNames = [], style = {} }: ClassNamesStyle): JSX.Element => {
	const className: string = styles.p
	return (
		<p
			className={joinClassName(className, classNames)}
			style={style}
		>
			{children}
		</p>
	)
}

export const Text = ({ children, classNames = [], right = false }: Text): JSX.Element => {
	const className: string = right ? styles.rightSpace : styles.text
	return (
		<span className={joinClassName(className, classNames)}>
			{children}
		</span>
	)
}

export const LayoutBox = ({ children }: Children): JSX.Element => {
	return (
		<div className={styles.layoutBox}>
			{children}
		</div>
	)
}

export const ListBox = ({ children, classNames = [] }: ClassNames): JSX.Element => {
	const className: string = styles.listBox
	return (
		<ul className={joinClassName(className, classNames)}>
			{children}
		</ul>
	)
}

export const List = ({ children, classNames = [], style = {} }: ClassNamesStyle): JSX.Element => {
	const className: string = styles.li
	return (
		<li
			className={joinClassName(className, classNames)}
			style={style}
		>
			{children}
		</li>
	)
}

export const ListText = ({ children, classNames = [] }: ClassNames): JSX.Element => {
	const className: string = styles.liText
	return (
		<span className={joinClassName(className, classNames)}>
			{children}
		</span>
	)
}

export const ListNote = ({ children, classNames = [] }: ClassNames): JSX.Element => {
	const className: string = styles.liNote
	return (
		<p className={joinClassName(className, classNames)}>
			{children}
		</p>
	)
}

export const Iframe = ({ src, classNames = [] }: Iframe): JSX.Element => {
	const className: string = styles.iframe
	return (
		<iframe
			src={src}
			className={joinClassName(className, classNames)}
		/>
	)
}

export default {
	Page, BaseSection, ContentSection, ContentSectionTitle,
	H1, H2, H3, P, Text, LayoutBox,
	ListBox, List, ListText, ListNote, Iframe
}
