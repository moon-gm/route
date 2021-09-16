// Style
import '../styles/globals.scss'

// React Hooks
import { useState, useEffect } from 'react'

// Component
import Header from '../components/header'
import Swipers from '../components/swipers'

// Page Data
import { profile, production } from '../data/page.json'
let wsState = 0
production.map((fw, fwIdx) => {
	fw.Page.map((ws, wsIdx) => {
		production[fwIdx].Page[wsIdx].State = wsState
		wsState++
	})
})

// Order Data
const order = { framework: {}, website: {} }
production.map((fw, fwIdx) => {
	order.framework[fw.ID] = fwIdx
	fw.Page.map((ws, wsIdx) => order.website[ws.ID] = wsIdx)
})

// State Data
const state = { category: {}, selWS: {} }
production.map(fw => {
	state.category[fw.ID] = fw.State
	fw.Page.map(ws => state.selWS[ws.ID] = ws.State)
})
profile.map(pf => state.category[pf.ID] = pf.State)

const Layout = ({children}) => {

	//-------------------------------- 初期定義 --------------------------------//

	/*** State設定 ***/
	const [category, setCategory] = useState(state.category.Profile) // 表示ページのFWの選択設定
	const [selWS, setSelWS] = useState() // 表示ページの画像とリストの選択設定
	const [swipEL, setSwipEL] = useState() // スワイパー(Element)の設定
	const [ua, setUA] = useState() // ユーザーエージェント設定

	/*** ユーザーエージェント条件設定 ***/
	const isiPhone = ua && (ua.indexOf('iphone') > -1) // iPhone判定
	const isiPad = ua && (ua.indexOf('ipad') > -1) // iPad判定
	const isAndroid = ua && (ua.indexOf('android') > -1) && (ua.indexOf('mobile') > -1) // Android判定
	const isAndroidTablet = ua && (ua.indexOf('android') > -1) && (ua.indexOf('mobile') == -1) // Android Tablet判定

	/*** 共通Propsの設定 ***/
	const PROP = {
		// 全Productionページ情報
		'info': production,

		// フレームワーク番号 => page.jsonで設定の順番
		'fw': order.framework,

		// ページ番号 => page.jsonで設定の順番
		'ws': order.website,

		// 必要なstate情報
		'st': {
			'category': category, 'selWS': selWS, 'swipEL': swipEL, "all": state
		},

		// 全Function
		'f': {
			'changeFW': changeFW,　// ページ変更で使用
			'changeSwiper': setSwipEL, // スワイパーで使用
		},

		// 条件
		'if': {
			'isProfile': (category === state.category.Profile),　// プロフィールページの表示条件
			'isPC': (!isiPhone && !isiPad && !isAndroid && !isAndroidTablet), //PC判定
			'isSP': (isiPhone || isiPad || isAndroid || isAndroidTablet), //SP判定
		},
	}

	/*** 子要素を再生成してPropsを渡す設定 ***/
	const NEW_CHILDREN = React.cloneElement(children, PROP)


	//-------------------------------- メソッド設定 --------------------------------//

	/*** ■ Productionの各サイト一覧押下時の処理 ***/
	function changeFW(fwIdx, wsIdx) {

		// Stateをセットしてページを切替
		if (fwIdx) setCategory(fwIdx)
		if (wsIdx || wsIdx === 0) setSelWS(wsIdx)

		// SP時のみボタン押下時にサイドエリアを非表示
		if (PROP.if.isSP && !PROP.if.isProfile) {
			document.getElementById('contents-aside').style.left = "768px"
		}
	}


	//-------------------------------- レンダリング設定 --------------------------------//

	// レンダー後処理
	useEffect(()=>{

		// 画像・リストの表示条件設定
		const pathName = window.location.pathname
		const pathSplit = pathName.split("/")

		// カテゴリー選択切替
		pathName === '/' ? setCategory(state.category.Profile) : setCategory()

		PROP.info.map(fw => {
			
			// URLに合わせてStateを変更
			if ("/" + pathSplit[1] === fw.URL) {
				
				// ページ選択切替
				fw.Page.map(ws => (pathName === ws.URL) && setSelWS(ws.State))

			}

		})

		// ユーザーエージェント設定
		const userAgent = navigator.userAgent.toLowerCase()
		setUA(userAgent)

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
