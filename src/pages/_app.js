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

	/*** ■ State設定 ***/
	const [selFW, setSelFW] = useState(state.selFW.Profile) // 表示ページのFWの選択設定
	const [selPG, setSelPG] = useState() // 表示ページの画像とリストの選択設定
	const [imgIx, setImgIx] = useState() // MainVisualのスクロール画像のindex設定
	const [swipEL, setSwipEL] = useState() // スワイパー(Element)の設定

	/*** ■ 全てのStateををSTATEに格納 ***/
	const STATE = {
		'selFW': selFW, 'selPG': selPG,
		'imgIx': imgIx, 'swipEL': swipEL
	}

	/*** ■ Function設定 ***/
	const FUNC = {
		'changeFW': changeFW,　// ページで使用
		'showTop': changeFW.bind(this, state.selFW.Profile, 0), // ヘッダーで使用
		'changeSwiper': setSwipEL, // スワイパーで使用
	}

	/*** ■ 条件設定 ***/
	const COND_FW = (STATE.selFW === "profile")　// プロフィールページの表示条件

	/*** ■ 共通Propsの設定 ***/
	const PROP = {
		'info': page, // 全ページ情報
		'st': STATE, // 全state情報
		'f': FUNC, // 全Function
		'fw': turn.FW, // フレームワークの順序 => page.jsで設定の順番（※この番号を変更したらpage.jsの順序も入れ替える）
		'pg': turn.PG, // ページの順序 => page.jsで設定の順番（※この番号を変更したらpage.jsの順序も入れ替える）
	}

	/*** ■ 子要素を再生成してPropsを渡す設定 ***/
	const NEW_CHILDREN = React.cloneElement(children, PROP)


	//-------------------------------- メソッド設定 --------------------------------//

	/*** ■ Productionの各サイト一覧押下時の処理 ***/
	function changeFW(selectedFW, index) {

		// Stateをセットしてページを切替
		setSelFW(selectedFW)
		setSelPG(index)
		setImgIx(index)

		// ユーザーエージェント設定
		const ua = navigator.userAgent.toLowerCase();
		const isiPhone = (ua.indexOf('iphone') > -1) // iPhone
		const isiPad = (ua.indexOf('ipad') > -1) // iPad
		const isAndroid = (ua.indexOf('android') > -1) && (ua.indexOf('mobile') > -1) // Android
		const isAndroidTablet = (ua.indexOf('android') > -1) && (ua.indexOf('mobile') == -1) // Android Tablet

		// SP時のみボタン押下時にサイドエリアを非表示
		const cond = (!isiPhone || !isiPad || !isAndroid || !isAndroidTablet)
		cond && !COND_FW && (document.getElementById('contents-aside').style.left = "768px")
	}


	//-------------------------------- レンダリング設定 --------------------------------//

	// レンダー後処理
	useEffect(()=>{

		// 画像・リストの表示条件設定
		const pathName = window.location.pathname
		const pathSplit = pathName.split("/")
		PROP.info.map(fw => {

			// URLに合わせてStateを変更
			const cond =  ("/" + pathSplit[1] === fw.URL)
			cond && (

				// FW切替
				setSelFW(fw.State),
				fw.Page.map(pg =>{

					// ページ選択切替
					const cond = (pathName === pg.URL)
					cond && (
						setSelPG(pg.State),
						setImgIx(pg.State)
					)

				})

			)

		})

	}, [])

	// 通常レンダー
	return (
		<div id="top" className="container">

			{/*** ヘッダーエリア -- start -- ***/}
				<Header
					prop={PROP}
					cond={COND_FW}
				/>
			{/*** ヘッダーエリア -- end -- ***/}

			{/*** メインビジュアルエリア -- start -- ***/}
				{!COND_FW && (
					<div className="main-visual-area">
						<Swipers.MainSwiper prop={PROP}/>
					</div>
				)}
			{/*** メインビジュアルエリア -- end -- ***/}

			{/*** コンテンツエリア -- start -- ***/}
				<div className="contents-area flex-space-around flex-remove-sp">

					{/** サイドエリア -- start -- **/}
						{!COND_FW && (
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
						<main className={`contents-main ${COND_FW && "contents-main-no-sidearea"}`}>
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
