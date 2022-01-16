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

// ---------- Create Element ---------- //
const Layout = ({ children }): JSX.Element => {

	/*** State ***/
	const [categoryName, setCategoryName] = useState(PROFILE.STATE)
	const [websiteIndex, setWebsiteIndex] = useState(Number())
	const [swipeElement, setSwipeElement] = useState()
	const [userAgent, setUserAgent] = useState(String())

	/*** User Agent ***/
	const is = (device: string): boolean => {
		if (userAgent) {
			if (['android', 'androidTablet'].includes(device)) {
				const mobileIdx = userAgent.indexOf('mobile')
				return userAgent.indexOf('android')> -1 && (
					device === 'androidTablet' ? mobileIdx === -1 : mobileIdx > -1
				)
			} else {
				return userAgent.indexOf(device) > -1
			}
		}
		return false
	}

	/*** Common App ***/
	const $next = {
		$siteData: META_DATA,
		$category: CATEGORY,
		$productionOrder: productionOrder,
		$state: { categoryName, websiteIndex, swipeElement },
		$methods: {
			setSwipeElement,
			scrollToTop(): void {
				window.scrollTo(0, 0)
			},
			showSideArea(isPC: boolean): void {
				const spWidth: string = isPC ? '0' : '768px'
				document.getElementById('contents-aside').style.left = spWidth
			},
			linkTo(
				url: string,
				caName: string,
				wsIdx?: number
			): void {
				if (caName) setCategoryName(caName)
				if (wsIdx || wsIdx === 0) setWebsiteIndex(wsIdx)
				$next.$router.push(url)
		
				if ($next.$judgments.isSP && $next.$judgments.isProduction) {
					$next.$methods.showSideArea(false)
				}
			}
		},
		$judgments: {
			isProduction: (categoryName === PRODUCTION.STATE),
			isSP: (is('iphone') || is('ipad') || is('android') || is('androidTablet')),
			isPC: (!is('iphone') && !is('ipad') && !is('android') && !is('androidTablet')),
		},
		$router: useRouter()
	}

	/*** Prop of Parent => Children ***/
	const $children: FunctionComponentElement<typeof $next> = cloneElement(children, $next)

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

		// set user agent
		setUserAgent(navigator.userAgent.toLowerCase())

	}, [])

	/*** Render ***/
	return (
		<div id="top" className="container">

			{/*** Header Area -- start -- ***/}
				<Header app={$next}/>
			{/*** Header Area -- end -- ***/}

			{/*** Main Swipe Area -- start -- ***/}
				{$next.$judgments.isProduction && (
					<div className="main-visual-area">
						<Swipers.MainSwiper app={$next}/>
					</div>
				)}
			{/*** Main Swipe Area -- end -- ***/}

			{/*** Contents Area -- start -- ***/}
				<div className="contents-area flex-space-around flex-remove-sp">

					{/** Thumb Swipe Area -- start -- **/}
						{$next.$judgments.isProduction && (
							<aside
								id="contents-aside"
								className="contents-aside"
							>
								<div className="contents-aside-wrap">
									<Swipers.ThumbSwiper app={$next}/>
								</div>
							</aside>
						)}
					{/** Thumb Swipe Area -- end -- **/}

					{/** Main Area -- start -- **/}
						<main
							className={`
								contents-main
								${!$next.$judgments.isProduction && "contents-main-no-sidearea"}
							`}
						>
							{$children}
						</main>
					{/** Main Area -- end -- **/}

				</div>
			{/*** Contents Area -- end -- ***/}

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
