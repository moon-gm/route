import { ReactNode, ReactChild } from 'react'
import mainStyles from '../styles/modules/main-swiper.module.scss'
import thumbStyles from '../styles/modules/thumb-swiper.module.scss'
import { Framework, Website } from '../config/production-data'
import { ProfilePage } from '../config/profile-data'
import Carousel from 'react-responsive-carousel/lib/js/components/Carousel/index'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

type PageData = {
	listTitle?: string,
	initialSlideState?: number,
	categoryState?: string,
	state?: number | string,
	mainSwiper?: ReactNode & ReactChild[],
	thumbSwiper?: ReactNode & ReactChild[],
	onSlideChange?: (activeIndex: number) => void
}

// ---------- Create Main Swiper Element ---------- //
const MainSwiper = ({ app }): JSX.Element => {

	const { $state, $methods, $category, $judgments } = app
	const { linkTo, findWebsiteData } = $methods
	const { isProduction, isProfile, isPC } = $judgments 
	const { profile, production } = $category

	const fadeAnimationHandler: AnimationHandler = (props, state): AnimationHandlerResponse => {
		const transitionTime = props.transitionTime + 'ms';
		const transitionTimingFunction = 'ease-in-out';
	
		let slideStyle: React.CSSProperties = {
			position: 'absolute',
			display: 'block',
			zIndex: -2,
			minHeight: '100%',
			opacity: 0,
			top: 0,
			right: 0,
			left: 0,
			bottom: 0,
			transitionTimingFunction: transitionTimingFunction,
			msTransitionTimingFunction: transitionTimingFunction,
			MozTransitionTimingFunction: transitionTimingFunction,
			WebkitTransitionTimingFunction: transitionTimingFunction,
			OTransitionTimingFunction: transitionTimingFunction,
		};
	
		if (!state.swiping) {
			slideStyle = {
				...slideStyle,
				WebkitTransitionDuration: transitionTime,
				MozTransitionDuration: transitionTime,
				OTransitionDuration: transitionTime,
				transitionDuration: transitionTime,
				msTransitionDuration: transitionTime,
			};
		}
	
		return {
			slideStyle,
			selectedStyle: { ...slideStyle, opacity: 1, position: 'relative' },
			prevStyle: { ...slideStyle },
		};
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
			mainSwiper: dataSet.map((profilePage: ProfilePage)=> (
				<div
					key={`main-swiper-${profilePage.id}`}
					className={mainStyles.swiperSlide}
				>
				</div>
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
					<div
						key={`main-swiper-${ws.id}`}
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
					</div>
				))
			)),
			onSlideChange: (activeIndex: number): void => {
				const ws: Website | false = findWebsiteData(activeIndex, 'state')
				ws && linkTo(ws.URL, production.state, ws.state)
			}
		}
	}

	return (
		<Carousel
			autoFocus
			// autoPlay
			selectedItem={pageData.state as number}
			width="100%"
			// // ariaLabel="Sample"
			centerMode
			centerSlidePercentage={isPC ? 100/3 : 100}
			dynamicHeight
			infiniteLoop
			// interval={1000}
			showArrows
			showStatus
			swipeable={false}
			showThumbs={true}
			swipeScrollTolerance={10}
			thumbWidth={100}
			useKeyboardArrows
			onClickItem={(clickIndex, clickItem) => {
				console.log(clickItem)
				pageData.onSlideChange(clickIndex)
			}}
			onClickThumb={(clickIndex, clickItem) => {
				pageData.onSlideChange(clickIndex)
			}}
			onChange={(clickIndex, clickItem) => {
				pageData.onSlideChange(clickIndex)
			}}
			animationHandler="slide"
		>
			{pageData.mainSwiper}
		</Carousel>
	)
}

// ---------- Create Thumb Swiper Element ---------- //
const ThumbSwiper = ({ app }): JSX.Element => {

	const { $state, $category, $methods, $judgments } = app
	const { linkTo, showThumbSwiperOnSP } = $methods
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
				<div
					key={`thumb-swiper-${profilePage.id}`}
					className={thumbStyles.swiperSlide}
				>
					<SwiperContetnts value={profilePage}/>
				</div>
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
					<div
						key={`thumb-swiper-${ws.id}`}
						className={thumbStyles.swiperSlide}
					>
						<SwiperContetnts value={ws} subImage={fw}/>
					</div>
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

			<div>
				{pageData.thumbSwiper}
			</div>

		</>
	)
}

const Swipers = { MainSwiper, ThumbSwiper }
export default Swipers