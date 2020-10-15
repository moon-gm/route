import Link from 'next/link'
import styles from '../styles/modules/aside.module.scss'

const Aside = ({data}) => {
	return (
		<aside className="contents-aside">

			{/*** セクションタイトル -- start -- ***/}
					{data.info.map(item => {
						return (
							<React.Fragment key={`sidelist${item.State}`}>

								{/** FWタイトル -- start -- **/}
									<h1 className={`
										${styles.sectionTitle}
										${data.state.selectedFW === item.State && styles.sectionTitleChecked}
									`}>
										<img
											src={item.Img}
											alt="icon"
											className={styles.sectionTitleImg}
										/>
										{item.FW}
									</h1>
								{/** FWタイトル -- start -- **/}

								{/** 作成サイトリスト -- start -- **/}
									<ul>
										{item.Page.map(page => {
											return (
												<React.Fragment key={`sidelistItem${page.ID}`}>
													<Link
														href={page.URL}
														key={`pagelist${page.URL}`}
													>
														<li
															className={`
																${styles.list}
																${data.state.selectedPage === page.State && styles.listSelected}
																flex-start
																align-items-center
															`}
															onClick={page.Func}
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
																		{page.Title}<br/>
																		{page.CreateDate} 〜
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
