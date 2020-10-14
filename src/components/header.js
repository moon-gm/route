import Link from 'next/link';
// 「styles」は「styles.headerTabSelected」をjQueryで使うため、_app.jsでimportしている

const Header = ({info, state, showTop, showProduction, sideListShow, styles}) => {

	// Topに戻るボタンの処理
	function scrollToTop() {
		window.scrollTo(0, 0);
	}

	return(
		<header
			className="header-area"
		>
			<div className="header-area-wrap">

				{/*** トップリスト -- start -- ***/}
					<ul
						className={`
							${styles.topList}
							flex-space-between
						`}
					>

						{/** トップロゴ　-- start -- **/}
							<Link href="/">
								<li
									className={`
										${styles.topLogo}
										flex-space-between
										align-items-center
									`}
									onClick={showTop}
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
								className={styles.topBtn}
								onClick={scrollToTop}
							>
								⬆︎Top
							</li>
						{/** トップボタン　-- end -- **/}

						{/** サイドメニュー表示ボタン　-- start -- **/}
						{state.FWSelected !== "top" && (
							<li
								className={styles.menuBtn}
								onClick={sideListShow}
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
									className={`
									${styles.headerTab}
									`}
									onClick={showTop}
								>
									Profile
								</li>
							</Link>
							<Link href="/reactjs/react-learning">
								<li
									className={`
									${styles.headerTab}
									`}
									onClick={showProduction}
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
