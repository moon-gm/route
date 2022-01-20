import { Fragment } from 'react'
import { useRouter } from 'next/router'
import $ from '../../../components/page-bundle'
import Modal from '../../../components/modal'
import Loading from '../../../components/loading'
import { ProductionPage, Framework, Website, Skill } from '../../../types/index'

const Production = ({ $category, $productionOrder, $judgments }): JSX.Element => {

	const { production } = $category
	const { isSP } = $judgments

	// get parameter from URL
	const router = useRouter()
	const { framework, website } = router.query

	const sectionIds = {
		description: 'description',
		howToMake: 'howToMake',
		skill: 'skill',
		image: 'image',
	}

	// create page data
	let pageData: ProductionPage
	if (framework && website) {
		const frameworkData: Framework = production.dataSet[$productionOrder.framework[framework as string]]
		const websiteData: Website = frameworkData.pages[$productionOrder.website[website as string]]
		pageData = {
			framework: frameworkData.name,
			title: websiteData.name,
			image: websiteData.imageSrc,
			summary: websiteData.summary,
			baseData: [
				{
					id: 'createDate',
					title: '作成日',
					content: websiteData.createDate,
				},
				{
					id: 'updateDate',
					title: '更新日',
					content: websiteData.updateDate,
				},
				{
					id: 'site',
					title: 'サイト',
					content: websiteData.name,
					url: websiteData.link.site,
				},
				{
					id: 'source',
					title: 'ソース',
					content: 'Github',
					url: websiteData.link.source,
				}
			],
			sectionData: [
				{
					id: sectionIds.description,
					name: '内容',
					modal: '作成したサイトが果たす主な役割・機能の詳細。このサイトで何ができるのかなど。',
					content: websiteData.description
				},
				{
					id: sectionIds.howToMake,
					name: '作成方法',
					modal: '使用したフレームワークなどをどのように活用しているか、また、どのようなシステムにしているかなどの説明。',
					content: websiteData.howToMake
				},
				{
					id: sectionIds.skill,
					name: '使用技術',
					modal: '各言語・フレームワーク内で実際に使用した技術を記載。',
					content: websiteData.skills
				},
				{
					id: sectionIds.image,
					name: '画面イメージ',
					modal: 'イメージとしているが、iframeで挿入しているため、実際のサイト同様に操作できる。',
					content: websiteData.link.site
				},
			]
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
						alt="ページアイコン"
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
									<a href={base.url} target="_blank">
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
										key={`framework-image-${skill.title}`}
										src={`/main/${skill.image}`}
										alt={skill.title}
										style={customStyles.layoutBoxImage}
									/>
								))}
							</$.LayoutBox>
							{(section.content as Skill[]).map(skill => (
								<$.ListBox key={`framework-text-${skill.title}`}>
									<$.List style={customStyles.skillList}>
										<$.ListText>
											{skill.title}
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
