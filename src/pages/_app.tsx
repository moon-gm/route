import '../styles/globals.scss'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { CategoryArray, Category, Framework, Website, Order } from '../types/index'
import Header from '../components/header'
import Swipers from '../components/swipers'
import GLOBAL from '../config/global.json' // Global Data
import { HOME, PROFILE, PRODUCTION } from '../config/index.json' // Category Data

/*** Category Data設定 ***/
const categoryArray: CategoryArray = [ PROFILE, PRODUCTION ]
categoryArray.map((cat: Category) => {
	cat.STATE = cat.ID
	cat.URL = '/' + cat.ID
})

const order: Order = { framework: {}, website: {} }
let wsState: number = 0
PRODUCTION.DATASET.map((fw: Framework, fwIdx: number) => {
	// STATEとURLはID等から動的に設定
	fw.STATE = fw.ID
	order.framework[fw.ID] = fwIdx
	fw.PAGES.map((ws: Website, wsIdx: number) => {
		ws.STATE = wsState
		ws.URL = '/' + PRODUCTION.ID + '/' + fw.ID + '/' + ws.ID
		order.website[ws.ID] = wsIdx
		wsState++
	})
})

const Layout = ({ children }): JSX.Element => {

	//-------------------------------- 初期定義 --------------------------------//

	/*** State設定 ***/
	const [category, setCategory] = useState(PROFILE.STATE) // 選択しているカテゴリ設定
	const [selWS, setSelWS] = useState(Number()) // 選択しているサイト設定
	const [swipeElement, setSwipeElement] = useState() // スワイパーエレメントの設定
	const [ua, setUA] = useState(String()) // ユーザーエージェント設定

	/*** ユーザーエージェント条件設定 ***/
	const isiPhone: boolean = ua && (ua.indexOf('iphone') > -1) // iPhone判定
	const isiPad: boolean = ua && (ua.indexOf('ipad') > -1) // iPad判定
	const isAndroid: boolean = ua && (ua.indexOf('android') > -1) && (ua.indexOf('mobile') > -1) // Android判定
	const isAndroidTablet: boolean = ua && (ua.indexOf('android') > -1) && (ua.indexOf('mobile') == -1) // Android Tablet判定

	/*** 共通Propsの設定 ***/
	const PROP = {	
		siteTitle: GLOBAL.SITE_TITLE,
		category: { HOME, PROFILE, PRODUCTION }, // Category全情報
		order, // コンテンツの順序
		state: { category, selWS, swipeElement }, // state保存値
		methods: {
			setSwipeElement,
			scrollToTop(): void { window.scrollTo(0, 0) },
			showSideAreaSP(condition: boolean): void {
				const spWidth: string = condition ? '0' : '768px'
				document.getElementById('contents-aside').style.left = spWidth
			},
			linkTo(url: string, caName: string, wsIdx: number): void {
				// Stateをセットしてページを切替
				if (caName) setCategory(caName)
				if (wsIdx || wsIdx === 0) setSelWS(wsIdx)
				PROP.router.push(url)
		
				if (PROP.judgments.isSP && PROP.judgments.isProduction) {
					PROP.methods.showSideAreaSP(false)
				}
			}
		},
		judgments: {
			isProduction: (category === PRODUCTION.STATE),　// Productionページ判定
			isPC: (!isiPhone && !isiPad && !isAndroid && !isAndroidTablet), //PC判定
			isSP: (isiPhone || isiPad || isAndroid || isAndroidTablet), //SP判定
		},
		router: useRouter()
	}

	/*** 子要素を再生成してPropsを渡す設定 ***/
	const NEW_CHILDREN: React.FunctionComponentElement<typeof PROP> = React.cloneElement(children, PROP)


	//-------------------------------- レンダリング設定 --------------------------------//

	// レンダー後処理
	useEffect(() => {

		// URLに合わせて表示切替
		const pathName: string = window.location.pathname
		const firstPath: string = '/' + pathName.split('/')[1]

		// カテゴリー切替
		categoryArray.map((cat: Category) => firstPath === cat.URL && setCategory(cat.STATE))

		// ウェブサイト切替
		PROP.category.PRODUCTION.DATASET.map((fw: Framework) => {
			fw.PAGES.map((ws: Website) => pathName === ws.URL && setSelWS(ws.STATE))
		})

		// ユーザーエージェント設定
		setUA(navigator.userAgent.toLowerCase())

	}, [])

	// 通常レンダー
	return (
		<div id="top" className="container">

			{/*** ヘッダーエリア -- start -- ***/}
				<Header prop={PROP}/>
			{/*** ヘッダーエリア -- end -- ***/}

			{/*** メインビジュアルエリア -- start -- ***/}
				{PROP.judgments.isProduction && (
					<div className="main-visual-area">
						<Swipers.MainSwiper prop={PROP}/>
					</div>
				)}
			{/*** メインビジュアルエリア -- end -- ***/}

			{/*** コンテンツエリア -- start -- ***/}
				<div className="contents-area flex-space-around flex-remove-sp">

					{/** サイドエリア -- start -- **/}
						{PROP.judgments.isProduction && (
							<aside
								id="contents-aside"
								className="contents-aside"
							>
								<div className="contents-aside-wrap">
									<Swipers.ThumbSwiper prop={PROP}/>
								</div>
							</aside>
						)}
					{/** サイドエリア -- end -- **/}

					{/** メインエリア -- start -- **/}
						<main className={`contents-main ${!PROP.judgments.isProduction && "contents-main-no-sidearea"}`}>
							{NEW_CHILDREN}
						</main>
					{/** メインエリア -- end -- **/}

				</div>
			{/*** コンテンツエリア -- end -- ***/}

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
