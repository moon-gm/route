// Style
import '../styles/globals.scss'
import headerStyles from '../styles/modules/header.module.scss'
import mainVisualStyles from '../styles/modules/mainVisual.module.scss'
import asideStyles from '../styles/modules/aside.module.scss'

// Component
import Header from '../components/header'
import Link from 'next/link'

// Data
import Page from '../data/page'

// Swiper設定
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Thumbs, A11y, EffectCoverflow } from 'swiper'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/effect-coverflow/effect-coverflow.scss'
import 'swiper/components/a11y/a11y.scss'
SwiperCore.use([Pagination, Thumbs, A11y, EffectCoverflow]) // Swiperで使用するコンポーネント設定

class Layout extends React.Component {

	//-------------------------------- 初期値設定 --------------------------------//

	constructor(props) {
		super(props)

		/*** ■ Stateの初期値設定 ***/
		this.state = {
			selectedFW: "profile", // 表示ページのFWの選択設定
			selectedPage: undefined, // 表示ページの画像とリストの選択設定
			imgIndex: undefined, // MainVisualのスクロール画像のindex設定
			swiper: null, // スワイパー(Element)の設定
		}

		/*** ■ state.imgIndexの最大値設定 ***/
		this.MAX_INDEX = 6

		/*** ■ State設定 ***/
		const STATE = {
			selectedFW: {
				Profile: "profile", React: "reactjs", Next: "nextjs",
				Gatsby: "gatsbyjs", Laravel: "laravel",
			},
			imgIndex: {
				/* React */ ReactLearning: 0,
				/* Next */ PortfolioShow: 1, NextLearning: 2, NationalFlags: 3,
				/* Gatsby */ AtelierK: 4, GatsbyLearning: 5,
				/* Laravel */ Tequipedia: 6,
			}
		}

		/*** ■ Function設定 ***/
		const FUNC = this.ALL_FUNC = {

			// ページで使用
			ReactLearning: this.changeFW.bind(this, STATE.selectedFW.React, STATE.imgIndex.ReactLearning),
			PortfolioShow: this.changeFW.bind(this, STATE.selectedFW.Next, STATE.imgIndex.PortfolioShow),
			NextLearning: this.changeFW.bind(this, STATE.selectedFW.Next, STATE.imgIndex.NextLearning),
			NationalFlags: this.changeFW.bind(this, STATE.selectedFW.Next, STATE.imgIndex.NationalFlags),
			AtelierK: this.changeFW.bind(this, STATE.selectedFW.Gatsby, STATE.imgIndex.AtelierK),
			GatsbyLearning: this.changeFW.bind(this, STATE.selectedFW.Gatsby, STATE.imgIndex.GatsbyLearning),
			Tequipedia: this.changeFW.bind(this, STATE.selectedFW.Laravel, STATE.imgIndex.Tequipedia),

			// ヘッダーで使用
			showTop: this.changeFW.bind(this, STATE.selectedFW.Profile, 0),
			showProduction: this.changeFW.bind(this, STATE.selectedFW.React, 0),

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
		this.PAGE_INFO.map(fw => {

			// URLに合わせてStateを変更
			const condition =  ("/" + pathSplit[1] === fw.URL)
			condition && (
				// FW切替
				this.setState({selectedFW: fw.State}),
				fw.Page.map(pg =>{

					// ページ選択切替
					const condition =  (pathName === pg.URL)
					condition && (this.setState({selectedPage: pg.State, imgIndex: pg.State}))

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
			<div id="top" className="container">
				{/*** ヘッダーエリア -- start -- ***/}
					<Header data={commonProp} styles={headerStyles}/>
				{/*** ヘッダーエリア -- end -- ***/}

				{/*** メインビジュアルエリア -- start -- ***/}
					{this.state.selectedFW !== "profile" && (
						<div className="main-visual-area">
							{/** メニューガイド-- start -- **/}
								<p className={mainVisualStyles.swipeGuide}>
									{"< Slide Menu"}
								</p>
							{/** メニューガイド-- end -- **/}
							<div className="main-visual-area-wrap">
								<Swiper
									id="main" // メインのSwiperを明示する
									thumbs={{swiper: this.state.swiper}} // id="thumbs"が付いているSwiperコンポーネントとリンクさせる
									tag="section" // 「swiper-container」クラスのTag設定
									wrapperTag="ul" // 「swiper-wrapper」クラスのTag設定
									loop // スライドのループ設定
									speed={600} // 前後のスライドに移動する時の速度設定
									centeredSlides // アクティブスライドを中央にする設定
									initialSlide={this.state.imgIndex} // 初期表示スライドの設定
									spaceBetween={0} //スライド間のスペース設定
									slidesPerView={3} // スライドを一度に表示する個数設定
									effect="coverflow" // スライドのエフェクト設定（'coverflow', 'fade', 'flip', 'slide', 'cube）'
									slideToClickedSlide // クリックしたスライドに移動する
									breakpoints={{ // 画面幅ごとの詳細設定
										320: {slidesPerView: 1}, // 画面幅が320pxより大きい場合
										640: {slidesPerView: 2}, // 画面幅が640pxより大きい場合
										980: {slidesPerView: 3}, // 画面幅が980pxより大きい場合
									}}
									direction='horizontal' // スライドの並ぶ方向設定（'vertical', 'horizontal'）
									pagination // ページネーションの表示設定（・・・・・）
								>
									{this.PAGE_INFO.map(fw => (
										<React.Fragment key={`mainVisual${fw.FW}`}>
											{fw.Page.map(pg => (
												<SwiperSlide
													tag="li" // 「swiper-slide」クラスのTag設定
													className={mainVisualStyles.swiperSlide} key={pg.ID}
												>
													<Link href={pg.URL}>
														<img
															src={`/${pg.ID}.png`} onClick={pg.Func}
															className={`
																${mainVisualStyles.swiperSlideImg}
																${this.state.selectedPage === pg.State && mainVisualStyles.swiperSlideImgSelected}
															`}
														/>
													</Link>
												</SwiperSlide>
											))}
										</React.Fragment>
									))}
								</Swiper>
							</div>
						</div>
					)}
				{/*** メインビジュアルエリア -- end -- ***/}

				{/*** コンテンツエリア -- start -- ***/}
					<div className="contents-area flex-space-around flex-remove-sp">

						{/** サイドエリア -- start -- **/}
							<aside className={`contents-aside ${this.state.selectedFW === "profile" && "contents-aside-PC"}`}>
							<div className={`contents-aside-wrap ${this.state.selectedFW === "profile" && "contents-aside-wrap-PC"}`}>
							<div className={`contents-aside-swipe-wrapper ${this.state.selectedFW === "profile" && "contents-aside-swipe-wrapper-PC"}`}>
								<h1 className={asideStyles.sectionTitle}>
									Production List
								</h1>
								<Swiper id="thumbs"　direction="vertical" tag="section"　wrapperTag="ul" effect="slide" slideToClickedSlide　slidesPerView={0} initialSlide={this.state.imgIndex} onSwiper={(swiper) => this.setState({swiper: swiper})}>
									{this.PAGE_INFO.map(fw => (
										<React.Fragment key={`sidelist${fw.State}`}>
											{/** 作成サイトリスト -- start -- **/}
												{fw.Page.map(pg => (
													<SwiperSlide tag="li" className={asideStyles.swiperSlide} key={`sidelistItem${pg.ID}`}>
														<Link href={pg.URL} key={`pagelist${pg.URL}`}>
															<p onClick={pg.Func} className={`${asideStyles.list} ${this.state.selectedPage === pg.State && asideStyles.listSelected}`}>
																<img src={fw.Img} alt="icon" className={asideStyles.sectionTitleImg}/>
																{pg.Title}
																<span className={asideStyles.listSubText}>
																	{fw.FW} / {pg.CreateDate} 〜
																</span>
															</p>
														</Link>
													</SwiperSlide>
												))}
											{/** 作成サイトリスト -- end -- **/}
										</React.Fragment>
									))}
								</Swiper>
							</div>
							</div>
							</aside>
						{/** サイドエリア -- end -- **/}

						{/** メインエリア -- start -- **/}
							<main className="contents-main">
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
