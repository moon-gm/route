import Link from 'next/link';

const Header = ({func}) => {
	return(
		<header className="header-area">
			<ul className="flex-space-between">
				<Link href="/">
					<li onClick={func}>
						Portfolio List
					</li>
				</Link>
				<Link href="#top">
					<li>
						↑Top
					</li>
				</Link>
			</ul>
		</header>
	);
}
export default Header
