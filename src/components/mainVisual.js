import Link from 'next/link';
import styles from '../styles/modules/mainVisual.module.scss'
import SwipeableViews from "react-swipeable-views";

const MainVisual = ({data}) => {

	// スクロールする画像の順序設定
	const scrollItems = [
		// 各FW代表ページ
		data.info[data.fw.React].Page[data.pg.ReactLearning], // imgIndex: 0
		data.info[data.fw.Next].Page[data.pg.PortfolioShow], // imgIndex: 1
		data.info[data.fw.Gatsby].Page[data.pg.AtelierK], // imgIndex: 2
		data.info[data.fw.Laravel].Page[data.pg.Tequipedia], // imgIndex: 3

		// 追加ページ
		data.info[data.fw.Next].Page[data.pg.NextLearning], // imgIndex: 4
		data.info[data.fw.Gatsby].Page[data.pg.GatsbyLearning], // imgIndex: 5
		data.info[data.fw.Next].Page[data.pg.NationalFlags], // imgIndex: 6
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
									onClick={data.func.onPrevBtn}
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
									index={data.state.imgIndex}
								>
									{scrollItems.map(pg => {
										return (
											<li
												className={`
													${styles.scrollItem}
													flex-space-around
													align-items-center
												`}
												key={pg.ID}
											>
												<Link href={pg.URL}>
													<img
														src={`/${pg.ID}.png`}
														onClick={pg.Func}
														className={`
															${styles.scrollImg}
															${styles.toLeft}
															${data.state.selectedPage === pg.State && styles.scrollImgSelected}
														`}
													/>
												</Link>
											</li>
										);
									})}
								</SwipeableViews>
							{/** スクロールエリア -- end -- **/}

							{/** スクロールボタン（>） -- start -- **/}
								<li
									onClick={data.func.onNextBtn}
									className={`
										${styles.scrollBtn}
										${styles.scrollNext}
										hide-sp
									`}
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
