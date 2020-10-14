import Link from 'next/link';
import styles from '../styles/modules/mainVisual.module.scss'
import SwipeableViews from "react-swipeable-views";

const MainVisual = ({info, state, func, fw, pg}) => {

	// スクロールする画像の順序設定
	const scrollItems = [
		// 各FW代表ページ
		info[fw.React].Page[pg.ReactLearning], // index: 0
		info[fw.Next].Page[pg.PortfolioShow], // index: 1
		info[fw.Gatsby].Page[pg.AtelierK], // index: 2
		info[fw.Laravel].Page[pg.Tequipedia], // index: 3

		// 追加ページ
		info[fw.Next].Page[pg.NextLearning], // index: 4
		info[fw.Gatsby].Page[pg.GatsbyLearning], // index: 5
		info[fw.Next].Page[pg.NationalFlags], // index: 6
	];

	return (
		<>

			{/*** メインビジュアル画像 -- start -- ***/}
				<img
					src="/film-rail-real.png"
					className={styles.mainVisualImage}
				/>
			{/*** メインビジュアル画像 -- end -- ***/}

			{/*** メインビジュアルエリア -- start -- ***/}
				<div className="main-visual-area">
					<div className="main-visual-area-wrap">
						<ul
							className={`
								${styles.scrollArea}
								flex-space-around
								align-items-center
							`}
						>

							{/** スクロールボタン（<） -- start -- **/}
								<li
									className={`
										${styles.scrollBtn}
										${styles.scrollPrev}
										hide-sp
									`}
									onClick={func.onPrevBtn}
								>
									{/* :afterで「<」を設定 */}
									<span className={styles.messagePrev}>
										左にスクロールします
									</span>
								</li>
							{/** スクロールボタン（<） -- end -- **/}

							{/** スクロールエリア -- start -- **/}
								<SwipeableViews
									enableMouseEvents
									resistance
									index={state.index}
								>
									{scrollItems.map(scrollItem => {
										return (
											<li
												className={`
													${styles.scrollItem}
													flex-space-around
													align-items-center
												`}
												key={scrollItem.ID}
											>
												<Link href={scrollItem.URL}>
													<img
														src={`/${scrollItem.ID}.png`}
														className={`
															${styles.scrollImg}
															${styles.toLeft}
															${state.pageSelected === scrollItem.State && styles.scrollImgSelected}
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
										${styles.scrollBtn}
										${styles.scrollNext}
										hide-sp
									`}
									onClick={func.onNextBtn}
								>
									{/* :afterで「>」を設定 */}
									<span className={styles.messageNext}>
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
export default MainVisual
