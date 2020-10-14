// Style
import '../styles/globals.scss'
import headerStyles from '../styles/modules/header.module.scss'

// Component
import Header from '../components/header'
import MainVisual from '../components/mainVisual'
import Aside from '../components/aside'

// Data
import State from '../data/state.json'
import Page from '../data/page'

class Layout extends React.Component {

	//-------------------------------- 初期値設定 --------------------------------//

	constructor(props) {
		super(props);

		/*** ■ Stateの初期値設定 ***/
		this.state = {
			FWSelected: State.FWSelected.Top, // FWごとの設定
			index: undefined, // MainVisualのスクロール画像のindex設定
			sideList: true, // サイドエリアの表示設定
			pageSelected: undefined, // 表示ページの選択項目の表示切替設定
		}

		/*** ■ indexの最大値設定 ***/
		this.MAX_INDEX = 6

		/*** ■ Function設定 ***/
		this.ALL_FUNC = {

			// ページで使用
			ReactLearning: this.changeFW.bind(this, State.FWSelected.React, State.index.SitePages.React.ReactLearning),
			PortfolioShow: this.changeFW.bind(this, State.FWSelected.Next, State.index.SitePages.Next.PortfolioShow),
			NextLearning: this.changeFW.bind(this, State.FWSelected.Next, State.index.SitePages.Next.NextLearning),
			NationalFlags: this.changeFW.bind(this, State.FWSelected.Next, State.index.SitePages.Next.NationalFlags),
			AtelierK: this.changeFW.bind(this, State.FWSelected.Gatsby, State.index.SitePages.Gatsby.AtelierK),
			GatsbyLearning: this.changeFW.bind(this, State.FWSelected.Gatsby, State.index.SitePages.Gatsby.GatsbyLearning),
			Tequipedia: this.changeFW.bind(this, State.FWSelected.Laravel, State.index.SitePages.Laravel.Tequipedia),

			// メインビジュアルエリアで使用
			onPrevBtn: this.onPrevBtn.bind(this),
			onNextBtn: this.onNextBtn.bind(this),

			// ヘッダーで使用
			showTop: this.changeFW.bind(this, State.FWSelected.Top, State.index.React),
			showProduction: this.changeFW.bind(this, State.FWSelected.React, State.index.React),
			showSideList: this.showSideList.bind(this),

		}

		/*** ■ サイト情報設定 ***/
		this.PAGE_INFO = Page(this.ALL_FUNC)
	}


	//-------------------------------- メソッド設定 --------------------------------//

	/*** ■ レンダー後の処理 ***/
	componentDidMount(){

		// スクロールする画像の表示設定
		const index = sessionStorage.getItem('ScrollIndex')
		if (index !== null) {

			// 取得したindexは文字列型のため数値型に変更してsetState
			this.setState({
				index: Number(index),
				pageSelected: Number(index)
			})

		}

		// サイドリストの表示条件設定
		const pathName = window.location.pathname.split("/")
		this.PAGE_INFO.map(items => {

			// URLに合わせてStateを変更
			const condition =  ("/" + pathName[1] === items.URL)
			condition && this.setState({FWSelected: items.State})

		})

	}


	/*** ■ Productionの各サイト一覧押下時の処理 ***/
	changeFW(FWSelected,index) {

		// Stateをセットしてページを切替
		this.setState({
			FWSelected: FWSelected,
			index: index,
			pageSelected: index
		})

		// セッションにスクロール画像にindexを保存
		sessionStorage.setItem('ScrollIndex', index)

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
		const additionalProps = { info: this.PAGE_INFO } // childrenに渡すPropsの設定
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
					styles={headerStyles}
					showTop={this.ALL_FUNC.showTop}
					showSideList={this.ALL_FUNC.showSideList}
					showProduction={this.ALL_FUNC.showProduction}
				/>

				{/*** メインビジュアルエリア ***/}
				{this.state.FWSelected !== "top" && (
					<MainVisual
						info={this.PAGE_INFO}
						state={this.state}
						onPrevBtn={this.ALL_FUNC.onPrevBtn}
						onNextBtn={this.ALL_FUNC.onNextBtn}
					/>
				)}

				{/*** コンテンツエリア ***/}
				<div className="contents-area flex-space-around flex-remove-sp">

					{/** サイドエリア **/}
					{this.state.FWSelected !== "top" && this.state.sideList && (
						<Aside
							info={this.PAGE_INFO}
							state={this.state}
						/>
					)}

					{/** メインエリア **/}
					<main
						className="contents-main"
					>
						{this.state.FWSelected === "top" ? (
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
