import Link from 'next/link'

const Aside = ({info, state}) => {
	return (
		<aside className="contents-aside">
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
