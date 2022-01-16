import $ from '../components/page-bundle'

const Home = ({ $state, $siteData, $category }): JSX.Element => {

	const { SITE_TITLE, SITE_IMAGE } = $siteData
	const { HOME } = $category

	return (
		<$.Page
			state={$state}
			categoryState={HOME.STATE}
			pageName={HOME.NAME}
			siteTitle={SITE_TITLE}
		>
			<$.BaseSection>
				<$.H1>
					{SITE_TITLE}
				</$.H1>
			</$.BaseSection>

			<$.ContentSection>
				<$.P style={{textAlign: 'center'}}>
					<img
						src={SITE_IMAGE.SRC}
						alt={SITE_IMAGE.ALT}
						style={{maxWidth: '400px', textAlign: 'center', width: '100%'}}
					/>
				</$.P>
			</$.ContentSection>
		</$.Page>
	)
}
export default Home
