// Style
import '../styles/globals.scss'

// Component
import Header from '../components/header'
import Swipers from '../components/swipers'

// Data
import Page from '../data/page'

class Layout extends React.Component {

	//-------------------------------- 初期値設定 --------------------------------//

	constructor(props) {
		super(props)

		/*** ■ State設定 ***/
		const STATE = {
			selFW: {
				Profile: "profile", React: "reactjs", Next: "nextjs",
				Gatsby: "gatsbyjs", Laravel: "laravel",
			},
			imgIx: {
				/* React */ ReactLearning: 0,
				/* Next */ PortfolioShow: 1, NextLearning: 2, NationalFlags: 3,
				/* Gatsby */ AtelierK: 4, GatsbyLearning: 5,
				/* Laravel */ Tequipedia: 6,
			}
		}

		/*** ■ Stateの初期値設定 ***/
		this.state = {
			selFW: STATE.selFW.Profile, // 表示ページのFWの選択設定
			selPG: undefined, // 表示ページの画像とリストの選択設定
			imgIx: STATE.imgIx.ReactLearning, // MainVisualのスクロール画像のindex設定
			swipEL: null, // スワイパー(Element)の設定
		}

		/*** ■ state.imgIxの最大値設定 ***/
		this.MAX_INDEX = 6

		/*** ■ Function設定 ***/
		const FUNC = this.ALL_FUNC = {

			// ページで使用
			ReactLearning: this.changeFW.bind(this, STATE.selFW.React, STATE.imgIx.ReactLearning),
			PortfolioShow: this.changeFW.bind(this, STATE.selFW.Next, STATE.imgIx.PortfolioShow),
			NextLearning: this.changeFW.bind(this, STATE.selFW.Next, STATE.imgIx.NextLearning),
			NationalFlags: this.changeFW.bind(this, STATE.selFW.Next, STATE.imgIx.NationalFlags),
			AtelierK: this.changeFW.bind(this, STATE.selFW.Gatsby, STATE.imgIx.AtelierK),
			GatsbyLearning: this.changeFW.bind(this, STATE.selFW.Gatsby, STATE.imgIx.GatsbyLearning),
			Tequipedia: this.changeFW.bind(this, STATE.selFW.Laravel, STATE.imgIx.Tequipedia),

			// ヘッダーで使用
			showTop: this.changeFW.bind(this, STATE.selFW.Profile, 0),

			// スワイパーで使用
			changeSwiper: this.changeSwiper.bind(this),

		}

		/*** ■ サイト情報設定 ***/
		this.PAGE_INFO = Page(STATE, FUNC)
		// 以下はpage.jsで設定の順番（※この番号を変更したらpage.jsの順序も入れ替える）
		this.FW_NUM = { React: 0, Next: 1, Gatsby: 2, Laravel: 3, }
		this.PAGE_NUM = {
			/* React */ ReactLearning: 0,
			/* Next */ PortfolioShow: 0, NextLearning: 1, NationalFlags: 2,
			/* Gatsby */ AtelierK: 0, GatsbyLearning: 1,
			/* Laravel */ Tequipedia: 0,
		}

	}


	//-------------------------------- メソッド設定 --------------------------------//

	/*** ■ レンダー後の処理 ***/
	componentDidMount(){

		// 画像・リストの表示条件設定
		const pathName = window.location.pathname
		const pathSplit = pathName.split("/")
		const info = this.PAGE_INFO
		info.map(fw => {

			// URLに合わせてStateを変更
			const cond =  ("/" + pathSplit[1] === fw.URL)
			cond && (

				// FW切替
				this.setState({selFW: fw.State}),
				fw.Page.map(pg =>{

					// ページ選択切替
					const cond =  (pathName === pg.URL)
					cond && (this.setState({selPG: pg.State, imgIx: pg.State}))

				})

			)

		})

	}

	/*** ■ Productionの各サイト一覧押下時の処理 ***/
	changeFW(selFW, index) {

		// Stateをセットしてページを切替
		this.setState({
			selFW: selFW,
			imgIx: index,
			selPG: index
		})

		// ユーザーエージェント設定
		const ua = navigator.userAgent.toLowerCase();
		const isiPhone = (ua.indexOf('iphone') > -1) // iPhone
		const isiPad = (ua.indexOf('ipad') > -1) // iPad
		const isAndroid = (ua.indexOf('android') > -1) && (ua.indexOf('mobile') > -1) // Android
		const isAndroidTablet = (ua.indexOf('android') > -1) && (ua.indexOf('mobile') == -1) // Android Tablet

		// SP時のみボタン押下時にサイドエリアを非表示
		const cond = (!isiPhone || !isiPad || !isAndroid || !isAndroidTablet)
		cond && (document.getElementById('contents-aside').style.left = "768px")
	}

	/*** ■ Production一覧押下時の処理 ***/
	changeSwiper(swiper) {

		// Stateをセットしてスワイパーを切替
		this.setState({swipEL: swiper})

	}


	//-------------------------------- レンダリング設定 --------------------------------//

	render() {

		// 共通Propsの設定
		const prop = {
			info: this.PAGE_INFO,
			st: this.state,
			f: this.ALL_FUNC,
			fw: this.FW_NUM,
			pg: this.PAGE_NUM,
		}

		// プロフィールページの表示条件
		const cond = (prop.st.selFW === "profile")

		// 子要素を再生成してPropsを渡す設定
		const newChildren = React.cloneElement(this.props.children, prop)

		// レイアウト設定
		return (
			<div id="top" className="container">

				{/*** ヘッダーエリア -- start -- ***/}
					<Header
						prop={prop}
						cond={cond}
					/>
				{/*** ヘッダーエリア -- end -- ***/}

				{/*** メインビジュアルエリア -- start -- ***/}
					{!cond && (
						<div className="main-visual-area">
							<Swipers.MainSwiper prop={prop}/>
						</div>
					)}
				{/*** メインビジュアルエリア -- end -- ***/}

				{/*** コンテンツエリア -- start -- ***/}
					<div className="contents-area flex-space-around flex-remove-sp">

						{/** サイドエリア -- start -- **/}
							{!cond && (
								<aside
									id="contents-aside"
									className="contents-aside"
								>
									<div className="contents-aside-wrap">
										<Swipers.ThumbSwiper prop={prop}/>
									</div>
								</aside>
							)}
						{/** サイドエリア -- end -- **/}

						{/** メインエリア -- start -- **/}
							<main className={`contents-main ${cond && "contents-main-no-sidearea"}`}>
								<div className="contents-main-wrap">
									{newChildren}
								</div>
							</main>
						{/** メインエリア -- end -- **/}

					</div>
				{/*** コンテンツエリア -- end -- ***/}

			</div>
		);
	}
}

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp
