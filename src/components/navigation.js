import SwipeableViews from "react-swipeable-views";
import { autoPlay } from 'react-swipeable-views-utils';

const Navigation = ({info, state}) => {

	const AutoSwipe = autoPlay(SwipeableViews);

	return (
		<nav className="navigation-area">
			{/* 使用フレームワークごとのリスト */}
			<ul className="flex-space-around">
				{
					info.map(FWList => {
						return (
							<li
								onClick={FWList.Func}
								key={`tablist${FWList.State}`}
							>
								{FWList.FW}
							</li>
						);
					})
				}
			</ul>
			<ul className="swipe-area">
				<AutoSwipe
					enableMouseEvents
					index={state.index}
					direction="incremental"
					interval={1500}
				>
					<li>
						<img src="/react-learning.png" width="300px" height="auto"/>
					</li>
					<li>
						<img src="/next-learning.png" width="300px" height="auto"/>
					</li>
					<li>
						<img src="/gatsby-learning.png" width="300px" height="auto"/>
						<img src="/atelier-k.png" width="300px" height="auto"/>
					</li>
					<li>
						<img src="/tequipedia.png" width="300px" height="auto"/>
					</li>
				</AutoSwipe>
			</ul>
		</nav>
	);
}
export default Navigation
