// Styles
import cssMV from '../styles/modules/mainVisual.module.scss'
import cssA from '../styles/modules/aside.module.scss'

// Component
import Link from 'next/link';

// Swiper設定
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Thumbs, EffectCoverflow } from 'swiper'// CSSは_document.jsのlinkで設定
SwiperCore.use([Pagination, Thumbs, EffectCoverflow]) // Swiperで使用するコンポーネント設定

// メインビジュアルの画像スワイパー
const MainSwiper = ({prop}) => {

	return (
		<>
			{/** メニューガイド -- start -- **/}
				<p className={cssMV.swipeGuide}>
					{"< Slide Menu"}
				</p>
			{/** メニューガイド -- end -- **/}

			{/** メインスワイパーエリア -- start -- **/}
				<div className="main-visual-area-wrap">
					<Swiper
						id="main" // メインのSwiperを明示する
						thumbs={{swiper: prop.st.swipEL}} // id="thumbs"が付いているSwiperコンポーネントとリンクさせる
						tag="section" // 「swiper-container」クラスのTag設定
						wrapperTag="ul" // 「swiper-wrapper」クラスのTag設定
						loop // スライドのループ設定
						speed={600} // 前後のスライドに移動する時の速度設定
						centeredSlides // アクティブスライドを中央にする設定
						initialSlide={prop.st.imgIx} // 初期表示スライドの設定
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
											className={cssMV.swiperSlide}
											key={pg.ID}
										>
											<Link href={pg.URL}>
												<img
													src={`/${pg.ID}.png`}
													onClick={pg.Func}
													className={`
														${cssMV.swiperSlideImg}
														${prop.st.selPG === pg.State && cssMV.swiperSlideImgSelected}
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
		</>
	)
}

// サイドエリアのサムスワイパー
const ThumbSwiper = ({prop}) => {
	return (
		<>
			{/* プロダクションリストタイトル -- start -- */}
				<h1 className={cssA.sectionTitle}>
					Production List
				</h1>
			{/* プロダクションリストタイトル -- end -- */}

			{/* サムスワイプエリア -- start -- */}
				<Swiper
					id="thumbs"
					direction="vertical"
					tag="section"
					wrapperTag="ul"
					effect="slide"
					slideToClickedSlide
					slidesPerView={0}
					initialSlide={prop.st.imgIx}
					onSwiper={(swiper) => prop.f.changeSwiper(swiper)}
				>
					{prop.info.map(fw => (
						<React.Fragment key={`sidelist${fw.State}`}>

							{/** プロダクションリスト -- start -- **/}
								{fw.Page.map(pg => (
									<SwiperSlide
										tag="li"
										className={cssA.swiperSlide}
										key={`sidelistItem${pg.ID}`}
									>
										<Link href={pg.URL}>
											<p
												onClick={pg.Func}
												className={`
													${cssA.list}
													${prop.st.selPG === pg.State && cssA.listSelected}
												`}
											>
												<img
													src={fw.Img}
													alt="icon"
													className={cssA.sectionTitleImg}
												/>
												{pg.Title}
												<span className={cssA.listSubText}>
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

		</>
	)
}

// SwipersにObjectとして格納
const Swipers = {
	MainSwiper: MainSwiper,
	ThumbSwiper: ThumbSwiper,
}

export default Swipers
