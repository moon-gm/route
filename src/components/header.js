import Link from 'next/link';
import state from '../data/state.json'
import css from '../styles/modules/header.module.scss'

const Header = ({prop}) => {

	// Topに戻るボタンの処理
	function scrollToTop() {
		window.scrollTo(0, 0)
	}
	// メニューボタンの処理
	function showSideArea() {
		document.getElementById('contents-aside').style.left = "0"
	}

	return(
		<header className="header-area">
			<div className="header-area-wrap">

				{/*** トップリスト -- start -- ***/}
					<ul className={`${css.topList} flex-space-between`}>

						{/** トップロゴ　-- start -- **/}
							<Link href="/">
								<li
									onClick={() => prop.f.changeFW(state.selFW.Profile, 0)}
									className={`
										${css.topLogo}
										flex-space-between
										align-items-center
									`}
								>
									<img
										src="/github-logo.png"
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
								<img src="/top.svg" alt="トップに戻るアイコン"/>
							</li>
						{/** トップボタン　-- end -- **/}

						{/** メニューボタン -- start -- **/}
							{!prop.if.isProfile && (
								<li
									onClick={showSideArea}
									className={css.menuBtn}
								>
									<img src="/menu.svg" alt="メニューアイコン"/>
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
									onClick={() => prop.f.changeFW(state.selFW.Profile, 0)}
									className={css.headerTab}
								>
									Profile
								</li>
							</Link>
							{/* スワイパーの問題でaタグにして一度最初から読み込ませる */}
							<a
								href={prop.info[prop.fw.Next].Page[prop.pg.NationalFlags].URL}
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
