import { Fragment } from 'react'
import { useRouter } from 'next/router'
import $ from '../../../components/page-bundle'
import Modal from '../../../components/modal'
import Loading from '../../../components/loading'
import { productionOrder, baseData, sectionData, setContentToOrigin, ProductionPage, ProductionBaseData, ProductionSectionData, Framework, Website, Skill } from '../../../config/production-data'

const Production = ({ $category, $judgments }): JSX.Element => {

	const { production } = $category
	const { isSP } = $judgments

	// get parameter from URL
	const router = useRouter()
	const { framework, website } = router.query

	const sectionIds = {
		description: sectionData[0].id,
		howToMake: sectionData[1].id,
		skill: sectionData[2].id,
		image: sectionData[3].id,
	}

	const label = {
		github: 'Github'
	}

	// create page data
	let pageData: ProductionPage
	if (framework && website) {
		const frameworkData: Framework = production.dataSet[productionOrder.framework[framework as string]]
		const websiteData: Website = frameworkData.pages[productionOrder.website[website as string]]
		pageData = {
			framework: frameworkData.name,
			title: websiteData.name,
			image: websiteData.imageSrc,
			summary: websiteData.summary,
			baseData: setContentToOrigin<ProductionBaseData>(baseData, {
				createDate: { content: websiteData.createDate },
				updateDate: { content: websiteData.updateDate },
				site: {
					content: websiteData.name,
					url: websiteData.link.site,
				},
				source: {
					content: label.github,
					url: websiteData.link.source,
				}
			}),
			sectionData: setContentToOrigin<ProductionSectionData>(sectionData, {
				description: { content: websiteData.description },
				howToMake: { content: websiteData.howToMake },
				skill: { content: websiteData.skills as Skill[] },
				image: { content: websiteData.link.site },
			})
		}
	}

	const customStyles = {
		titleImage: {
			width: isSP ? '18px' : '25px',
			marginRight: '7px',
		},
		linkImage: {
			width: '13px',
			marginLeft: '5px',
		},
		layoutBoxImage: {
			width: isSP ? '25%' : '75px',
			height: 'auto',
			maxWidth: '75px',
			padding: '3px',
		},
		skillList: {
			display: 'inline-block',
		},
	}

	return pageData === undefined ? <Loading/> : (
		<$.Page
			categoryState={production.state}
			pageName={pageData.framework}
		>
			<$.BaseSection>
				<$.H1>
					<img
						src={pageData.image}
						alt={pageData.title}
						style={customStyles.titleImage}
					/>
					{pageData.title}
				</$.H1>
				<$.P>
					{pageData.baseData.map(base => (
						<$.Text key={base.id}>
							<$.Text right>
								{base.title}
							</$.Text>
							<span>
								{base.url ? (
									<a href={base.url} target="_blank" rel="noreferrer">
										{base.content}
										<img
											src="/icon/external-link.svg"
											alt="external-link"
											style={customStyles.linkImage}
										/>
									</a>
								) : base.content}
							</span>
						</$.Text>
					))}
				</$.P>
				<$.P>
					{pageData.summary}
				</$.P>
			</$.BaseSection>

			{pageData.sectionData.map(section => (
				<$.ContentSection key={section.id}>
					<$.ContentSectionTitle>
						<$.H2 classNames={['flex-start', 'align-items-center']}>
							{section.name}
						</$.H2>
						<Modal
							title={section.name}
							content={section.modal}
						/>
					</$.ContentSectionTitle>
					{section.id === sectionIds.skill ? (
						<>
							<$.LayoutBox>
								{(section.content as Skill[]).map(skill => (
									<img
										key={`framework-image-${skill.id}`}
										src={`/main/${skill.image}`}
										alt={skill.name}
										style={customStyles.layoutBoxImage}
									/>
								))}
							</$.LayoutBox>
							{(section.content as Skill[]).map(skill => (
								<$.ListBox key={`framework-text-${skill.id}`}>
									<$.List style={customStyles.skillList}>
										<$.ListText>
											{skill.name}
										</$.ListText>
										{skill.contents.map(content => (
											<Fragment key={content}>
												{content !== '' && (
													<$.ListNote>
														{content}
													</$.ListNote>
												)}
											</Fragment>
										))}
									</$.List>
								</$.ListBox>
							))}
						</>
					)
					: section.id === sectionIds.image ? <$.Iframe src={section.content as string}/>
					: <$.P>{section.content as string}</$.P>}
				</$.ContentSection>
			))}
		</$.Page>
	)
}
export default Production
