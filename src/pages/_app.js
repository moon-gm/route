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
			index: undefined, // MainVisualのスクロール画像のindex設定
			sideList: true, // サイドエリアの表示設定
		}

		/*** ■ state.indexの最大値設定 ***/
		this.MAX_INDEX = 6

		/*** ■ State設定 ***/
		this.ALL_STATE = {
			selectedFW: {
				Profile: "profile", React: "reactjs", Next: "nextjs",
				Gatsby: "gatsbyjs", Laravel: "laravel",
			},
			index: {
				/* React */ ReactLearning: 0,
				/* Next */ PortfolioShow: 1, NextLearning: 4, NationalFlags: 6,
				/* Gatsby */ AtelierK: 2, GatsbyLearning: 5,
				/* Laravel */ Tequipedia: 3,
			}
		}

		/*** ■ Function設定 ***/
		this.ALL_FUNC = {

			// ページで使用
			ReactLearning: this.changeFW.bind(this, this.ALL_STATE.selectedFW.React, this.ALL_STATE.index.ReactLearning),
			PortfolioShow: this.changeFW.bind(this, this.ALL_STATE.selectedFW.Next, this.ALL_STATE.index.PortfolioShow),
			NextLearning: this.changeFW.bind(this, this.ALL_STATE.selectedFW.Next, this.ALL_STATE.index.NextLearning),
			NationalFlags: this.changeFW.bind(this, this.ALL_STATE.selectedFW.Next, this.ALL_STATE.index.NationalFlags),
			AtelierK: this.changeFW.bind(this, this.ALL_STATE.selectedFW.Gatsby, this.ALL_STATE.index.AtelierK),
			GatsbyLearning: this.changeFW.bind(this, this.ALL_STATE.selectedFW.Gatsby, this.ALL_STATE.index.GatsbyLearning),
			Tequipedia: this.changeFW.bind(this, this.ALL_STATE.selectedFW.Laravel, this.ALL_STATE.index.Tequipedia),

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
			if (condition) {

				// FW切替
				this.setState({selectedFW: items.State})
				items.Page.map(item =>{

					// ページ選択切替
					const condition =  (pathName === item.URL)
					condition && (this.setState({selectedPage: item.State}), this.setState({index: item.State}))

				})

			}

		})

	}


	/*** ■ Productionの各サイト一覧押下時の処理 ***/
	changeFW(selectedFW, index) {

		// Stateをセットしてページを切替
		this.setState({
			selectedFW: selectedFW,
			index: index,
			selectedPage: index
		})

		// 画面上部に遷移
		window.scrollTo(0, 0)

	}


	/*** ■ スクロールの「<」ボタン処理 ***/
	onPrevBtn() {

		// スクロール画像のindexが「null or 0」でない時、indexに-1する
		const condition = (this.state.index === void 0 || this.state.index === 0 || this.state.index === null)
		condition ? this.setState({index: this.MAX_INDEX}) : this.setState({index: this.state.index - 1})

	}

	/*** ■ スクロールの「>」ボタン処理 ***/
	onNextBtn() {

		// スクロール画像のindexが「null or 0」でない時、indexに+1する
		const condition = (this.state.index === void 0 || this.state.index === this.MAX_INDEX || this.state.index === null)
		condition ? this.setState({index: 0}) : this.setState({index: this.state.index + 1})

	}

	/*** ■ サイドメニューの表示ボタン処理 ***/
	showSideList() {

		// Stateの「sideList」に合わせてサイドエリアの表示を切替
		this.state.sideList ? this.setState({sideList: false}) : this.setState({sideList: true})

	}

	/*** ■ レンダー処理 ***/
	render() {

		// children設定
		const additionalProps = { // childrenに渡すPropsの設定
			info: this.PAGE_INFO,
			fw: this.FW_NUM,
			pg: this.PAGE_NUM,
		}
		const newChildren = React.cloneElement(this.props.children, additionalProps) // 子要素を再生成してPropsを渡す設定

		// レイアウト設定
		return (
			<div
				id="top"
				className="container"
			>
				{/*** ヘッダーエリア ***/}
				<Header
					info={this.PAGE_INFO}
					state={this.state}
					func={this.ALL_FUNC}
					fw={this.FW_NUM}
					pg={this.PAGE_NUM}
					styles={headerStyles}
				/>

				{/*** メインビジュアルエリア ***/}
				{this.state.selectedFW !== "profile" && (
					<MainVisual
						info={this.PAGE_INFO}
						state={this.state}
						func={this.ALL_FUNC}
						fw={this.FW_NUM}
						pg={this.PAGE_NUM}
					/>
				)}

				{/*** コンテンツエリア ***/}
				<div className="contents-area flex-space-around flex-remove-sp">

					{/** サイドエリア **/}
					{this.state.selectedFW !== "profile" && this.state.sideList && (
						<Aside
							info={this.PAGE_INFO}
							state={this.state}
						/>
					)}

					{/** メインエリア **/}
					<main
						className="contents-main"
					>
						{this.state.selectedFW === "profile" ? (
							<div className="contents-main-wrap" style={{marginTop: "100px"}}>
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
