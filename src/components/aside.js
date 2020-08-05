import Link from 'next/link'

const Aside = ({info, state}) => {
	return (
		<aside className="contents-aside">
			<h1>
				作成サイト一覧
			</h1>
			<p>
				上記ヘッダータブを選択すると、以下に対象のフレームワークで作成したサイトリストが表示される
			</p>
			<p>
				⬇︎ ⬇︎ ⬇︎ ⬇︎
			</p>
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
													<li>
															{PageList.Title}
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
