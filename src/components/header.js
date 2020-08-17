import Link from 'next/link';

const Header = ({func, info, state}) => {
	return(
		<header className="header-area" style={{backgroundImage: 'url(watermark.jpg)', backgroundSize: "contain"}}>
			<div className="header-area-wrapper">
				<ul className="top-list flex-space-between">
					<Link href="/">
						<li className="top-logo flex-space-between align-items-center" onClick={func}>
							<img className="logo" src="/github-logo.png"/>
							<span>Portfolio Show</span>
						</li>
					</Link>
					{
						info.map(items => {
							if (state.MenuTab === items.State) {
								return(
									<Link href={`${items.URL}#top`}>
										<li className="top-back">
											⬆︎Top
										</li>
									</Link>
								);
							}
						})
					}
				</ul>
				<ul className="tab-list flex-space-around align-items-center">
				{
					info.map(FWList => {
						if (state.MenuTab === FWList.State) {
							return (
								<li
									onClick={FWList.Func}
									id={FWList.State}
									className={`tab tab-${FWList.State} tab-selected`}
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
									className={`tab tab-${FWList.State}`}
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
