import '../styles/swiper@6.3.3/swiper-bundle.min.css'
import '../styles/globals.scss'
import { FunctionComponentElement, useState, useEffect, cloneElement, createContext, ReactNode } from 'react'
import { useRouter } from 'next/router'
import { $Next, Category, ProductionOrder, Framework, Website } from '../types/index'
import Header from '../components/header'
import Swipers from '../components/swipers'
import metaData from '../config/meta-data.json'
import categoryData, { profile, production } from '../config/category-data.json'

// ---------- Create Context ---------- //
export const CategoryName = createContext(profile.state)

// ---------- Create Production Data ---------- //
const productionOrder: ProductionOrder = {
	framework: {},
	website: {}
}
let wsOrderIdx = 0
for (const [fwIdx, fw] of production.dataSet.entries()) {
	// id => state & URL
	fw.state = fw.id
	productionOrder.framework[fw.id] = fwIdx
	for (const [wsIdx, ws] of fw.pages.entries()) {
		ws.state = wsOrderIdx
		ws.URL = '/' + production.id + '/' + fw.id + '/' + ws.id
		productionOrder.website[ws.id] = wsIdx
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
	const [categoryName, setCategoryName] = useState<string>(profile.state)
	const [websiteIndex, setWebsiteIndex] = useState<number>(0)
	const [swipeElement, setSwipeElement] = useState<ReactNode>()
	const [mediaType, setMediaType] = useState<string>(media.PC)

	/*** Method ***/
	const setMediaScreenType = (): void => {
		const screenWidth : number = window.innerWidth
		if (screenWidth <= spMaxWidth) setMediaType(media.SP)
		if (screenWidth > spMaxWidth) setMediaType(media.PC)
	}

	/*** Router ***/
	const router = useRouter()

	/*** Common App ***/
	const $next: $Next = {
		$meta: metaData,
		$category: categoryData,
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
				router.push(url)
		
				if (isSP && isProduction) showThumbSwiperOnSP(false)
			},
			findWebsiteData: (
				comparedKey: string,
				comparedItem: string
			): Website | false => {
				const findPath = (ws: Website): boolean => comparedKey === ws[comparedItem]
				const fw: Framework | undefined = production.dataSet.find(fw => fw.pages.some(findPath))
				return fw !== undefined && fw.pages.find(findPath)
			}
		},
		$judgments: {
			isProduction: categoryName === production.state,
			isSP: mediaType === media.SP,
			isPC: mediaType === media.PC,
		},
	}

	/*** Use $next ***/
	const { $methods, $judgments } = $next
	const { showThumbSwiperOnSP, findWebsiteData } = $methods
	const { isSP, isProduction } = $judgments

	/*** Prop of Parent => Children ***/
	const newChildren: FunctionComponentElement<$Next> = cloneElement(children, $next)

	/*** Layout ClassName ***/
	const layout: Record<string, string> = {
		container: 'container',
		mainSwiper: 'main-swiper-area',
		contents: 'contents-area flex-space-around flex-remove-sp',
		thumbSwiper: 'thumb-swiper-area',
		main: `main-area ${!isProduction && "main-area-without-thumb-swiper"}`
	}

	/*** Mounted Only First ***/
	useEffect(() => {

		const pathName: string = window.location.pathname
		const categoryPath: string = '/' + pathName.split('/')[1]

		const categories: Category[] = []
		Object.entries(categoryData).map(category => {
			categories.push(category[1])
		})
		const cat: Category | undefined = categories.find(cat => categoryPath === cat.URL)
		cat !== undefined && setCategoryName(cat.state)

		const ws: Website | false = findWebsiteData(pathName, 'URL')
		ws && setWebsiteIndex(ws.state)

		setMediaScreenType()
		window.onresize = setMediaScreenType

	}, [])

	/*** Render ***/
	return (
		<div className={layout.container}>

			<Header app={$next}/>

			{isProduction && (
				<div className={layout.mainSwiper}>
					<Swipers.MainSwiper app={$next}/>
				</div>
			)}

			<div className={layout.contents}>

				{isProduction && (
					<aside
						id={layout.thumbSwiper}
						className={layout.thumbSwiper}
					>
						<Swipers.ThumbSwiper app={$next}/>
					</aside>
				)}

				<main className={layout.main}>
					<CategoryName.Provider value={categoryName}>
						{newChildren}
					</CategoryName.Provider>
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
