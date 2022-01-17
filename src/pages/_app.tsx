import '../styles/swiper@6.3.3/swiper-bundle.min.css'
import '../styles/globals.scss'
import { FunctionComponentElement, useState, useEffect, cloneElement } from 'react'
import { useRouter } from 'next/router'
import { Category, ProductionOrder, Framework, Website } from '../types/index'
import Header from '../components/header'
import Swipers from '../components/swipers'
import META_DATA from '../config/meta-data.json'
import CATEGORY, { HOME, PROFILE, PRODUCTION } from '../config/category.json'

// ---------- Create Production Data ---------- //
const productionOrder: ProductionOrder = { framework: {}, website: {} }
let wsOrderIdx = 0
for (const [fwIdx, fw] of PRODUCTION.DATASET.entries()) {
	// ID => STATE & URL
	fw.STATE = fw.ID
	productionOrder.framework[fw.ID] = fwIdx
	for (const [wsIdx, ws] of fw.PAGES.entries()) {
		ws.STATE = wsOrderIdx
		ws.URL = '/' + PRODUCTION.ID + '/' + fw.ID + '/' + ws.ID
		productionOrder.website[ws.ID] = wsIdx
		wsOrderIdx++
	}
}

// ---------- Media Data ---------- //
const spMaxWidth = 768
const media: Record<string, string> = {
	PC: 'PC',
	SP: 'SP'
}

// ---------- Create Element ---------- //
const Layout = ({ children }): JSX.Element => {

	/*** State ***/
	const [categoryName, setCategoryName] = useState(PROFILE.STATE)
	const [websiteIndex, setWebsiteIndex] = useState(0)
	const [swipeElement, setSwipeElement] = useState()
	const [mediaType, setMediaType] = useState(media.PC)

	/*** Set Media Type ***/
	const setMediaScreenType = (): void => {
		const screenWidth : number = window.innerWidth
		if (screenWidth <= spMaxWidth) setMediaType(media.SP)
		if (screenWidth > spMaxWidth) setMediaType(media.PC)
	}

	/*** Common App ***/
	const $next = {
		$siteData: META_DATA,
		$category: CATEGORY,
		$productionOrder: productionOrder,
		$state: { categoryName, websiteIndex, swipeElement },
		$methods: {
			setSwipeElement,
			scrollToTop: (): void => {
				window.scrollTo(0, 0)
			},
			showThumbSwiperOnSP: (isOpen: boolean): void => {
				const thumbSwiperStyle = document.getElementById(layout.thumbSwiper).style
				thumbSwiperStyle.left = isOpen ? '0' : String(spMaxWidth) + 'px'
			},
			linkTo: (
				url: string,
				caName: string,
				wsIdx?: number
			): void => {
				if (caName) setCategoryName(caName)
				if (wsIdx || wsIdx === 0) setWebsiteIndex(wsIdx)
				$next.$router.push(url)
		
				if ($next.$judgments.isSP && $next.$judgments.isProduction) {
					$next.$methods.showThumbSwiperOnSP(false)
				}
			}
		},
		$judgments: {
			isProduction: categoryName === PRODUCTION.STATE,
			isSP: mediaType === media.SP,
			isPC: mediaType === media.PC,
		},
		$router: useRouter()
	}

	/*** Prop of Parent => Children ***/
	const $children: FunctionComponentElement<typeof $next> = cloneElement(children, $next)

	/*** Layout ClassName ***/
	const layout: Record<string, string> = {
		container: 'container',
		mainSwiper: 'main-swiper-area',
		contents: 'contents-area flex-space-around flex-remove-sp',
		thumbSwiper: 'thumb-swiper-area',
		main: `main-area ${!$next.$judgments.isProduction && "main-area-without-thumb-swiper"}`
	}

	/*** Mounted Only First ***/
	useEffect(() => {

		// get path name
		const pathName: string = window.location.pathname
		const categoryPath: string = '/' + pathName.split('/')[1]

		// set categoryName from path name
		const categories: Category[] = [ HOME, PROFILE, PRODUCTION ]
		const cat: Category | undefined = categories.find(cat => categoryPath === cat.URL)
		cat !== undefined && setCategoryName(cat.STATE)

		// set websiteIndex from path name
		const findPath = (ws: Website): boolean => pathName === ws.URL
		const fw: Framework | undefined = $next.$category.PRODUCTION.DATASET.find(fw => fw.PAGES.some(findPath))
		const ws: Website | false = fw !== undefined && fw.PAGES.find(findPath)
		ws && setWebsiteIndex(ws.STATE)

		setMediaScreenType()

	}, [])

	/*** Mounted by changing mediaType***/
	useEffect(() => {
		window.onresize = setMediaScreenType
	}, [mediaType])

	/*** Render ***/
	return (
		<div className={layout.container}>

			<Header app={$next}/>

			{$next.$judgments.isProduction && (
				<div className={layout.mainSwiper}>
					<Swipers.MainSwiper app={$next}/>
				</div>
			)}

			<div className={layout.contents}>

				{$next.$judgments.isProduction && (
					<aside
						id={layout.thumbSwiper}
						className={layout.thumbSwiper}
					>
						<Swipers.ThumbSwiper app={$next}/>
					</aside>
				)}

				<main className={layout.main}>
					{$children}
				</main>

			</div>

		</div>
	)
}

const MyApp = ({ Component, pageProps }) => {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}

export default MyApp
