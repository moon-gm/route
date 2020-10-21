import Link from 'next/link';
import css from '../styles/modules/header.module.scss'

const Header = ({prop}) => {

	// Topに戻るボタンの処理
	function scrollToTop() {
		window.scrollTo(0, 0);
	}

	return(
		<header className="header-area">
			<div className="header-area-wrap">

				{/*** トップリスト -- start -- ***/}
					<ul className={`${css.topList} flex-space-between`}>

						{/** トップロゴ　-- start -- **/}
							<Link href="/">
								<li
									onClick={prop.f.showTop}
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
								⬆︎Top
							</li>
						{/** トップボタン　-- end -- **/}

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
									onClick={prop.f.showTop}
									className={css.headerTab}
								>
									Profile
								</li>
							</Link>
							<Link href={prop.info[prop.fw.React].Page[prop.pg.ReactLearning].URL}>
								<li
									onClick={prop.f.showProduction}
									className={css.headerTab}
								>
									Production
								</li>
							</Link>
						</ul>
					</div>
				{/*** ヘッダータブリスト -- end -- ***/}

			</div>
		</header>
	);
}
export default Header
