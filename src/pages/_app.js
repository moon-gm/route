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
import SwiperCore, { Pagination, Thumbs, EffectCoverflow } from 'swiper'// CSSは_document.jsのlinkで設定
SwiperCore.use([Pagination, Thumbs, EffectCoverflow]) // Swiperで使用するコンポーネント設定

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
		const prop = {
			info: this.PAGE_INFO,
			state: this.state,
			func: this.ALL_FUNC,
			fw: this.FW_NUM,
			pg: this.PAGE_NUM,
		}

		// 子要素を再生成してPropsを渡す設定
		const newChildren = React.cloneElement(this.props.children, prop)

		// レイアウト設定
		return (
			<div id="top" className="container">

				{/*** ヘッダーエリア -- start -- ***/}
					<Header
						data={prop}
						styles={headerStyles}
					/>
				{/*** ヘッダーエリア -- end -- ***/}

				{/*** メインビジュアルエリア -- start -- ***/}
					{prop.state.selectedFW !== "profile" && (
						<div className="main-visual-area">

							{/** メニューガイド -- start -- **/}
								<p className={mainVisualStyles.swipeGuide}>
									{"< Slide Menu"}
								</p>
							{/** メニューガイド -- end -- **/}

							{/** メインスワイパーエリア -- start -- **/}
								<div className="main-visual-area-wrap">
									<Swiper
										id="main" // メインのSwiperを明示する
										thumbs={{swiper: prop.state.swiper}} // id="thumbs"が付いているSwiperコンポーネントとリンクさせる
										tag="section" // 「swiper-container」クラスのTag設定
										wrapperTag="ul" // 「swiper-wrapper」クラスのTag設定
										loop // スライドのループ設定
										speed={600} // 前後のスライドに移動する時の速度設定
										centeredSlides // アクティブスライドを中央にする設定
										initialSlide={prop.state.imgIndex} // 初期表示スライドの設定
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
										{prop.info.map(fw => (
											<React.Fragment key={`mainVisual${fw.FW}`}>

												{/* イメージリスト -- start -- */}
													{fw.Page.map(pg => (
														<SwiperSlide
															tag="li" // 「swiper-slide」クラスのTag設定
															className={mainVisualStyles.swiperSlide}
															key={pg.ID}
														>
															<Link href={pg.URL}>
																<img
																	src={`/${pg.ID}.png`}
																	onClick={pg.Func}
																	className={`
																		${mainVisualStyles.swiperSlideImg}
																		${prop.state.selectedPage === pg.State && mainVisualStyles.swiperSlideImgSelected}
																	`}
																/>
															</Link>
														</SwiperSlide>
													))}
												{/* イメージリスト -- end -- */}

											</React.Fragment>
										))}
									</Swiper>
								</div>
							{/** メインスワイパーエリア -- end -- **/}

						</div>
					)}
				{/*** メインビジュアルエリア -- end -- ***/}

				{/*** コンテンツエリア -- start -- ***/}
					<div className="contents-area flex-space-around flex-remove-sp">

						{/** サイドエリア -- start -- **/}
							<aside
								className={`
									contents-aside
									${prop.state.selectedFW === "profile" && "contents-aside-PC"}
								`}
							>
								<div
									className={`
										contents-aside-wrap
										${prop.state.selectedFW === "profile" && "contents-aside-wrap-PC"}
									`}
								>
									<div
										className={`
											contents-aside-swipe-wrapper
											${prop.state.selectedFW === "profile" && "contents-aside-swipe-wrapper-PC"}
										`}
									>
										<h1 className={asideStyles.sectionTitle}>
											Production List
										</h1>

										{/* サムスワイプエリア -- start -- */}
											<Swiper
												id="thumbs"
												direction="vertical"
												tag="section"
												wrapperTag="ul"
												effect="slide"
												slideToClickedSlide
												slidesPerView={0}
												initialSlide={prop.state.imgIndex}
												onSwiper={(swiper) => this.setState({swiper: swiper})}
											>
												{prop.info.map(fw => (
													<React.Fragment key={`sidelist${fw.State}`}>

														{/** プロダクションリスト -- start -- **/}
															{fw.Page.map(pg => (
																<SwiperSlide
																	tag="li"
																	className={asideStyles.swiperSlide}
																	key={`sidelistItem${pg.ID}`}
																>
																	<Link href={pg.URL}>
																		<p
																			onClick={pg.Func}
																			className={`
																				${asideStyles.list}
																				${prop.state.selectedPage === pg.State && asideStyles.listSelected}
																			`}
																		>
																			<img
																				src={fw.Img}
																				alt="icon"
																				className={asideStyles.sectionTitleImg}
																			/>
																			{pg.Title}
																			<span className={asideStyles.listSubText}>
																				{fw.FW} / {pg.CreateDate} 〜
																			</span>
																		</p>
																	</Link>
																</SwiperSlide>
															))}
														{/** プロダクションリスト -- end -- **/}

													</React.Fragment>
												))}
											</Swiper>
										{/* サムスワイプエリア -- end -- */}

									</div>
								</div>
							</aside>
						{/** サイドエリア -- end -- **/}

						{/** メインエリア -- start -- **/}
							<main className="contents-main">
								<div
									className={`
										contents-main-wrap
										${prop.state.selectedFW === "profile" && "contents-main-no-sidearea"}
									`}
								>
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
