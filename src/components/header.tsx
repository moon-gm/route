import styles from '../styles/modules/header.module.scss'
import { HomeList, TabList } from '../types/index'

const Header = ({ app }): JSX.Element => {

	const { $siteData, $judgments, $productionOrder, $category, $methods } = app
	const { linkTo, scrollToTop, showThumbSwiperOnSP } = $methods
	const { framework, website } = $productionOrder
	const { isProduction } = $judgments	
	const { HOME, PROFILE, PRODUCTION } = $category
	const { SITE_TITLE, SITE_IMAGE } = $siteData

	const homeList: HomeList[] = [
		{
			name: 'homeButton',
			className: `${styles.homeButton} flex-space-between align-items-center`,
			method: () => linkTo(HOME.URL, HOME.STATE),
			children: {
				image: {
					src: '/logo/portfolio.png',
					alt: SITE_IMAGE.ALT,
				},
				etc: <span>{SITE_TITLE}</span>
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
			display: isProduction
		}
	]

	const headerTabList: TabList[] = [
		{
			name: PROFILE.NAME,
			url: PROFILE.URL,
			state: PROFILE.STATE
		},
		{
			name: PRODUCTION.NAME,
			url: PRODUCTION.DATASET[framework.Nuxt].PAGES[website.Tequipedia2].URL
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
							onClick={() => linkTo(element.url, element.state)}
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
