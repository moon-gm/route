import { Fragment } from 'react'
import $ from '../../../components/page-bundle'
import Modal from '../../../components/modal'
import Loading from '../../../components/loading'
import { ProductPageData, Framework, Website, Skill } from '../../../types/index'
import styles from '../../../styles/modules/page.module.scss'

const Production = ({ $state, $category, $productionOrder, $siteData, $router, $judgments }): JSX.Element => {

	const { PRODUCTION } = $category
	const { SITE_TITLE } = $siteData
	const { isPC, isSP } = $judgments

	// get parameter from URL
	const { framework, website } = $router.query

	// create page & section data
	let pageData: ProductPageData
	if (framework && website) {
		const frameworkData: Framework = PRODUCTION.DATASET[$productionOrder.framework[framework]]
		const websiteData: Website = frameworkData.PAGES[$productionOrder.website[website]]
		pageData = {
			framework: frameworkData.NAME,
			title: websiteData.NAME,
			logo: websiteData.IMG,
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
					id: 'description',
					name: '内容',
					modal: '作成したサイトが果たす主な役割・機能の詳細。このサイトで何ができるのかなど。',
					content: websiteData.DESCRIPTION
				},
				{
					id: 'howToMake',
					name: '作成方法',
					modal: '使用したフレームワークなどをどのように活用しているか、また、どのようなシステムにしているかなどの説明。',
					content: websiteData.HOW_TO_MAKE
				},
				{
					id: 'skill',
					name: '使用技術・FW',
					modal: '各言語・フレームワーク内で実際に使用した技術を記載。',
					content: websiteData.SKILL
				},
				{
					id: 'image',
					name: '画面イメージ',
					modal: 'イメージとしているが、iframeで挿入しているため、実際のサイト同様に操作できる。',
					content: websiteData.LINK.SITE
				},
			]
		}
	}

	return pageData === undefined ? <Loading/> : (
		<$.Page
			state={$state}
			categoryState={PRODUCTION.STATE}
			pageName={pageData.framework}
			siteTitle={SITE_TITLE}
		>
			<$.BaseSection>
				<$.H1>
					<$.Image
						src={pageData.logo}
						alt={pageData.logo}
						type='logo'
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
										<$.Image
											src="/icon/external-link.svg"
											alt="外部リンクアイコン"
											type='link'
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
					<$.SectionTitle>
						<$.H2 classNames={['flex-start', 'align-items-center']}>
							{section.name}
						</$.H2>
						<Modal
							title={section.name}
							content={section.modal}
						/>
					</$.SectionTitle>
					{section.id === 'skill' ? (
						<>
							{isSP && (
								<$.ImageBox>
									{(section.content as Skill[]).map(skill => (
										<img
											src={`/main/${skill.image}`}
											alt={skill.title}
											key={`FW-image${skill.title}`}
										/>
									))}
								</$.ImageBox>
							)}
							{(section.content as Skill[]).map(skill => (
								<$.ListBox key={`FW-text${skill.title}`}>
									{isPC && (
										<$.Image
											src={`/main/${skill.image}`}
											alt="ロゴ"
										/>
									)}
									<$.List classNames={[styles.liOnlyProduction]}>
										<$.ListText>
											{skill.title}
										</$.ListText>
										{skill.contents.map(item => (
											<Fragment key={item}>
												{item !== '' && (
													<$.ListNote>
														{item}
													</$.ListNote>
												)}
											</Fragment>
										))}
									</$.List>
								</$.ListBox>
							))}
						</>
					)
					: section.id === 'image' ? <$.Iframe src={section.content as string}/>
					: <$.P>{section.content as string}</$.P>}
				</$.ContentSection>
			))}
		</$.Page>
	)
}
export default Production
