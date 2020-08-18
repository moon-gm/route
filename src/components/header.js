import Link from 'next/link';
// 「Styles」は「Styles.headerTabSelected」をjQueryで使うため、_app.jsでimportしている

const Header = ({info, state, func, Styles}) => {
	return(
		<header
			className="header-area"
			style={{
				backgroundImage: 'url(watermark.jpg)',
				backgroundSize: "contain"
			}}
		>
			<div className="header-area-wrap">

				{/*** トップリスト -- start -- ***/}
					<ul className={`${Styles.topList} flex-space-between`}>

						{/** トップロゴ　-- start -- **/}
							<Link href="/">
								<li
									className={`${Styles.topLogo} flex-space-between align-items-center`}
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

						{/** トップボタン　-- start -- **/
							info.map(items => {
								if (state.MenuTab === items.State) {
									return(
										<Link href={`${items.URL}#top`}>
											<li className={Styles.topBtn}>
												⬆︎Top
											</li>
										</Link>
									);
								}
							})
						/** トップボタン　-- end -- **/}

					</ul>
				{/*** トップリスト -- end -- ***/}

				{/*** ヘッダータブリスト -- start -- ***/}
					<ul className={`${Styles.tabList} flex-space-around align-items-center`}>
						{info.map(FWList => {

							// 選択されているタブの場合
							if (state.MenuTab === FWList.State) {
								return (
									<li
										id={FWList.State}
										className={`${Styles.headerTab} ${Styles.headerTabSelected} tab-${FWList.State}`}
										key={`tablist${FWList.State}`}
										onClick={FWList.Func}
									>
										{FWList.FW}
									</li>
								);
							}

							// 選択されていないタブの場合
							else {
								return (
									<li
										id={FWList.State}
										className={`${Styles.headerTab} tab-${FWList.State}`}
										key={`tablist${FWList.State}`}
										onClick={FWList.Func}
									>
										{FWList.FW}
									</li>
								);
							}

						})}
					</ul>
				{/*** ヘッダータブリスト -- end -- ***/}

			</div>
		</header>
	);
}
export default Header
