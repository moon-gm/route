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
	constructor(props) {
		super(props);

		/*** Stateの初期値設定 ***/
		this.state = {
			MenuTab: State.MenuTab.Top,
			index: undefined,
			imageDirection: undefined,
			sideList: true,
			pageNum: undefined,
		}

		/*** Function設定 ***/
		this.funcs = {
			ReactLearning: this.changeFW.bind(this, State.MenuTab.React, State.index.SitePages.React.ReactLearning),
			PortfolioShow: this.changeFW.bind(this, State.MenuTab.Next, State.index.SitePages.Next.PortfolioShow),
			NextLearning: this.changeFW.bind(this, State.MenuTab.Next, State.index.SitePages.Next.NextLearning),
			NationalFlags: this.changeFW.bind(this, State.MenuTab.Next, State.index.SitePages.Next.NationalFlags),
			AtelierK: this.changeFW.bind(this, State.MenuTab.Gatsby, State.index.SitePages.Gatsby.AtelierK),
			GatsbyLearning: this.changeFW.bind(this, State.MenuTab.Gatsby, State.index.SitePages.Gatsby.GatsbyLearning),
			Tequipedia: this.changeFW.bind(this, State.MenuTab.Laravel, State.index.SitePages.Laravel.Tequipedia),
		}

		/*** サイト情報設定 ***/
		this.info = Page(this.funcs)
	}

	/*** レンダー後の処理 ***/
	componentDidMount(){
		// スクロールする画像の表示設定
		const index = sessionStorage.getItem('ScrollIndex');
		if (index !== null) {
			// 取得したindexは文字列型のため数値型に変更してsetState
			this.setState({index: Number(index)});
			this.setState({pageNum: Number(index)});
		}

		// サイドリストの表示条件設定
		const pathName = window.location.pathname.split("/");
		this.info.map(items => {
			if ("/" + pathName[1] === items.URL) {
				this.setState({MenuTab: items.State});
			}
		})
	}

	/*** ヘッダータブ押下時の処理 ***/
	changeFW(MenuTab,index) {
		this.setState({MenuTab: MenuTab});
		this.setState({index: index});
		this.setState({pageNum: index});
		sessionStorage.setItem('ScrollIndex', index);

		// 画面上部に遷移
		window.scrollTo(0, 0);

		// jQuery導入(classNameの切替)
		$(headerStyles.headerTab).removeClass(headerStyles.headerTabSelected);
		$(`#${MenuTab}`).addClass(headerStyles.headerTabSelected);

	}

	/*** スクロールの「<」ボタン処理 ***/
	prevBtn() {
		if (this.state.index === void 0 || this.state.index === 0 || this.state.index === null) {
			this.setState({imageDirection: "right"});
			this.setState({index: 6});
		} else {
			this.setState({imageDirection: "right"});
			this.setState({index: this.state.index - 1});
		}
	}

	/*** スクロールの「>」ボタン処理 ***/
	nextBtn() {
		if (this.state.index === void 0 || this.state.index === 6 || this.state.index === null) {
			this.setState({imageDirection: "left"});
			this.setState({index: 0});
		} else {
			this.setState({imageDirection: "left"});
			this.setState({index: this.state.index + 1});
		}
	}

	/*** サイドメニューの表示ボタン処理 ***/
	sideListShow() {
		if(this.state.sideList) {
			this.setState({sideList: false})
		} else {
			this.setState({sideList: true})
		}
	}

	render() {
		/***** childrenの設定 *****/
		// childrenに渡すPropsの設定
		const additionalProps = {
			info: this.info
		}
		// 子要素を再生成してPropsを渡す設定
		const newChildren = React.cloneElement(this.props.children, additionalProps);

		return (
			<div
				id="top"
				className="container"
			>
				{/*** ヘッダーエリア ***/}
				<Header
					info={this.info}
					state={this.state}
					topPage={this.changeFW.bind(this, State.MenuTab.Top, State.index.React)}
					productionPage={this.changeFW.bind(this, State.MenuTab.React, State.index.React)}
					sideListShow={this.sideListShow.bind(this)}
					Styles={headerStyles}
				/>

				{/*** メインビジュアルエリア ***/}
				{this.state.MenuTab !== "top" && (
					<MainVisual
						info={this.info}
						state={this.state}
						func={[this.prevBtn.bind(this), this.nextBtn.bind(this)]}
					/>
				)}

				{/*** コンテンツエリア ***/}
				<div className="contents-area flex-space-around flex-remove-sp">

					{/** サイドエリア **/}
					{this.state.MenuTab !== "top" && this.state.sideList && (
						<Aside
							info={this.info}
							state={this.state}
						/>
					)}

					{/** メインエリア **/}
					<main
						className="contents-main"
					>
						{this.state.MenuTab === "top" ? (
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
