import Link from 'next/link';
import Styles from '../styles/modules/mainVisual.module.scss'
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from 'react-swipeable-views-utils';

const Navigation = ({info, state, func}) => {

	// スクロールエリアのオート再生設定
	const AutoScroll = autoPlay(SwipeableViews);

	return (
		<>

			{/*** メインビジュアル画像 -- start -- ***/}
				<img
					src="/film-rail-real.png"
					className={Styles.mainVisualImage}
				/>
			{/*** メインビジュアル画像 -- end -- ***/}

			{/*** メインビジュアルエリア -- start -- ***/}
				<div className="main-visual-area">
					<div className="main-visual-area-wrap">
						<ul
							className={`
								${Styles.scrollArea}
								flex-space-around
								align-items-center
							`}
						>

							{/** スクロールボタン（<） -- start -- **/}
								<li
									className={`
										${Styles.scrollBtn}
										${Styles.scrollPrev}
										hide-sp
									`}
									onClick={func[0]}
								>
									{/* :afterで「<」を設定 */}
									<span className={Styles.messagePrev}>
										左にスクロールします
									</span>
								</li>
							{/** スクロールボタン（<） -- end -- **/}

							{/** スクロールエリア -- start -- **/}
								<AutoScroll
									enableMouseEvents
									resistance
									index={state.index}
									direction="incremental"
									interval={2500}
								>
									{info.map(scrollItem => {
										return (
											<li
												className={`
													${Styles.scrollItem}
													flex-space-around
													align-items-center
												`}
												key={scrollItem.Page[0].ID}
											>
												<Link href={scrollItem.Page[0].URL}>
													<img
														src={`/${scrollItem.Page[0].ID}.png`}
														className={`
															${Styles.scrollImg}
															${Styles.toLeft}
															${
																state.imageDirection == "right" ? Styles.toLeft
																:
																state.imageDirection == "left" ? Styles.toRight
																:
																null
															}
														`}
														onClick={scrollItem.Func}
													/>
												</Link>
											</li>
										);
									})}
								</AutoScroll>
							{/** スクロールエリア -- end -- **/}

							{/** スクロールボタン（>） -- start -- **/}
								<li
									className={`
										${Styles.scrollBtn}
										${Styles.scrollNext}
										hide-sp
									`}
									onClick={func[1]}
								>
									{/* :afterで「>」を設定 */}
									<span className={Styles.messageNext}>
										右にスクロールします
									</span>
								</li>
							{/** スクロールボタン（>） -- end -- **/}

						</ul>
					</div>
				</div>
			{/*** メインビジュアルエリア -- end -- ***/}
		</>
	);
}
export default Navigation
