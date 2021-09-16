import Link from 'next/link';
import css from '../styles/modules/header.module.scss'

const Header = ({prop}) => {

	// Topに戻るボタンの処理
	function scrollToTop() { window.scrollTo(0, 0) }

	// メニューボタンの処理
	function showSideArea() { document.getElementById('contents-aside').style.left = "0" }

	return(
		<header className="header-area">
			<div className="header-area-wrap">

				{/*** トップリスト -- start -- ***/}
					<ul className={`${css.topList} flex-space-between`}>

						{/** トップロゴ　-- start -- **/}
							<Link href="/">
								<li
									onClick={() => prop.methods.updateScreen(prop.state.set.category.Profile)}
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
									<span>Portfolio Show</span>
								</li>
							</Link>
						{/** トップロゴ　-- end -- **/}

						{/** トップボタン　-- start -- **/}
							<li
								onClick={scrollToTop}
								className={css.topBtn}
							>
								<img src="/icon/top.svg" alt="トップに戻るアイコン"/>
							</li>
						{/** トップボタン　-- end -- **/}

						{/** メニューボタン -- start -- **/}
							{!prop.if.isProfile && (
								<li
									onClick={showSideArea}
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
							<Link href="/">
								<li
									onClick={() => prop.methods.updateScreen(prop.state.set.category.Profile)}
									className={css.headerTab}
								>
									Profile
								</li>
							</Link>
							{/* スワイパーの問題でaタグにして一度最初から読み込ませる */}
							<a
								href={prop.data[prop.order.framework.Laravel].Page[prop.order.website.Tequipedia].URL}
								className={css.headerTabLink}
							>
								<li className={css.headerTab}>
									Production
								</li>
							</a>
						</ul>
					</div>
				{/*** ヘッダータブリスト -- end -- ***/}

			</div>
		</header>
	);
}
export default Header
