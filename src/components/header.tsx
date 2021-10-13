import css from '../styles/modules/header.module.scss'

const Header = ({ prop }): JSX.Element => {

	// propから使うものを抽出
	const { siteTitle, judgments, order, category, methods } = prop
	const { linkTo, scrollToTop, showSideAreaSP } = methods
	const { HOME, PROFILE, PRODUCTION } = category
	const { framework, website } = order
	const { isProduction } = judgments

	return (
		<header className="header-area">
			<div className="header-area-wrap">

				{/*** トップリスト -- start -- ***/}
					<ul className={`${css.topList} flex-space-between`}>

						{/** トップロゴ　-- start -- **/}
							<li
								onClick={() => linkTo(HOME.URL, HOME.STATE)}
								className={`
									${css.topLogo}
									flex-space-between
									align-items-center
								`}
							>
								<img
									src="/logo/top-logo.png"
									className={css.topLogoImg}
								/>
								<span>{siteTitle}</span>
							</li>
						{/** トップロゴ　-- end -- **/}

						{/** トップボタン　-- start -- **/}
							<li
								onClick={() => scrollToTop()}
								className={css.topBtn}
							>
								<img src="/icon/top.svg" alt="トップに戻るアイコン"/>
							</li>
						{/** トップボタン　-- end -- **/}

						{/** メニューボタン -- start -- **/}
							{isProduction && (
								<li
									onClick={() => showSideAreaSP(true)}
									className={css.menuBtn}
								>
									<img src="/icon/menu.svg" alt="メニューアイコン"/>
								</li>
							)}
						{/** メニューボタン -- end -- **/}

					</ul>
				{/*** トップリスト -- end -- ***/}

				{/*** ヘッダータブリスト -- start -- ***/}
					<div className={css.tabList}>
						<ul
							className={`
								${css.tabListWrap}
								flex-space-around
								align-items-center
							`}
						>
							<li
								onClick={() => linkTo(PROFILE.URL, PROFILE.STATE)}
								className={css.headerTab}
							>
								{PROFILE.NAME}
							</li>
							{/* Swiperの問題でaタグでリンクして１から表示させる */}
							<a
								href={PRODUCTION.DATASET[framework.Nuxt].PAGES[website.Tequipedia2].URL}
								className={css.headerTabLink}
							>
								<li className={css.headerTab}>
									{PRODUCTION.NAME}
								</li>
							</a>
						</ul>
					</div>
				{/*** ヘッダータブリスト -- end -- ***/}

			</div>
		</header>
	)
}
export default Header
