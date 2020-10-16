import Link from 'next/link'
import styles from '../styles/modules/aside.module.scss'

const Aside = ({data}) => {
	return (
		<aside className="contents-aside">

			{/*** セクションタイトル -- start -- ***/}
					{data.info.map(fw => {
						return (
							<React.Fragment key={`sidelist${fw.State}`}>

								{/** FWタイトル -- start -- **/}
									<h1 className={`
										${styles.sectionTitle}
										${data.state.selectedFW === fw.State && styles.sectionTitleChecked}
									`}>
										<img
											src={fw.Img}
											alt="icon"
											className={styles.sectionTitleImg}
										/>
										{fw.FW}
									</h1>
								{/** FWタイトル -- start -- **/}

								{/** 作成サイトリスト -- start -- **/}
									<ul>
										{fw.Page.map(pg => {
											return (
												<React.Fragment key={`sidelistItem${pg.ID}`}>
													<Link
														href={pg.URL}
														key={`pagelist${pg.URL}`}
													>
														<li
															className={`
																${styles.list}
																${data.state.selectedPage === pg.State && styles.listSelected}
																flex-start
																align-items-center
															`}
															onClick={pg.Func}
														>
															<img
																src="/projector-icon.svg"
																className={styles.icon}
															/>
															<img
																src="/film-rail.png"
																className={styles.additionalIcon}
															/>
															<span className={styles.listText}>
																<span className={styles.middleWrap}>
																	<span className={styles.innerWrap}>
																		{pg.Title}<br/>
																		{pg.CreateDate} 〜
																	</span>
																</span>
															</span>
														</li>
													</Link>
												</React.Fragment>
											)
										})}
									</ul>
								{/** 作成サイトリスト -- end -- **/}
							</React.Fragment>
						)
					})}
			{/*** セクションタイトル -- end -- ***/}

		</aside>
	)
}
export default Aside
