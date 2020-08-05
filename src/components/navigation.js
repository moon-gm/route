import SwipeableViews from "react-swipeable-views";
import { autoPlay } from 'react-swipeable-views-utils';
import Link from 'next/link';

const Navigation = ({state, func}) => {

	const AutoSwipe = autoPlay(SwipeableViews);

	return (
		<div className="navigation-wrap">
			<nav className="navigation-area">
			{/* 使用フレームワークごとのリスト */}
			<ul className="swipe-area flex-space-around align-items-center">
				<li className="swipe-btn swipe-prev hide-sp" onClick={func[0]}>
					{/* :afterで「<」を設定 */}
				</li>
				<AutoSwipe
					enableMouseEvents
					resistance
					index={state.index}
					direction="incremental"
					interval={2500}
				>
					<li className="swipe-item flex-space-around align-items-center">
						<Link href="/reactjs#react-learning">
							<img src="/react-learning.png" className="swipe-img"/>
						</Link>
					</li>
					<li className="swipe-item flex-space-around align-items-center">
						<Link href="/nextjs#next-learning">
							<img src="/next-learning.png" className="swipe-img"/>
						</Link>
					</li>
					<li className="swipe-item flex-space-around align-items-center">
						<Link href="/gatsbyjs#gatsby-learning">
							<img src="/gatsby-learning.png" className="swipe-img"/>
						</Link>
						<Link href="/gatsbyjs#atelier-k">
							<img src="/atelier-k.png" className="swipe-img hide-sp"/>
						</Link>
					</li>
					<li className="swipe-item flex-space-around align-items-center">
						<Link href="/laravel#tequipedia">
							<img src="/tequipedia.png" className="swipe-img"/>
						</Link>
					</li>
				</AutoSwipe>
				<li className="swipe-btn swipe-next hide-sp" onClick={func[1]}>
					{/* :afterで「>」を設定 */}
				</li>
			</ul>
		</nav>
		</div>
	);
}
export default Navigation
