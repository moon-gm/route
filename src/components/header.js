import Link from 'next/link';
// 「Styles」は「Styles.headerTabSelected」をjQueryで使うため、_app.jsでimportしている

const Header = ({info, state, func, Styles}) => {

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
									onClick={func}
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
									onClick={func}
								>
									Profile
								</li>
							</Link>
							<li
								className={`
								${Styles.headerTab}
								${Styles.headerTabWithList}
								`}
							>
								Production
								<ul className={Styles.headerPullDownList}>
									{info.map(FWList => {

										// 選択されているタブの場合
										if (state.MenuTab === FWList.State) {
											return (
												<Link
													href={FWList.Page[0].URL}
													key={`tablist${FWList.State}`}
												>
													<li
														id={FWList.State}
														className={`
															${Styles.headerPullDownBtn}
															${Styles.headerTabSelected}
															tab-${FWList.State}
														`}
														onClick={FWList.Func}
													>
														{FWList.FW}
													</li>
												</Link>
											);
										}

										// 選択されていないタブの場合
										else {
											return (
												<Link
													href={FWList.Page[0].URL}
													key={`tablist${FWList.State}`}
												>
													<li
														id={FWList.State}
														className={`
															${Styles.headerPullDownBtn}
															tab-${FWList.State}
														`}
														onClick={FWList.Func}
													>
														{FWList.FW}
													</li>
												</Link>
											);
										}

									})}
								</ul>
							</li>
						</ul>
					</div>
				{/*** ヘッダータブリスト -- end -- ***/}

			</div>
		</header>
	);
}
export default Header
