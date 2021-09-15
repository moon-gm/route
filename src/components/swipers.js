// Styles
import cssMV from '../styles/modules/mainVisual.module.scss'
import cssA from '../styles/modules/aside.module.scss'

// Component
import Link from 'next/link';
import { useRouter } from 'next/router';

// Swiper設定
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Thumbs, EffectCoverflow } from 'swiper'// CSSは_document.jsのlinkで設定
SwiperCore.use([Pagination, Thumbs, EffectCoverflow]) // Swiperで使用するコンポーネント設定

// メインビジュアルの画像スワイパー
const MainSwiper = ({prop}) => {

	// ルーター設定
	const router = useRouter()

	// スライド変更時の処理
	function onSlideChange(swiper) {

		// アクティブスライドを取得
		const active = swiper.activeIndex

		// アクティブスライドに合わせて選択状態を変更・遷移
		prop.info.map(fw => {
			fw.Page.map(pg => {
				if(active === pg.State) {
					prop.f.changeFW(fw.State, pg.State)
					router.push(pg.URL)
				}
			})
		})

	}

	// メインスワイパー
	return (
		<Swiper
			id="main" // メインのSwiperを明示する
			thumbs={{swiper: prop.st.swipEL}} // id="thumbs"が付いているSwiperコンポーネントとリンクさせる
			tag="section" // 「swiper-container」クラスのTag設定
			wrapperTag="ul" // 「swiper-wrapper」クラスのTag設定
			speed={600} // 前後のスライドに移動する時の速度設定
			centeredSlides // アクティブスライドを中央にする設定
			initialSlide={prop.st.selPG} // 初期表示スライドの設定
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
			onSlideChange={(swiper) => onSlideChange(swiper)} // スライド変更時の処理
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
								<img
									src={`/swiper/${pg.ID}.png`}
									onClick={() => prop.f.changeFW(fw.State, pg.State)}
									className={`
										${cssMV.swiperSlideImg}
										${prop.st.selPG === pg.State && cssMV.swiperSlideImgSelected}
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

	// サイドエリアを閉じる処理（SP時）
	function onCloseBtn() {
		document.getElementById('contents-aside').style.left = "768px"
	}

	return (
		<>
			{/* フレックスボックス -- start -- */}
				<div className="flex-space-between">
					{/* プロダクションリストタイトル -- start -- */}
						<h1 className={cssA.sectionTitle}>
							Production List
						</h1>
					{/* プロダクションリストタイトル -- end -- */}

					{/* プロダクションリストタイトル -- start -- */}
						<h1
							onClick={onCloseBtn}
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
					initialSlide={prop.st.selPG}
					onSwiper={(swiper) => prop.f.changeSwiper(swiper)} // スワイプ時の処理
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
												onClick={() => prop.f.changeFW(fw.State, pg.State)}
												className={`
													${cssA.list}
													${prop.st.selPG === pg.State && cssA.listSelected}
												`}
											>
												<img
													src={fw.Img}
													alt="icon"
													className={cssA.listImg}
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
