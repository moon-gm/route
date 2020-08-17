import Link from 'next/link'

const Aside = ({info, state}) => {
	return (
		<aside className="contents-aside">
			<h1 className="h1">
				作成サイト一覧
			</h1>
			{state.MenuTab === "top" && (
				<p className="alert">
					以下の動作で対象のFW一覧を表示<br/>
					<br/>
					・ヘッダータブのいずれかを選択<br/>
					・スクロールのイメージ画像をクリック
				</p>
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
