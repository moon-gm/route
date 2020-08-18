import Link from 'next/link';
// 「Styles」は「Styles.headerTabSelected」をjQueryで使うため、_app.jsでimportしている

const Header = ({func, info, state, Styles}) => {
	return(
		<header className="header-area" style={{backgroundImage: 'url(watermark.jpg)', backgroundSize: "contain"}}>
			<div className="header-area-wrap">
				<ul className={`${Styles.topList} flex-space-between`}>
					<Link href="/">
						<li className={`${Styles.topLogo} flex-space-between align-items-center`} onClick={func}>
							<img className={Styles.topLogoImg} src="/github-logo.png"/>
							<span>Portfolio Show</span>
						</li>
					</Link>
					{
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
					}
				</ul>
				<ul className={`${Styles.tabList} flex-space-around align-items-center`}>
				{
					info.map(FWList => {
						if (state.MenuTab === FWList.State) {
							return (
								<li
									onClick={FWList.Func}
									id={FWList.State}
									className={`${Styles.headerTab} ${Styles.headerTabSelected} tab-${FWList.State}`}
									key={`tablist${FWList.State}`}
								>
									{FWList.FW}
								</li>
							);
						} else {
							return (
								<li
									onClick={FWList.Func}
									id={FWList.State}
									className={`${Styles.headerTab} tab-${FWList.State}`}
									key={`tablist${FWList.State}`}
								>
									{FWList.FW}
								</li>
							);
						}
					})
				}
			</ul>
			</div>
		</header>
	);
}
export default Header
