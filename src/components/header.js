import css from '../styles/modules/header.module.scss'

const Header = ({prop}) => {
	return (
		<header className="header-area">
			<div className="header-area-wrap">

				{/*** トップリスト -- start -- ***/}
					<ul className={`${css.topList} flex-space-between`}>

						{/** トップロゴ　-- start -- **/}
							<li
								onClick={() => prop.methods.linkTo(prop.category.PROFILE.URL, prop.state.set.category.profile)}
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
								<span>{prop.siteTitle}</span>
							</li>
						{/** トップロゴ　-- end -- **/}

						{/** トップボタン　-- start -- **/}
							<li
								onClick={() => prop.methods.scrollToTop()}
								className={css.topBtn}
							>
								<img src="/icon/top.svg" alt="トップに戻るアイコン"/>
							</li>
						{/** トップボタン　-- end -- **/}

						{/** メニューボタン -- start -- **/}
							{prop.if.isProduction && (
								<li
									onClick={() => prop.methods.showSideAreaSP(true)}
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
								onClick={() => prop.methods.linkTo(prop.category.PROFILE.URL, prop.state.set.category.profile)}
								className={css.headerTab}
							>
								{prop.category.PROFILE.NAME}
							</li>
							{/* Swiperの問題でaタグでリンクして１から表示させる */}
							<a
								href={prop.dataset[prop.order.framework.Laravel].Page[prop.order.website.Tequipedia].URL}
								className={css.headerTabLink}
							>
								<li className={css.headerTab}>
									{prop.category.PRODUCTION.NAME}
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
