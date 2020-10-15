// Style
import '../styles/globals.scss'
import headerStyles from '../styles/modules/header.module.scss'

// Component
import Header from '../components/header'
import MainVisual from '../components/mainVisual'
import Aside from '../components/aside'

// Data
import Page from '../data/page'

class Layout extends React.Component {

	//-------------------------------- 初期値設定 --------------------------------//

	constructor(props) {
		super(props)

		/*** ■ Stateの初期値設定 ***/
		this.state = {
			selectedFW: "profile", // 表示ページのFWの選択設定
			selectedPage: undefined, // 表示ページの画像とリストの選択設定
			imgIndex: undefined, // MainVisualのスクロール画像のindex設定
			sideList: true, // サイドエリアの表示設定
		}

		/*** ■ state.imgIndexの最大値設定 ***/
		this.MAX_INDEX = 6

		/*** ■ State設定 ***/
		this.ALL_STATE = {
			selectedFW: {
				Profile: "profile", React: "reactjs", Next: "nextjs",
				Gatsby: "gatsbyjs", Laravel: "laravel",
			},
			imgIndex: {
				/* React */ ReactLearning: 0,
				/* Next */ PortfolioShow: 1, NextLearning: 4, NationalFlags: 6,
				/* Gatsby */ AtelierK: 2, GatsbyLearning: 5,
				/* Laravel */ Tequipedia: 3,
			}
		}

		/*** ■ Function設定 ***/
		this.ALL_FUNC = {

			// ページで使用
			ReactLearning: this.changeFW.bind(this, this.ALL_STATE.selectedFW.React, this.ALL_STATE.imgIndex.ReactLearning),
			PortfolioShow: this.changeFW.bind(this, this.ALL_STATE.selectedFW.Next, this.ALL_STATE.imgIndex.PortfolioShow),
			NextLearning: this.changeFW.bind(this, this.ALL_STATE.selectedFW.Next, this.ALL_STATE.imgIndex.NextLearning),
			NationalFlags: this.changeFW.bind(this, this.ALL_STATE.selectedFW.Next, this.ALL_STATE.imgIndex.NationalFlags),
			AtelierK: this.changeFW.bind(this, this.ALL_STATE.selectedFW.Gatsby, this.ALL_STATE.imgIndex.AtelierK),
			GatsbyLearning: this.changeFW.bind(this, this.ALL_STATE.selectedFW.Gatsby, this.ALL_STATE.imgIndex.GatsbyLearning),
			Tequipedia: this.changeFW.bind(this, this.ALL_STATE.selectedFW.Laravel, this.ALL_STATE.imgIndex.Tequipedia),

			// メインビジュアルエリアで使用
			onPrevBtn: this.onPrevBtn.bind(this),
			onNextBtn: this.onNextBtn.bind(this),

			// ヘッダーで使用
			showTop: this.changeFW.bind(this, this.ALL_STATE.selectedFW.Profile, 0),
			showProduction: this.changeFW.bind(this, this.ALL_STATE.selectedFW.React, 0),
			showSideList: this.showSideList.bind(this),

		}

		/*** ■ サイト情報設定 ***/
		this.PAGE_INFO = Page(this.ALL_STATE, this.ALL_FUNC)
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
		this.PAGE_INFO.map(items => {

			// URLに合わせてStateを変更
			const condition =  ("/" + pathSplit[1] === items.URL)
			condition && (

				// FW切替
				this.setState({selectedFW: items.State}),
				items.Page.map(item =>{

					// ページ選択切替
					const condition =  (pathName === item.URL)
					condition && (
						this.setState({selectedPage: item.State}),
						this.setState({imgIndex: item.State})
					)

				})

			)

		})

	}


	/*** ■ Productionの各サイト一覧押下時の処理 ***/
	changeFW(selectedFW, index) {

		// Stateをセットしてページを切替
		this.setState({
			selectedFW: selectedFW,
			imgIndex: index,
			selectedPage: index
		})

		// 画面上部に遷移
		window.scrollTo(0, 0)

	}


	/*** ■ スクロールの「<」ボタン処理 ***/
	onPrevBtn() {

		// スクロール画像のindexが「null or 0」でない時、imgIndexに-1する
		const condition = (this.state.imgIndex === void 0 || this.state.imgIndex === 0 || this.state.imgIndex === null)
		condition ? this.setState({imgIndex: this.MAX_INDEX}) : this.setState({imgIndex: this.state.imgIndex - 1})

	}


	/*** ■ スクロールの「>」ボタン処理 ***/
	onNextBtn() {

		// スクロール画像のindexが「null or 0」でない時、imgIndexに+1する
		const condition = (this.state.imgIndex === void 0 || this.state.imgIndex === this.MAX_INDEX || this.state.imgIndex === null)
		condition ? this.setState({imgIndex: 0}) : this.setState({imgIndex: this.state.imgIndex + 1})

	}


	/*** ■ サイドメニューの表示ボタン処理 ***/
	showSideList() {

		// Stateの「sideList」に合わせてサイドエリアの表示を切替
		const condition = (this.state.sideList)
		condition ? this.setState({sideList: false}) : this.setState({sideList: true})

	}


	//-------------------------------- レンダリング設定 --------------------------------//

	render() {

		// 共通Propsの設定
		const commonProp = {
			info: this.PAGE_INFO,
			state: this.state,
			func: this.ALL_FUNC,
			fw: this.FW_NUM,
			pg: this.PAGE_NUM,
		}

		// 子要素を再生成してPropsを渡す設定
		const newChildren = React.cloneElement(this.props.children, commonProp)

		// レイアウト設定
		return (
			<div
				id="top"
				className="container"
			>
				{/*** ヘッダーエリア ***/}
				<Header
					data={commonProp}
					styles={headerStyles}
				/>

				{/*** メインビジュアルエリア ***/}
				{this.state.selectedFW !== "profile" && (
					<MainVisual data={commonProp}/>
				)}

				{/*** コンテンツエリア ***/}
				<div className="contents-area flex-space-around flex-remove-sp">

					{/** サイドエリア **/}
					{this.state.selectedFW !== "profile" && this.state.sideList && (
						<Aside data={commonProp}/>
					)}

					{/** メインエリア **/}
					<main className="contents-main">
						{this.state.selectedFW === "profile" ? (
							<div
								className="contents-main-wrap"
								style={{marginTop: "100px"}}
							>
								{newChildren}
							</div>
						):(
							<div className="contents-main-wrap">
								{newChildren}
							</div>
						)}
					</main>

				</div>

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
