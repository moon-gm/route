import styles from '../styles/modules/header.module.scss'
import { productionOrder } from '../config/production-data'

const Header = ({ app }): JSX.Element => {

	type HomeList = {
		name: string,
		className: string,
		method: () => void,
		children: {
			image: {
				src: string,
				alt: string
			},
			etc?: JSX.Element
		},
		display?: boolean
	}
	
	type TabList = {
		name: string,
		url: string,
		state?: string,
		subState?: string | number
	}

	const { $meta, $judgments, $category, $methods } = app
	const { linkTo, scrollToTop, showThumbSwiperOnSP } = $methods
	const { isSwiperPage } = $judgments	
	const { home, profile, production } = $category
	const { siteTitle, siteImage } = $meta

	const { framework, website } = productionOrder

	const homeList: HomeList[] = [
		{
			name: 'homeButton',
			className: `${styles.homeButton} flex-space-between align-items-center`,
			method: () => linkTo(home.URL, home.state),
			children: {
				image: {
					src: production.dataSet[framework.next].pages[website['portfolio-show']].imageSrc,
					alt: siteImage.alt,
				},
				etc: <span>{siteTitle}</span>
			},
		},
		{
			name: 'topButton',
			className: styles.topButton,
			method: () => scrollToTop(), 
			children: {
				image: {
					src: '/icon/top.svg',
					alt: 'top',
				},
			}
		},
		{
			name: 'menuButton',
			className: styles.menuButton,
			method: () => showThumbSwiperOnSP(true),
			children: {
				image: {
					src: '/icon/menu.svg',
					alt: 'menu',
				},
			},
			display: isSwiperPage
		}
	]

	const headerTabList: TabList[] = [
		{
			name: profile.name,
			url: profile.dataSet.career.URL,
			state: profile.state,
			subState: profile.dataSet.career.state
		},
		{
			name: production.name,
			url: production.dataSet[framework.nuxt].pages[website.tequipedia2].URL,
			state: production.state,
			subState: production.dataSet[framework.nuxt].pages[website.tequipedia2].state
		},
	]

	const layout: Record<string, string> = {
		header: 'header-area',
		homeList: `${styles.homeList} flex-space-between`,
		tabList: `${styles.tabList} flex-space-around align-items-center`,
	}

	return (
		<header className={layout.header}>
			<div className={styles.homeListWrapper}>
				<ul className={layout.homeList}>
					{homeList.map(element => element.display !== false && (
						<li
							key={element.name}
							className={element.className}
							onClick={element.method}
						>
							<img
								src={element.children.image.src}
								alt={element.children.image.alt}
							/>
							{element.children.etc && element.children.etc}
						</li>
					))}
				</ul>
			</div>
			<div className={styles.tabListWrapper}>
				<ul className={layout.tabList}>
					{headerTabList.map(element => element.state ? (
						<li
							key={element.name}
							className={styles.tab}
							onClick={() => linkTo(element.url, element.state, element.subState)}
						>
							{element.name}
						</li>
					) : (
						<li
							key={element.name}
							className={styles.tab}
						>
							<a
								href={element.url}
								className={styles.tabLink}
							>
								{element.name}
							</a>
						</li>
					))}
				</ul>
			</div>
		</header>
	)
}
export default Header
