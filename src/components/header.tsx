import styles from '../styles/modules/header.module.scss'
import { TopList, HeaderTabList } from '../types/index'

const Header = ({ app }): JSX.Element => {

	const { $siteData, $judgments, $productionOrder, $category, $methods } = app
	const { linkTo, scrollToTop, showSideArea } = $methods
	const { framework, website } = $productionOrder
	const { isProduction } = $judgments	
	const { HOME, PROFILE, PRODUCTION } = $category
	const { SITE_TITLE, SITE_IMAGE } = $siteData	

	const topList: TopList[] = [
		{
			name: 'logo',
			className: `${styles.topLogo} flex-space-between align-items-center`,
			method: () => linkTo(HOME.URL, HOME.STATE),
			children: {
				image: {
					src: SITE_IMAGE.SRC,
					alt: SITE_IMAGE.ALT,
					className: styles.topLogoImg
				},
				etc: <span>{SITE_TITLE}</span>
			},
		},
		{
			name: 'topButton',
			className: styles.topBtn,
			method: () => scrollToTop(), 
			children: {
				image: {
					src: '/icon/top.svg',
					alt: 'トップに戻るアイコン',
				},
			}
		},
		{
			name: 'menuButton',
			className: styles.menuBtn,
			method: () => showSideArea(true),
			children: {
				image: {
					src: '/icon/menu.svg',
					alt: 'メニューアイコン',
				},
			},
			display: isProduction
		}
	]

	const headerTabList: HeaderTabList[] = [
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

	return (
		<header className="header-area">
			<div className="header-area-wrap">

				{/*** Top List -- start -- ***/}
					<ul className={`${styles.topList} flex-space-between`}>
						{topList.map(element => element.display !== false && (
							<li
								key={element.name}
								className={element.className}
								onClick={element.method}
							>
								<img
									src={element.children.image.src}
									alt={element.children.image.alt}
									className={element.children.image.className ? element.children.image.className : ''}
								/>
								{element.children.etc && element.children.etc}
							</li>
						))}
					</ul>
				{/*** Top List -- end -- ***/}

				{/*** Header Tab List -- start -- ***/}
					<div className={styles.tabListWrap}>
						<ul
							className={`
								${styles.tabList}
								flex-space-around
								align-items-center
							`}
						>
							{headerTabList.map(element => element.state ? (
								<li
									key={element.name}
									className={styles.headerTab}
									onClick={() => linkTo(element.url, element.state)}
								>
									{element.name}
								</li>
							) : (
								<li
									key={element.name}
									className={styles.headerTab}
								>
									<a
										href={element.url}
										className={styles.headerTabLink}
									>
										{element.name}
									</a>
								</li>
							))}
						</ul>
					</div>
				{/*** Header Tab List -- end -- ***/}

			</div>
		</header>
	)
}
export default Header
