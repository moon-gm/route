import Link from 'next/link';
// 「styles」は「styles.headerTabSelected」をjQueryで使うため、_app.jsでimportしている

const Header = ({info, state, func, fw, pg, styles}) => {

	// Topに戻るボタンの処理
	function scrollToTop() {
		window.scrollTo(0, 0);
	}

	return(
		<header className="header-area">
			<div className="header-area-wrap">

				{/*** トップリスト -- start -- ***/}
					<ul className={`${styles.topList} flex-space-between`}>

						{/** トップロゴ　-- start -- **/}
							<Link href="/">
								<li
									onClick={func.showTop}
									className={`
										${styles.topLogo}
										flex-space-between
										align-items-center
									`}
								>
									<img
										src="/github-logo.png"
										className={styles.topLogoImg}
									/>
									<span>Portfolio Show</span>
								</li>
							</Link>
						{/** トップロゴ　-- end -- **/}

						{/** トップボタン　-- start -- **/}
							<li
								onClick={scrollToTop}
								className={styles.topBtn}
							>
								⬆︎Top
							</li>
						{/** トップボタン　-- end -- **/}

						{/** サイドメニュー表示ボタン　-- start -- **/}
						{state.FWSelected !== "top" && (
							<li
								onClick={func.sideListShow}
								className={styles.menuBtn}
							>
								{state.sideList ? "×" : "≡"}
							</li>
						)}
						{/** サイドメニュー表示ボタン　-- end -- **/}

					</ul>
				{/*** トップリスト -- end -- ***/}

				{/*** ヘッダータブリスト -- start -- ***/}
					<div className={styles.tabList}>
						<ul
							className={`
								${styles.tabListWrap}
								flex-space-around
								align-items-center
							`}
						>
							<Link href="/">
								<li
									onClick={func.showTop}
									className={styles.headerTab}
								>
									Profile
								</li>
							</Link>
							<Link href={info[fw.React].Page[pg.ReactLearning].URL}>
								<li
									onClick={func.showProduction}
									className={styles.headerTab}
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
