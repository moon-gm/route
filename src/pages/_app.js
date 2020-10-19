// Style
import '../styles/globals.scss'
import headerStyles from '../styles/modules/header.module.scss'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/effect-coverflow/effect-coverflow.scss'
import 'swiper/components/a11y/a11y.scss'
import styles from '../styles/modules/mainVisual.module.scss'
import asideStyles from '../styles/modules/aside.module.scss'

// Component
import Header from '../components/header'
import MainVisual from '../components/mainVisual'
import Aside from '../components/aside'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, Thumbs, A11y, EffectCoverflow } from 'swiper'

// Data
import Page from '../data/page'

SwiperCore.use([Navigation, Pagination, Thumbs, A11y, EffectCoverflow]);
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
			showSideList: this.showSideList.bind(this),

		}

		/*** ■ サイト情報設定 ***/
		const INFO = this.PAGE_INFO = Page(this.ALL_STATE, this.ALL_FUNC)
		// 以下はpage.jsで設定の順番（※この番号を変更したらpage.jsの順序も入れ替える）
		const FW = this.FW_NUM = { React: 0, Next: 1, Gatsby: 2, Laravel: 3, }
		const PG = this.PAGE_NUM = {
			/* React */ ReactLearning: 0,
			/* Next */ PortfolioShow: 0, NextLearning: 1, NationalFlags: 2,
			/* Gatsby */ AtelierK: 0, GatsbyLearning: 1,
			/* Laravel */ Tequipedia: 0,
		}

		// スクロールする画像の順序設定
		this.scrollItems = [
			// 各FW代表ページ
			INFO[FW.React].Page[PG.ReactLearning], // imgIndex: 0
			INFO[FW.Next].Page[PG.PortfolioShow], // imgIndex: 1
			INFO[FW.Next].Page[PG.NextLearning], // imgIndex: 2
			INFO[FW.Next].Page[PG.NationalFlags], // imgIndex: 3
			INFO[FW.Gatsby].Page[PG.AtelierK], // imgIndex: 4
			INFO[FW.Gatsby].Page[PG.GatsbyLearning], // imgIndex: 5
			INFO[FW.Laravel].Page[PG.Tequipedia], // imgIndex: 6

			// 追加ページ
		];

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
					<MainVisual data={commonProp}>
						<Swiper
							id="main"
							thumbs={{swiper: this.state.swiper}}
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
								320: {// 画面幅が320pxより大きい場合
									slidesPerView: 1,
								},
								640: {// 画面幅が640pxより大きい場合
									slidesPerView: 2,
								},
								980: {// 画面幅が980pxより大きい場合
									slidesPerView: 3,
								},
							}}
							direction='horizontal' // スライドの並ぶ方向設定（'vertical', 'horizontal'）
							pagination // ページネーションの表示設定（・・・・・）
							onSwiper={(swiper) => console.log(swiper)} // スワイプ時の処理
							onSlideChange={() => {}} // スライドが変わった時の処理
						>
							{this.scrollItems.map(scrollItem => {
								return (
									<SwiperSlide
										tag="li" // 「swiper-slide」クラスのTag設定
										className={styles.scrollItem}
										key={scrollItem.ID}
									>
										<Link href={scrollItem.URL}>
											<img
												src={`/${scrollItem.ID}.png`}
												onClick={scrollItem.Func}
												className={`
													${styles.scrollImg}
													${this.state.selectedPage === scrollItem.State && styles.scrollImgSelected}
												`}
											/>
										</Link>
									</SwiperSlide>
								)
							})}
						</Swiper>
					</MainVisual>
				)}

				{/*** コンテンツエリア ***/}
				<div className="contents-area flex-space-around flex-remove-sp">

					{/** サイドエリア **/}
						<Aside data={commonProp} /*display={this.state.selectedFW === "profile" && this.state.sideList !== true && asideStyles.none}*/>
							<h1 className={asideStyles.sectionTitle}>
								Production List
							</h1>
							<Swiper
								id="thumbs"
								tag="section" // 「swiper-container」クラスのTag設定
								wrapperTag="ul" // 「swiper-wrapper」クラスのTag設定
								initialSlide={this.state.imgIndex} // 初期表示スライドの設定
								slidesPerView={0} // スライドを一度に表示する個数設定
								effect="slide" // スライドのエフェクト設定（'coverflow', 'fade', 'flip', 'slide', 'cube）'
								slideToClickedSlide // クリックしたスライドに移動する
								direction='vertical' // スライドの並ぶ方向設定（'vertical', 'horizontal'）
								onSwiper={(swiper) => this.setState({swiper: swiper})} // スワイプ時の処理
							>
								{this.PAGE_INFO.map(fw => {
									return (
										<React.Fragment key={`sidelist${fw.State}`}>
											{/** 作成サイトリスト -- start -- **/}
												{fw.Page.map(pg => {
													return (
														<SwiperSlide
															tag="li" // 「swiper-slide」クラスのTag設定
															className={asideStyles.scrollItem}
															key={`sidelistItem${pg.ID}`}
														>
															<Link
																href={pg.URL}
																key={`pagelist${pg.URL}`}
															>
																<p
																	className={`
																		${asideStyles.list}
																		${this.state.selectedPage === pg.State && asideStyles.listSelected}
																	`}
																	onClick={pg.Func}
																>
																	<img
																		src={fw.Img}
																		alt="icon"
																		className={asideStyles.sectionTitleImg}
																	/>
																	{pg.Title}<br/>
																	<span className={asideStyles.listSubText}>
																		{fw.FW} / {pg.CreateDate} 〜
																	</span>
																</p>
															</Link>
														</SwiperSlide>
													)
												})}
											{/** 作成サイトリスト -- end -- **/}
										</React.Fragment>
									)
								})}
							</Swiper>
						</Aside>


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
