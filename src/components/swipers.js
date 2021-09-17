// Styles
import cssMV from '../styles/modules/mainVisual.module.scss'
import cssA from '../styles/modules/aside.module.scss'

// Swiper設定
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Thumbs, EffectCoverflow } from 'swiper'// CSSは_document.jsのlinkで設定
SwiperCore.use([Pagination, Thumbs, EffectCoverflow]) // Swiperで使用するコンポーネント設定

// メインビジュアルの画像スワイパー
const MainSwiper = ({prop}) => {

	// スライド変更時の処理
	const onSlideChange = (swiper) => {

		// アクティブスライドに合わせて選択状態を変更・遷移(スワイプ時)
		prop.dataset.map(fw => {
			fw.PAGES.map(ws => {
				if(swiper.activeIndex === ws.STATE) {
					prop.methods.linkTo(ws.URL, prop.state.set.category.production, ws.STATE)
				}
			})
		})

	}

	// メインスワイパー
	return (
		<Swiper
			id="main" // メインのSwiperを明示する
			thumbs={{swiper: prop.state.store.swipeElement}} // id="thumbs"が付いているSwiperコンポーネントとリンクさせる
			tag="section" // 「swiper-container」クラスのTag設定
			wrapperTag="ul" // 「swiper-wrapper」クラスのTag設定
			speed={600} // 前後のスライドに移動する時の速度設定
			centeredSlides // アクティブスライドを中央にする設定
			initialSlide={prop.state.store.selWS} // 初期表示スライドの設定
			spaceBetween={0} //スライド間のスペース設定
			slidesPerView={3} // スライドを一度に表示する個数設定
			effect="coverflow" // スライドのエフェクト設定（'coverflow', 'fade', 'flip', 'slide', 'cube'）
			slideToClickedSlide // クリックしたスライドに移動する
			breakpoints={{ // 画面幅ごとの詳細設定
				320: {slidesPerView: 1}, // 画面幅が320pxより大きい場合
				640: {slidesPerView: 2}, // 画面幅が640pxより大きい場合
				980: {slidesPerView: 3}, // 画面幅が980pxより大きい場合
			}}
			direction='horizontal' // スライドの並ぶ方向設定（'vertical', 'horizontal'）
			pagination // ページネーションの表示設定（・・・・・）
			onSlideChange={(swiper) => onSlideChange(swiper)} // スライド変更時の処理
		>
			{prop.dataset.map(fw => (
				<React.Fragment key={`mainVisual${fw.NAME}`}>

					{/* イメージリスト -- start -- */}
						{fw.PAGES.map(ws => (
							<SwiperSlide
								tag="li" // 「swiper-slide」クラスのTag設定
								className={cssMV.swiperSlide}
								key={ws.ID}
							>
								<img
									src={`/swiper/${ws.ID}.png`}
									onClick={() => prop.methods.linkTo(ws.URL, prop.state.set.category.production, ws.STATE)}
									className={`
										${cssMV.swiperSlideImg}
										${prop.state.store.selWS === ws.STATE && cssMV.swiperSlideImgSelected}
									`}
								/>
							</SwiperSlide>
						))}
					{/* イメージリスト -- end -- */}

				</React.Fragment>
			))}
		</Swiper>
	)
}

// サイドエリアのサムスワイパー
const ThumbSwiper = ({prop}) => {
	return (
		<>
			{/* フレックスボックス -- start -- */}
				<div className="flex-space-between">
					{/* プロダクションリストタイトル -- start -- */}
						<h1 className={cssA.sectionTitle}>
							{prop.category.PRODUCTION.NAME} List
						</h1>
					{/* プロダクションリストタイトル -- end -- */}

					{/* プロダクションリストタイトル -- start -- */}
						<h1
							onClick={() => prop.methods.showSideAreaSP(false)}
							className={cssA.closeBtn}
						>
							×
						</h1>
					{/* プロダクションリストタイトル -- end -- */}
				</div>
			{/* フレックスボックス -- end -- */}

			{/* サムスワイプエリア -- start -- */}
				<Swiper
					id="thumbs"
					direction="vertical"
					tag="section"
					wrapperTag="ul"
					effect="slide"
					slideToClickedSlide
					slidesPerView={0}
					initialSlide={prop.state.store.selWS}
					onSwiper={(swiper) => prop.methods.setSwipeElement(swiper)} // スワイプ時の処理
				>
					{prop.dataset.map(fw => (
						<React.Fragment key={`sidelist${fw.STATE}`}>

							{/** プロダクションリスト -- start -- **/}
								{fw.PAGES.map(ws => (
									<SwiperSlide
										tag="li"
										className={cssA.swiperSlide}
										key={`sidelistItem${ws.ID}`}
									>
										<div
											onClick={() => 
												prop.methods.linkTo(ws.URL, prop.state.set.category.production, ws.STATE),
												prop.methods.scrollToTop()
											}
											className={`
												${cssA.list}
												${prop.state.store.selWS === ws.STATE && cssA.listSelected}
											`}
										>
											<img
												src={fw.IMG}
												alt="icon"
												className={cssA.listImg}
											/>
											{ws.NAME}
											<span className={cssA.listSubText}>
												{fw.NAME} / {ws.CREATE_DATE} 〜
											</span>
										</div>
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

export default { MainSwiper, ThumbSwiper }