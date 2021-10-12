// Style
import '../styles/globals.scss'

// React Hooks
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

// Component
import Header from '../components/header'
import Swipers from '../components/swipers'

// Global Data
import GLOBAL from '../config/global.json'

// Category Data
import { HOME, PROFILE, PRODUCTION } from '../config/index.json'

/*** Category Data設定 ***/
const categoryArray = [ PROFILE, PRODUCTION ]
categoryArray.map(cat => {
	cat.STATE = cat.ID
	cat.URL = '/' + cat.ID
})
const order = { framework: {}, website: {} }
let wsState = 0
PRODUCTION.DATASET.map((fw, fwIdx) => {
	// STATEとURLはID等から動的に設定
	fw.STATE = fw.ID
	order.framework[fw.ID] = fwIdx
	fw.PAGES.map((ws, wsIdx) => {
		ws.STATE = wsState
		ws.URL = '/' + PRODUCTION.ID + '/' + fw.ID + '/' + ws.ID
		order.website[ws.ID] = wsIdx
		wsState++
	})
})

const Layout = ({ children }) => {

	//-------------------------------- 初期定義 --------------------------------//

	/*** State設定 ***/
	const [category, setCategory] = useState(PROFILE.STATE) // 選択しているカテゴリ設定
	const [selWS, setSelWS] = useState() // 選択しているサイト設定
	const [swipeElement, setSwipeElement] = useState() // スワイパーエレメントの設定
	const [ua, setUA] = useState() // ユーザーエージェント設定

	/*** ユーザーエージェント条件設定 ***/
	const isiPhone = ua && (ua.indexOf('iphone') > -1) // iPhone判定
	const isiPad = ua && (ua.indexOf('ipad') > -1) // iPad判定
	const isAndroid = ua && (ua.indexOf('android') > -1) && (ua.indexOf('mobile') > -1) // Android判定
	const isAndroidTablet = ua && (ua.indexOf('android') > -1) && (ua.indexOf('mobile') == -1) // Android Tablet判定

	/*** 共通Propsの設定 ***/
	const PROP = {	
		siteTitle: GLOBAL.SITE_TITLE,
		category: { HOME, PROFILE, PRODUCTION }, // Category全情報
		order, // コンテンツの順序
		state: { category, selWS, swipeElement }, // state保存値
		methods: {
			setSwipeElement,
			scrollToTop() { window.scrollTo(0, 0) },
			showSideAreaSP(condition) {
				const spWidth = condition ? '0' : '768px'
				document.getElementById('contents-aside').style.left = spWidth
			},
			linkTo(url, caName, wsIdx){
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
	const NEW_CHILDREN = React.cloneElement(children, PROP)


	//-------------------------------- レンダリング設定 --------------------------------//

	// レンダー後処理
	useEffect(()=>{

		// URLに合わせて表示切替
		const pathName = window.location.pathname
		const firstPath = '/' + pathName.split('/')[1]
		// カテゴリー切替
		categoryArray.map(cat => firstPath === cat.URL && setCategory(cat.STATE) )
		// ウェブサイト切替
		PROP.category.PRODUCTION.DATASET.map(fw => { fw.PAGES.map(ws => pathName === ws.URL && setSelWS(ws.STATE) ) })

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
