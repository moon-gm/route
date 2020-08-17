import Link from 'next/link'
import Styles from '../styles/modules/aside.module.scss'

const Aside = ({info, state}) => {
	return (
		<aside className="contents-aside">
			<h1 className={Styles.sectionTitle}>
				作成サイト一覧
			</h1>
			{state.MenuTab === "top" && (
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
								→このエリアに対象のFW一覧を表示し、ポートフォリオ作成概要エリアに対象のサイト概要を表示
							</p>
						</li>
					</ul>
				</div>
			)}
			<ul>
				{
					info.map(FWList => {
						return (
							<React.Fragment
								key={`sidelist${FWList.State}`}
							>
								{
									FWList.State === state.MenuTab && (
										FWList.Page.map(PageList => {
											return (
												<Link
													href={PageList.URL}
													key={`pagelist${PageList.URL}`}
												>
													<li className="list flex-start align-items-center">
															<img src="/projector-icon.svg" className="icon"/>
															<img src="/film-rail.png" className="additional-icon"/>
															<span className="list-text">
																<sapn className="middle-wrap">
																	<sapn className="inner-wrap">
																		{PageList.Title}
																	</sapn>
																</sapn>
															</span>
													</li>
												</Link>
											);
										})
									)
								}
							</React.Fragment>
						);
					})
				}
			</ul>
		</aside>
	);
}
export default Aside
