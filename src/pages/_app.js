// Style
import '../styles/globals.scss'
import headerStyles from '../styles/modules/header.module.scss'

// Component
import Header from '../components/header'
import MainVisual from '../components/mainVisual'
import Aside from '../components/aside'

// Data
import State from '../data/state.json'
import Page from '../data/page.json'

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

		/*** サイト情報設定 ***/
		this.info = [
			// React.js
			{
				FW: Page.React.FW,
				URL: Page.React.URL,
				State: State.MenuTab.React,
				Func: this.changeFW.bind(this, State.MenuTab.React, State.index.React),
				Page: [
					{
						Title: Page.React.Page.ReactLearning.Title,
						URL: Page.React.Page.ReactLearning.URL,
						ID: Page.React.Page.ReactLearning.ID,
						Func: this.changeFW.bind(this, State.MenuTab.React, State.index.SitePages.React.ReactLearning),
						State: State.index.SitePages.React.ReactLearning
					},
				],
			},
			// Next.js
			{
				FW: Page.Next.FW,
				URL: Page.Next.URL,
				State: State.MenuTab.Next,
				Func: this.changeFW.bind(this, State.MenuTab.Next, State.index.Next),
				Page: [
					{
						Title: Page.Next.Page.PortfolioShow.Title,
						URL: Page.Next.Page.PortfolioShow.URL,
						ID: Page.Next.Page.PortfolioShow.ID,
						Func: this.changeFW.bind(this, State.MenuTab.Next, State.index.SitePages.Next.PortfolioShow),
						State: State.index.SitePages.Next.PortfolioShow
					},
					{
						Title: Page.Next.Page.NextLearning.Title,
						URL: Page.Next.Page.NextLearning.URL,
						ID: Page.Next.Page.NextLearning.ID,
						Func: this.changeFW.bind(this, State.MenuTab.Next, State.index.SitePages.Next.NextLearning),
						State: State.index.SitePages.Next.NextLearning
					},
				],
			},
			// Gatsby.js
			{
				FW: Page.Gatsby.FW,
				URL: Page.Gatsby.URL,
				State: State.MenuTab.Gatsby,
				Func: this.changeFW.bind(this, State.MenuTab.Gatsby, State.index.Gatsby),
				Page: [
					{
						Title: Page.Gatsby.Page.AtelierK.Title,
						URL: Page.Gatsby.Page.AtelierK.URL,
						ID: Page.Gatsby.Page.AtelierK.ID,
						Func: this.changeFW.bind(this, State.MenuTab.Gatsby, State.index.SitePages.Gatsby.AtelierK),
						State: State.index.SitePages.Gatsby.AtelierK
					},
					{
						Title: Page.Gatsby.Page.GatsbyLearning.Title,
						URL: Page.Gatsby.Page.GatsbyLearning.URL,
						ID:Page.Gatsby.Page.GatsbyLearning.ID,
						Func: this.changeFW.bind(this, State.MenuTab.Gatsby, State.index.SitePages.Gatsby.GatsbyLearning),
						State: State.index.SitePages.Gatsby.GatsbyLearning
					},
				],
			},
			// Laravel
			{
				FW: Page.Laravel.FW,
				URL: Page.Laravel.URL,
				State: State.MenuTab.Laravel,
				Func: this.changeFW.bind(this, State.MenuTab.Laravel, State.index.Laravel),
				Page: [
					{
						Title: Page.Laravel.Page.Tequipedia.Title,
						URL: Page.Laravel.Page.Tequipedia.URL,
						ID: Page.Laravel.Page.Tequipedia.ID,
						Func: this.changeFW.bind(this, State.MenuTab.Laravel, State.index.SitePages.Laravel.Tequipedia),
						State: State.index.SitePages.Laravel.Tequipedia
					},
				],
			},
		];
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
			this.setState({index: 5});
		} else {
			this.setState({imageDirection: "right"});
			this.setState({index: this.state.index - 1});
		}
	}

	/*** スクロールの「>」ボタン処理 ***/
	nextBtn() {
		if (this.state.index === void 0 || this.state.index === 5 || this.state.index === null) {
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
