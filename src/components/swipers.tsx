import { ReactNode } from 'react'
import mainStyles from '../styles/modules/main-swiper.module.scss'
import thumbStyles from '../styles/modules/thumb-swiper.module.scss'
import { Framework, Website } from '../config/production-data'
import { ProfilePage } from '../config/profile-data'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Thumbs, EffectCoverflow } from 'swiper'// CSS in _document.tsx

SwiperCore.use([Pagination, Thumbs, EffectCoverflow]) // use Swiper Components

type PageData = {
	listTitle?: string,
	initialSlideState?: number,
	categoryState?: string,
	state?: number | string,
	mainSwiper?: ReactNode,
	thumbSwiper?: ReactNode,
	onSlideChange?: (swiper?: SwiperCore) => void
}

// ---------- Create Main Swiper Element ---------- //
const MainSwiper = ({ app }): JSX.Element => {

	const { $state, $methods, $category, $judgments } = app
	const { linkTo, findWebsiteData } = $methods
	const { isProduction, isProfile } = $judgments 
	const { profile, production } = $category

	let pageData: PageData

	if (isProfile) {
		const dataSet = []
		for (const obj of Object.entries(profile.dataSet)) {
			dataSet.push(obj[1])
		}
		pageData = {
			listTitle: profile.name,
			initialSlideState: Object.keys(profile.dataSet).indexOf($state.profileType),
			categoryState: profile.state,
			state: $state.profileType,
			mainSwiper: dataSet.map((profilePage: ProfilePage)=> (
				<SwiperSlide
					key={`main-swiper-${profilePage.id}`}
					tag="li"
					className={mainStyles.swiperSlide}
				>
				</SwiperSlide>
			)),
			onSlideChange: (): void => {}
		}
	}

	if (isProduction) {
		pageData = {
			listTitle: production.name,
			initialSlideState: $state.websiteIndex,
			categoryState: production.state,
			state: $state.websiteIndex,
			mainSwiper: production.dataSet.map((fw: Framework)=> (
				fw.pages.map((ws: Website) => (
					<SwiperSlide
						key={`main-swiper-${ws.id}`}
						tag="li" // set tag with 'class="swiper-slide"'
						className={mainStyles.swiperSlide}
					>
						<img
							src={`/swiper/${ws.id}.png`}
							alt={ws.name}
							onClick={() => linkTo(ws.URL, production.state, ws.state)}
							className={`
								${mainStyles.swiperSlideImg}
								${$state.websiteIndex === ws.state && mainStyles.swiperSlideImgSelected}
							`}
						/>
					</SwiperSlide>
				))
			)),
			onSlideChange: (swiper: SwiperCore): void => {
				const ws: Website | false = findWebsiteData(swiper.activeIndex, 'state')
				ws && linkTo(ws.URL, production.state, ws.state)
			}
		}
	}

	return (
		<Swiper
			id="main" // Main Swiper's id
			thumbs={{swiper: $state.swipeElement}} // link to swiper with 'id="thumbs"'
			tag="section" // set tag with 'class="swiper-container"'
			wrapperTag="ul" // set tag with 'class="swiper-wrapper"'
			speed={600} // set speed when go to prev or next slide
			centeredSlides // centering active slide
			initialSlide={pageData.initialSlideState} // set slide when initial display
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
			onSlideChange={(swiper) => pageData.onSlideChange(swiper)} // set action when slides change => on change active slide
		>
			{pageData.mainSwiper}
		</Swiper>
	)
}

// ---------- Create Thumb Swiper Element ---------- //
const ThumbSwiper = ({ app }): JSX.Element => {

	const { $state, $category, $methods, $judgments } = app
	const { linkTo, showThumbSwiperOnSP, setSwipeElement } = $methods
	const { isProduction, isProfile } = $judgments 
	const { production, profile } = $category

	const SwiperContetnts = (
		{
			value,
			subImage = undefined
		}: {
			value: Website | ProfilePage,
			subImage?: {
				name: string,
				imageSrc: string,
			} | undefined
		}
	): JSX.Element => {
		return (
			<div
				className={`
					${thumbStyles.thumbSwiperList}
					${pageData.state === value.state && thumbStyles.thumbSwiperListSelected}
				`}
				onClick={() => linkTo(value.URL, pageData.categoryState, value.state)}
			>
				{(value as Website).imageSrc && <img src={(value as Website).imageSrc} alt={value.name} />}
				{value.name}
				{subImage && (
					<span className={thumbStyles.thumbSwiperListNote}>
						<img src={subImage.imageSrc} alt={subImage.name} />
						{subImage.name} {label.separate} {(value as Website).createDate} {label.fromTo}
					</span>
				)}
			</div>
		)
	}
	
	const label = {
		close: '✕',
		separate: '/',
		fromTo: '～',
	}

	const layout: Record<string, string> = {
		titleBox: 'flex-space-between'
	}

	let pageData: PageData

	if (isProfile) {
		const dataSet = []
		for (const obj of Object.entries(profile.dataSet)) {
			dataSet.push(obj[1])
		}
		pageData = {
			listTitle: profile.name,
			initialSlideState: Object.keys(profile.dataSet).indexOf($state.profileType),
			categoryState: profile.state,
			state: $state.profileType,
			thumbSwiper: dataSet.map((profilePage: ProfilePage)=> (
				<SwiperSlide
					key={`thumb-swiper-${profilePage.id}`}
					tag="li"
					className={thumbStyles.swiperSlide}
				>
					<SwiperContetnts value={profilePage}/>
				</SwiperSlide>
			))
		}
	}

	if (isProduction) {
		pageData = {
			listTitle: production.name,
			initialSlideState: $state.websiteIndex,
			categoryState: production.state,
			state: $state.websiteIndex,
			thumbSwiper: production.dataSet.map((fw: Framework)=> (
				fw.pages.map((ws: Website) => (
					<SwiperSlide
						key={`thumb-swiper-${ws.id}`}
						tag="li"
						className={thumbStyles.swiperSlide}
					>
						<SwiperContetnts value={ws} subImage={fw}/>
					</SwiperSlide>
				))
			))
		}
	}

	return (
		<>
			<div className={layout.titleBox}>

				<h1 className={thumbStyles.thumbSwiperListTitle}>
					{pageData.listTitle}
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
				initialSlide={pageData.initialSlideState}
				onSwiper={(swiper) => setSwipeElement(swiper)} // set action when slides change
			>
				{pageData.thumbSwiper}
			</Swiper>

		</>
	)
}

export default { MainSwiper, ThumbSwiper }