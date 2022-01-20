import { Fragment } from 'react'
import mainStyles from '../styles/modules/main-swiper.module.scss'
import thumbStyles from '../styles/modules/thumb-swiper.module.scss'
import { Framework, Website } from '../types/index'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Thumbs, EffectCoverflow } from 'swiper'// CSS in _document.tsx

SwiperCore.use([Pagination, Thumbs, EffectCoverflow]) // use Swiper Components

// ---------- Create Main Swiper Element ---------- //
const MainSwiper = ({ app }): JSX.Element => {

	const { $state, $methods, $category } = app
	const { linkTo, findWebsiteData } = $methods
	const { PRODUCTION } = $category

	// on change active slide
	const onSlideChange = (swiper: SwiperCore): void => {
		const ws: Website | false = findWebsiteData(swiper.activeIndex, 'STATE')
		ws && linkTo(ws.URL, PRODUCTION.STATE, ws.STATE)
	}

	return (
		<Swiper
			id="main" // Main Swiper's id
			thumbs={{swiper: $state.swipeElement}} // link to swiper with 'id="thumbs"'
			tag="section" // set tag with 'class="swiper-container"'
			wrapperTag="ul" // set tag with 'class="swiper-wrapper"'
			speed={600} // set speed when go to prev or next slide
			centeredSlides // centering active slide
			initialSlide={$state.websiteIndex} // set slide when initial display
			spaceBetween={0} // set space between slides
			slidesPerView={3} // set number of slides when preview at one time
			effect="coverflow" // set effect of slide view in 'coverflow', 'fade', 'flip', 'slide', 'cube'
			slideToClickedSlide // go to clicked slide
			breakpoints={{ // set break point by screen width
				320: {slidesPerView: 1}, // set number of preview slides when screen width > 320px
				640: {slidesPerView: 2}, // set number of preview slides when screen width > 640px
				980: {slidesPerView: 3}, // set number of preview slides when screen width > 980px
			}}
			direction='horizontal' // set direction of slides in 'vertical', 'horizontal'
			pagination // display pagnation dot '・・・・・'
			onSlideChange={(swiper) => onSlideChange(swiper)} // set action when slides change
		>
			{PRODUCTION.DATASET.map((fw: Framework)=> (
				<Fragment key={`main-swiper-${fw.NAME}`}>
					{fw.PAGES.map((ws: Website) => (
						<SwiperSlide
							tag="li" // set tag with 'class="swiper-slide"'
							className={mainStyles.swiperSlide}
							key={ws.ID}
						>
							<img
								src={`/swiper/${ws.ID}.png`}
								alt={ws.NAME}
								onClick={() => linkTo(ws.URL, PRODUCTION.STATE, ws.STATE)}
								className={`
									${mainStyles.swiperSlideImg}
									${$state.websiteIndex === ws.STATE && mainStyles.swiperSlideImgSelected}
								`}
							/>
						</SwiperSlide>
					))}
				</Fragment>
			))}
		</Swiper>
	)
}

// ---------- Create Thumb Swiper Element ---------- //
const ThumbSwiper = ({ app }): JSX.Element => {

	const { $state, $category, $methods } = app
	const { linkTo, scrollToTop, showThumbSwiperOnSP, setSwipeElement } = $methods
	const { PRODUCTION } = $category

	const label = {
		close: '✕',
		separate: '/',
		fromTo: '～',
	}

	const layout: Record<string, string> = {
		titleBox: 'flex-space-between'
	}

	return (
		<>
			<div className={layout.titleBox}>

				<h1 className={thumbStyles.thumbSwiperListTitle}>
					{PRODUCTION.NAME}
				</h1>

				<button
					className={thumbStyles.closeButton}
					onClick={() => showThumbSwiperOnSP(false)}
				>
					{label.close}
				</button>

			</div>

			<Swiper
				id="thumbs"
				direction="vertical"
				tag="section"
				wrapperTag="ul"
				effect="slide"
				slideToClickedSlide
				slidesPerView={0}
				initialSlide={$state.websiteIndex}
				onSwiper={(swiper) => setSwipeElement(swiper)} // set action when slides change
			>
				{PRODUCTION.DATASET.map((fw: Framework)=> (
					<Fragment key={`thumb-swiper-${fw.STATE}`}>
						{fw.PAGES.map((ws: Website) => (
							<SwiperSlide
								key={`thumb-swiper-${ws.ID}`}
								tag="li"
								className={thumbStyles.swiperSlide}
							>
								<div
									className={`
										${thumbStyles.thumbSwiperList}
										${$state.websiteIndex === ws.STATE && thumbStyles.thumbSwiperListSelected}
									`}
									onClick={() => {
										linkTo(ws.URL, PRODUCTION.STATE, ws.STATE)
										scrollToTop()
									}}
								>
									<img src={ws.IMG} alt={ws.NAME} />
									{ws.NAME}
									<span className={thumbStyles.thumbSwiperListNote}>
										<img src={fw.IMG} alt={fw.NAME} />
										{fw.NAME} {label.separate} {ws.CREATE_DATE} {label.fromTo}
									</span>
								</div>
							</SwiperSlide>
						))}
					</Fragment>
				))}
			</Swiper>

		</>
	)
}

export default { MainSwiper, ThumbSwiper }