import { Fragment } from 'react'
import $ from '../../../components/page-bundle'
import Modal from '../../../components/modal'
import Loading from '../../../components/loading'
import { ProductPageData, Framework, Website, Skill } from '../../../types/index'

const Production = ({ $state, $category, $productionOrder, $router, $judgments }): JSX.Element => {

	const { PRODUCTION } = $category
	const { isSP } = $judgments

	// get parameter from URL
	const { framework, website } = $router.query

	const sectionIds: Record<string, string> = {
		description: 'description',
		howToMake: 'howToMake',
		skill: 'skill',
		image: 'image',
	}

	// create page data
	let pageData: ProductPageData
	if (framework && website) {
		const frameworkData: Framework = PRODUCTION.DATASET[$productionOrder.framework[framework]]
		const websiteData: Website = frameworkData.PAGES[$productionOrder.website[website]]
		pageData = {
			framework: frameworkData.NAME,
			title: websiteData.NAME,
			image: websiteData.IMG,
			summary: websiteData.SUMMARY,
			baseData: [
				{
					id: 'createDate',
					title: '作成日',
					content: websiteData.CREATE_DATE,
				},
				{
					id: 'updateDate',
					title: '更新日',
					content: websiteData.UPDATE_DATE,
				},
				{
					id: 'site',
					title: 'サイト',
					content: websiteData.NAME,
					url: websiteData.LINK.SITE,
				},
				{
					id: 'source',
					title: 'ソース',
					content: 'Github',
					url: websiteData.LINK.SOURCE,
				}
			],
			sectionData: [
				{
					id: sectionIds.description,
					name: '内容',
					modal: '作成したサイトが果たす主な役割・機能の詳細。このサイトで何ができるのかなど。',
					content: websiteData.DESCRIPTION
				},
				{
					id: sectionIds.howToMake,
					name: '作成方法',
					modal: '使用したフレームワークなどをどのように活用しているか、また、どのようなシステムにしているかなどの説明。',
					content: websiteData.HOW_TO_MAKE
				},
				{
					id: sectionIds.skill,
					name: '使用技術',
					modal: '各言語・フレームワーク内で実際に使用した技術を記載。',
					content: websiteData.SKILL
				},
				{
					id: sectionIds.image,
					name: '画面イメージ',
					modal: 'イメージとしているが、iframeで挿入しているため、実際のサイト同様に操作できる。',
					content: websiteData.LINK.SITE
				},
			]
		}
	}

	const customStyles: Record<string, Record<string, string>> = {
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
			state={$state}
			categoryState={PRODUCTION.STATE}
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
											alt="外部リンクアイコン"
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
