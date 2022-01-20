import $ from '../components/page-bundle'

const Home = ({ $siteData, $category }): JSX.Element => {

	const { SITE_TITLE, SITE_IMAGE } = $siteData
	const { HOME } = $category

	const customStyle: Record<string, Record<string, string>> = {
		p: {
			textAlign: 'center',
		},
		image: {
			maxWidth: '400px',
			textAlign: 'center',
			width: '100%',
		},
	}

	return (
		<$.Page
			categoryState={HOME.STATE}
			pageName={HOME.NAME}
		>
			<$.BaseSection>
				<$.H1>
					{SITE_TITLE}
				</$.H1>
			</$.BaseSection>

			<$.ContentSection>
				<$.P style={customStyle.p}>
					<img
						src={SITE_IMAGE.SRC}
						alt={SITE_IMAGE.ALT}
						style={customStyle.image}
					/>
				</$.P>
			</$.ContentSection>
		</$.Page>
	)
}
export default Home
