import Link from 'next/link'
import Styles from '../styles/modules/aside.module.scss'

const Aside = ({info, state}) => {
	return (
		<aside className="contents-aside">

			{/*** セクションタイトル -- start -- ***/}
				<h1 className={Styles.sectionTitle}>
					{info.map(item => {
						return (
							state.MenuTab === item.State && item.FW
						)
					})}
					{state.MenuTab === "top" && "Portfolio List"}
				</h1>
			{/*** セクションタイトル -- end -- ***/}

			{/*** 表示方法ウィンドウ -- start -- ***/
				// Top画面でのみ表示
				state.MenuTab === "top" && (
					<div className="alert">
						表示方法

						<ul className="list-box">
							<li className="li">
								ヘッダータブのいずれかを選択
								<p className="li-note">
									→このエリアに対象のFW一覧を表示
								</p>
							</li>
						</ul>

						<ul className="list-box">
							<li className="li">
								スクロールのイメージ画像をクリック
								<p className="li-note">
									→このエリアに対象のFW一覧を表示
								</p>
								<p className="li-note">
									→ポートフォリオ作成概要エリアに対象のサイト概要を表示
								</p>
							</li>
						</ul>

					</div>
				)
			/*** 表示方法ウィンドウ -- end -- ***/}

			{/*** 作成サイトリスト -- start -- ***/}
				<ul>
					{info.map(FWList => {
							return (
								<React.Fragment
									key={`sidelist${FWList.State}`}
								>
									{FWList.State === state.MenuTab && (
										FWList.Page.map(PageList => {
											return (
												<Link
													href={PageList.URL}
													key={`pagelist${PageList.URL}`}
												>
													<li
														className={`
															${Styles.list}
															flex-start
															align-items-center
														`}
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
																	{PageList.Title}
																</span>
															</span>
														</span>
													</li>
												</Link>
											);
										})
									)}
								</React.Fragment>
							);
						})}
				</ul>
			{/*** 作成サイトリスト -- end -- ***/}

		</aside>
	);
}
export default Aside
