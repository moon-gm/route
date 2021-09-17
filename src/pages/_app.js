// Style
import '../styles/globals.scss'

// React Hooks
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

// Component
import Header from '../components/header'
import Swipers from '../components/swipers'

// Global Data
import GLOBAL from '../data/global.json'

// Page Data
import { PROFILE, PRODUCTION } from '../data/index.json'
let wsState = 0
PRODUCTION.DATASET.map((fw, fwIdx) => {
	fw.Page.map((ws, wsIdx) => {
		PRODUCTION.DATASET[fwIdx].Page[wsIdx].State = wsState
		wsState++
	})
})

// Order Data
const order = { framework: {}, website: {} }
PRODUCTION.DATASET.map((fw, fwIdx) => {
	order.framework[fw.ID] = fwIdx
	fw.Page.map((ws, wsIdx) => order.website[ws.ID] = wsIdx)
})

// State Data
const state = { category: {}, selWS: {} }
PRODUCTION.DATASET.map(fw => {
	fw.Page.map(ws => state.selWS[ws.ID] = ws.State)
})
state.category[PROFILE.ID] = PROFILE.ID
state.category[PRODUCTION.ID] = PRODUCTION.ID

const Layout = ({children}) => {

	//-------------------------------- 初期定義 --------------------------------//

	/*** State設定 ***/
	const [category, setCategory] = useState(state.category.profile) // 表示ページのFWの選択設定
	const [selWS, setSelWS] = useState() // 表示ページの画像とリストの選択設定
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
		dataset: PRODUCTION.DATASET, // Productionページ情報
		category: { PROFILE, PRODUCTION }, // Category情報
		order: order, // コンテンツの順序
		state: {
			store: { category, selWS, swipeElement }, // state : 保存値
			set: state, // state : 設定値
		},
		methods: {
			setSwipeElement,
			scrollToTop() { window.scrollTo(0, 0) },
			showSideArea(condition) {
				// SP時サイドエリアの表示処理
				const spWidth = condition ? '0' : '768px'
				document.getElementById('contents-aside').style.left = spWidth
			},
			linkTo(url, caName, wsIdx){
				// Stateをセットしてページを切替
				if (caName) setCategory(caName)
				if (wsIdx || wsIdx === 0) setSelWS(wsIdx)
				PROP.router.push(url)
		
				// SP時のみボタン押下時にサイドエリアを非表示
				if (PROP.if.isSP && !PROP.if.isProfile) {
					PROP.methods.showSideArea(false)
				}
			}
		},
		if: {
			isProfile: (category === state.category.profile),　// Profileページの表示判定
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
		pathName === '/' ? setCategory(PROP.state.set.category.profile) : setCategory() // カテゴリー切替
		PROP.dataset.map(fw => { fw.Page.map(ws => pathName === ws.URL && setSelWS(ws.State) ) }) // ウェブサイト切替

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
				{!PROP.if.isProfile && (
					<div className="main-visual-area">
						<Swipers.MainSwiper prop={PROP}/>
					</div>
				)}
			{/*** メインビジュアルエリア -- end -- ***/}

			{/*** コンテンツエリア -- start -- ***/}
				<div className="contents-area flex-space-around flex-remove-sp">

					{/** サイドエリア -- start -- **/}
						{!PROP.if.isProfile && (
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
						<main className={`contents-main ${PROP.if.isProfile && "contents-main-no-sidearea"}`}>
							{NEW_CHILDREN}
						</main>
					{/** メインエリア -- end -- **/}

				</div>
			{/*** コンテンツエリア -- end -- ***/}

		</div>
	)
}

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp
