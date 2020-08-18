import SwipeableViews from "react-swipeable-views";
import { autoPlay } from 'react-swipeable-views-utils';
import Link from 'next/link';
import Styles from '../styles/modules/navigation.module.scss'

const Navigation = ({info, state, func}) => {

	const AutoSwipe = autoPlay(SwipeableViews);

	return (
		<>
			<img src="/film-rail-real.png" className={Styles.mainVisualImage}/>
			<div className="navigation-area">
				<nav className="navigation-area-wrap">
					{/* 使用フレームワークごとのリスト */}
					<ul className={`${Styles.scrollArea} flex-space-around align-items-center`}>
						<li className={`${Styles.scrollBtn} ${Styles.scrollPrev} hide-sp`} onClick={func[0]}>
							{/* :afterで「<」を設定 */}
							<span className={Styles.messagePrev}>左にスクロールします</span>
						</li>
						<AutoSwipe
							enableMouseEvents
							resistance
							index={state.index}
							direction="incremental"
							interval={2500}
						>
							<li className={`${Styles.scrollItem} flex-space-around align-items-center`}>
								<Link href="/reactjs#react-learning">
									<img src="/react-learning.png" onClick={info[0].Func} className={`${Styles.scrollImg} ${state.imageDirection == "right" ? Styles.toLeft : state.imageDirection == "left" ? Styles.toRight : null}`}/>
								</Link>
							</li>
							<li className={`${Styles.scrollItem} flex-space-around align-items-center`}>
								<Link href="/nextjs#next-learning">
									<img src="/next-learning.png" onClick={info[1].Func} className={`${Styles.scrollImg} ${state.imageDirection == "right" ? Styles.toLeft : state.imageDirection == "left" ? Styles.toRight : null}`}/>
								</Link>
							</li>
							<li className={`${Styles.scrollItem} flex-space-around align-items-center`}>
								<Link href="/gatsbyjs#gatsby-learning">
									<img src="/gatsby-learning.png" onClick={info[2].Func} className={`${Styles.scrollImg} ${state.imageDirection == "right" ? Styles.toLeft : state.imageDirection == "left" ? Styles.toRight : null}`}/>
								</Link>
								<Link href="/gatsbyjs#atelier-k">
									<img src="/atelier-k.png" onClick={info[2].Func} className={`${Styles.scrollImg} hide-sp ${state.imageDirection == "right" ? Styles.toLeft : state.imageDirection == "left" ? Styles.toRight : null}`}/>
								</Link>
							</li>
							<li className={`${Styles.scrollItem} flex-space-around align-items-center`}>
								<Link href="/laravel#tequipedia">
									<img src="/tequipedia.png" onClick={info[3].Func} className={`${Styles.scrollImg} ${state.imageDirection == "right" ? Styles.toLeft : state.imageDirection == "left" ? Styles.toRight : null}`}/>
								</Link>
							</li>
						</AutoSwipe>
						<li className={`${Styles.scrollBtn} ${Styles.scrollNext} hide-sp`} onClick={func[1]}>
							{/* :afterで「>」を設定 */}
							<span className={Styles.messageNext}>右にスクロールします</span>
						</li>
					</ul>
				</nav>
			</div>
		</>
	);
}
export default Navigation
