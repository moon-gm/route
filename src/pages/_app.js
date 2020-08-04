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
			index: undefined
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

	changeFW(state,index) {
		this.setState({MenuTab: state});
		sessionStorage.setItem('MenuTabState', state);
		this.setState({index: index});
		sessionStorage.setItem('SwipeIndex', index);
	}

	render() {
		return (
			<div className="container" id="top">
				{/***  ヘッダーエリア ***/}
				<Header func={this.changeFW.bind(this, "top", 0)}/>

				{/*** ナビゲーションエリア ***/}
				<Navigation info={this.info} state={this.state}/>

				{/*** コンテンツエリア ***/}
				<div className="contents-area flex-space-around">

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
