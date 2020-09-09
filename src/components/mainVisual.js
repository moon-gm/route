import Link from 'next/link';
import Styles from '../styles/modules/mainVisual.module.scss'
import SwipeableViews from "react-swipeable-views";
// import { autoPlay } from 'react-swipeable-views-utils';

const Navigation = ({info, state, func}) => {

	// スクロールエリアのオート再生設定
	// const AutoScroll = autoPlay(SwipeableViews);

	// スクロールする画像の順序設定
	const scrollItems = [
		// 各FW代表ページ
		info[0].Page[0], // React.js index: 0
		info[1].Page[0], // Next.js index: 1
		info[2].Page[0], // Gatsby.js index: 2
		info[3].Page[0], // Laravel index: 3

		// 追加ページ
		info[1].Page[1], // Next.js index: 4
		info[2].Page[1], // Gatsby.js index: 5
		info[1].Page[2], // Next.js index: 6
	];

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
								<SwipeableViews
									enableMouseEvents
									resistance
									index={state.index}
									// direction="incremental"
									// interval={2500}
								>
									{scrollItems.map(scrollItem => {
										return (
											<li
												className={`
													${Styles.scrollItem}
													flex-space-around
													align-items-center
												`}
												key={scrollItem.ID}
											>
												<Link href={scrollItem.URL}>
													<img
														src={`/${scrollItem.ID}.png`}
														className={`
															${Styles.scrollImg}
															${Styles.toLeft}
															${state.pageNum === scrollItem.State && Styles.scrollImgSelected}
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
								</SwipeableViews>
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
