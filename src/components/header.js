import Link from 'next/link';

const Header = ({func, info}) => {
	return(
		<header className="header-area">
			<div className="header-area-wrapper">
				<ul className="top-list flex-space-between">
					<Link href="/">
						<li className="flex-space-between align-items-center" onClick={func}>
							<img className="logo" src="/github-logo.png"/>
							<span>Portfolio List</span>
						</li>
					</Link>
					<Link href="#top">
						<li>
							⬆︎Top
						</li>
					</Link>
				</ul>
				<ul className="tab-list flex-space-around">
				{
					info.map(FWList => {
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
					})
				}
			</ul>
			</div>
		</header>
	);
}
export default Header
