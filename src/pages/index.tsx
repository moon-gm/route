import $ from '../components/page-bundle'

const Home = ({ $meta, $category }): JSX.Element => {

	const { siteTitle, siteImage } = $meta
	const { home } = $category

	const customStyles: Record<string, Record<string, string>> = {
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
			categoryState={home.state}
			pageName={home.name}
		>
			<$.BaseSection>
				<$.H1>
					{siteTitle}
				</$.H1>
			</$.BaseSection>

			<$.ContentSection>
				<$.P style={customStyles.p}>
					<img
						src={siteImage.src}
						alt={siteImage.alt}
						style={customStyles.image}
					/>
				</$.P>
			</$.ContentSection>
		</$.Page>
	)
}
export default Home
