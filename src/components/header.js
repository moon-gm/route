import Link from 'next/link';
// 「Styles」は「Styles.headerTabSelected」をjQueryで使うため、_app.jsでimportしている

const Header = ({info, state, topPage, productionPage, sideListShow, Styles}) => {

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
							${Styles.topList}
							flex-space-between
						`}
					>

						{/** トップロゴ　-- start -- **/}
							<Link href="/">
								<li
									className={`
										${Styles.topLogo}
										flex-space-between
										align-items-center
									`}
									onClick={topPage}
								>
									<img
										src="/github-logo.png"
										className={Styles.topLogoImg}
									/>
									<span>Portfolio Show</span>
								</li>
							</Link>
						{/** トップロゴ　-- end -- **/}

						{/** トップボタン　-- start -- **/}
							<li
								className={Styles.topBtn}
								onClick={scrollToTop}
							>
								⬆︎Top
							</li>
						{/** トップボタン　-- end -- **/}

						{/** サイドメニュー表示ボタン　-- start -- **/}
						{state.MenuTab !== "top" && (
							<li
								className={Styles.menuBtn}
								onClick={sideListShow}
							>
								{state.sideList ? "close" : "≡"}
							</li>
						)}
						{/** サイドメニュー表示ボタン　-- end -- **/}

					</ul>
				{/*** トップリスト -- end -- ***/}

				{/*** ヘッダータブリスト -- start -- ***/}
					<div className={Styles.tabList}>
						<ul
							className={`
								${Styles.tabListWrap}
								flex-space-around
								align-items-center
							`}
						>
							<Link href="/">
								<li
									className={`
									${Styles.headerTab}
									`}
									onClick={topPage}
								>
									Profile
								</li>
							</Link>
							<Link href="/reactjs/react-learning">
								<li
									className={`
									${Styles.headerTab}
									`}
									onClick={productionPage}
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
