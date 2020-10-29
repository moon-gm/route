// Style
import '../styles/globals.scss'

// Component
import { useState, useEffect } from 'react'
import Header from '../components/header'
import Swipers from '../components/swipers'

// Data
import page from '../data/page'
import turn from '../data/turn.json'
import state from '../data/state.json'

const Layout = ({children}) => {

	//-------------------------------- 初期定義 --------------------------------//

	/*** State設定 ***/
	const [selFW, setSelFW] = useState(state.selFW.Profile) // 表示ページのFWの選択設定
	const [selPG, setSelPG] = useState() // 表示ページの画像とリストの選択設定
	const [imgIx, setImgIx] = useState() // MainVisualのスクロール画像のindex設定
	const [swipEL, setSwipEL] = useState() // スワイパー(Element)の設定
	const [ua, setUA] = useState() // ユーザーエージェント設定

	/*** ユーザーエージェント条件設定 ***/
	const isiPhone = ua && (ua.indexOf('iphone') > -1) // iPhone判定
	const isiPad = ua && (ua.indexOf('ipad') > -1) // iPad判定
	const isAndroid = ua && (ua.indexOf('android') > -1) && (ua.indexOf('mobile') > -1) // Android判定
	const isAndroidTablet = ua && (ua.indexOf('android') > -1) && (ua.indexOf('mobile') == -1) // Android Tablet判定

	/*** 共通Propsの設定 ***/
	const PROP = {
		// 全ページ情報
		'info': page,

		// フレームワークの順序 => page.jsで設定の順番（※この番号を変更したらpage.jsの順序も入れ替える）
		'fw': turn.FW,

		// ページの順序 => page.jsで設定の順番（※この番号を変更したらpage.jsの順序も入れ替える）
		'pg': turn.PG,

		// 必要なstate情報
		'st': {
			'selFW': selFW, 'selPG': selPG, 'imgIx': imgIx, 'swipEL': swipEL
		},

		// 全Function
		'f': {
			'changeFW': changeFW,　// ページ変更で使用
			'changeSwiper': setSwipEL, // スワイパーで使用
		},

		// 条件
		'if': {
			isProfile: (selFW === "profile"),　// プロフィールページの表示条件
			isPC: (!isiPhone && !isiPad && !isAndroid && !isAndroidTablet), //PC判定
			isSP: (isiPhone || isiPad || isAndroid || isAndroidTablet), //SP判定
		},
	}

	/*** 子要素を再生成してPropsを渡す設定 ***/
	const NEW_CHILDREN = React.cloneElement(children, PROP)


	//-------------------------------- メソッド設定 --------------------------------//

	/*** ■ Productionの各サイト一覧押下時の処理 ***/
	function changeFW(selectedFW, index) {

		// Stateをセットしてページを切替
		setSelFW(selectedFW)
		setSelPG(index)
		setImgIx(index)

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
		PROP.info.map(fw => {

			// URLに合わせてStateを変更
			if ("/" + pathSplit[1] === fw.URL) {

				// フレームワーク選択切替
				setSelFW(fw.State)
				fw.Page.map(pg =>{

					// ページ選択切替
					if (pathName === pg.URL) {
						setSelPG(pg.State),
						setImgIx(pg.State)
					}

				})

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
