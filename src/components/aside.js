import Link from 'next/link'
import Styles from '../styles/modules/aside.module.scss'

const Aside = ({info, state}) => {
	return (
		<aside className="contents-aside">

			{/*** セクションタイトル -- start -- ***/}
					{info.map(item => {
						return (
							<React.Fragment
								key={`sidelist${item.State}`}
							>
								{state.MenuTab === item.State ? (
									<h1 className={`${Styles.sectionTitle} ${Styles.sectionTitleChecked}`}>
										{item.FW}
									</h1>

								):(
									<h1 className={Styles.sectionTitle}>
										{item.FW}
									</h1>
								)}
								{/** 作成サイトリスト -- start -- **/}
									<ul>
										{item.Page.map(page => {
												return (
													<React.Fragment
														key={`sidelistItem${page.ID}`}
													>
														<Link
															href={page.URL}
															key={`pagelist${page.URL}`}
														>
															<li
																className={`
																	${Styles.list}
																	flex-start
																	align-items-center
																`}
																onClick={page.Func}
															>
																<img
																	src="/projector-icon.svg"
																	className={Styles.icon}
																/>
																<img
																	src="/film-rail.png"
																	className={Styles.additionalIcon}
																/>
																<span className={Styles.listText}>
																	<span className={Styles.middleWrap}>
																		<span className={Styles.innerWrap}>
																			{page.Title}
																		</span>
																	</span>
																</span>
															</li>
														</Link>
													</React.Fragment>
												);
											})}
									</ul>
								{/** 作成サイトリスト -- end -- **/}
							</React.Fragment>
						)
					})}
			{/*** セクションタイトル -- end -- ***/}


		</aside>
	);
}
export default Aside
