// Global Style
import '../styles/globals.scss'

// Component
import Aside from '../components/aside'
import Navigation from '../components/navigation'
import Header from '../components/header'

// Data
import State from '../data/state.json'
import Page from '../data/page.json'

class Layout extends React.Component {
	constructor(props) {
		super(props);

		// Stateの初期値設定
		this.state = {
			MenuTab: "top",
			index: undefined,
			imageDirection: undefined
		}

		// サイト情報設定
		this.info = [
			{
				FW: Page.React.FW,
				URL: Page.React.URL,
				State: State.MenuTab.React,
				Func: this.changeFW.bind(this, State.MenuTab.React,0),
				Page: [{ Title: Page.React.Page.ReactLearning.Title, URL: Page.React.Page.ReactLearning.URL },],
			},
			{
				FW: Page.Next.FW,
				URL: Page.Next.URL,
				State: State.MenuTab.Next,
				Func: this.changeFW.bind(this, State.MenuTab.Next,1),
				Page: [{ Title: Page.Next.Page.NextLearning.Title, URL: Page.Next.Page.NextLearning.URL },],
			},
			{
				FW: Page.Gatsby.FW,
				URL: Page.Gatsby.URL,
				State: State.MenuTab.Gatsby,
				Func: this.changeFW.bind(this, State.MenuTab.Gatsby,2),
				Page: [
					{ Title: Page.Gatsby.Page.GatsbyLearning.Title, URL: Page.Gatsby.Page.GatsbyLearning.URL },
					{ Title: Page.Gatsby.Page.AtelierK.Title, URL: Page.Gatsby.Page.AtelierK.URL },
				],
			},
			{
				FW: Page.Laravel.FW,
				URL: Page.Laravel.URL,
				State: State.MenuTab.Laravel,
				Func: this.changeFW.bind(this, State.MenuTab.Laravel,3),
				Page: [{ Title: Page.Laravel.Page.Tequipedia.Title, URL: Page.Laravel.Page.Tequipedia.URL },],
			},
		];
	}

	// レンダー後に走る処理
	componentDidMount(){
		const tab = sessionStorage.getItem('MenuTabState');
		const index = sessionStorage.getItem('SwipeIndex');
		if (tab !== undefined) {
			// ここで使用するとエラーになり得るかもしれないので、修正必要かも↓
			this.setState({MenuTab: tab});
		}
		if (index !== undefined) {
			// ここで使用するとエラーになり得るかもしれないので、修正必要かも↓
			this.setState({SwipeIndex: index});
		}
	}

	// ヘッダータブを押下したときの処理
	changeFW(state,index) {
		this.setState({MenuTab: state});
		sessionStorage.setItem('MenuTabState', state);
		this.setState({index: index});
		sessionStorage.setItem('SwipeIndex', index);

		// jQuery導入
		$('.tab').removeClass('tab-selected');
		$(`#${state}`).addClass('tab-selected');
	}

	// スライドの<ボタン処理
	prevBtn() {
		if (this.state.index === undefined || this.state.index === 0) {
			this.setState({imageDirection: "right"});
			this.setState({index: 3});
		} else {
			this.setState({imageDirection: "right"});
			this.setState({index: this.state.index - 1});
		}
	}
	// スライドの>ボタン処理
	nextBtn() {
		if (this.state.index === undefined || this.state.index === 3) {
			this.setState({imageDirection: "left"});
			this.setState({index: 0});
		} else {
			this.setState({imageDirection: "left"});
			this.setState({index: this.state.index + 1});
		}
	}

	render() {
		const func = [this.prevBtn.bind(this), this.nextBtn.bind(this)];
		return (
			<div className="container" id="top">
				{/***  ヘッダーエリア ***/}
				<Header info={this.info} func={this.changeFW.bind(this, "top", 0)}/>

				{/*** ナビゲーションエリア ***/}
				<Navigation state={this.state} func={func}/>

				{/*** コンテンツエリア ***/}
				<div className="contents-area flex-space-around flex-remove-sp">

					{/** サイドエリア **/}
					<Aside info={this.info} state={this.state}/>

					{/** メインエリア **/}
					<main className="contents-main">
						{this.props.children}
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
