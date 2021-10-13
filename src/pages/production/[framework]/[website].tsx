import React from 'react'
import Head from 'next/head'
import Modal from '../../../components/modal'
import Loading from '../../../components/loading'
import css from '../../../styles/modules/page.module.scss'
import { ProductPageData, ProductModalData, Framework, Website } from '../../../types/index'

const PageLayout = ({ category, order, siteTitle, router }): JSX.Element => {

	// URLパラメータ取得
	const { framework, website } = router.query

	// ページ内容設定
	let pageData: ProductPageData
	if (framework && website) {
		const frameworkData: Framework = category.PRODUCTION.DATASET[order.framework[framework]]
		const websiteData: Website = frameworkData.PAGES[order.website[website]]
		pageData = {
			head: frameworkData.NAME, // ヘッドタイトル	
			title: websiteData.NAME, // ページタイトル
			logo: websiteData.IMG,　// タイトルロゴ
			createDate: websiteData.CREATE_DATE,　// 作成日
			upDate: websiteData.UPDATE_DATE,　// 更新日
			summary: websiteData.SUMMARY,　// 概要
			link: {
				site: websiteData.LINK.SITE, // サイトリンク・画面イメージ
				source: websiteData.LINK.SOURCE, // Githubソース
			},	
			description: websiteData.DESCRIPTION, // 内容			
			howToMake: websiteData.HOW_TO_MAKE, // 作成方法
			skill: websiteData.SKILL, // 使用技術・FW
		}
	}

	// モーダルの値設定
	const openBtn: string = "?"
	const modalData: ProductModalData = {
		description: {
			title: "内容",
			content: "作成したサイトが果たす主な役割・機能の詳細。このサイトで何ができるのかなど。",
		},
		howToMake: {
			title: "作成方法",
			content: "使用したフレームワークなどをどのように活用しているか、また、どのようなシステムにしているかなどの説明。",
		},
		skill: {
			title: "使用技術・FW",
			content: "各言語・フレームワーク内で実際に使用した技術を記載。",
		},
		iframe: {
			title: "画面イメージ",
			content: "イメージとしているが、iframeで挿入しているため、実際のサイト同様に操作できる。",
		},
	}

	// セクション共通部分のコンポーネント
	const Section = ({ title, modalContent, children }): JSX.Element => {
		return (
			<section className={css.sectionBox}>
				<div className={css.sectionTitle}>
					<h2 className={`
						${css.h2}
						flex-start
						align-items-center
					`}>
						{title}
					</h2>
					<Modal
						openBtn={openBtn}
						title={title}
						content={modalContent}
					/>
				</div>
				{children}
			</section>
		)
	}

	return pageData === undefined ? <Loading/> : (
		<>
			{/*** <head>の<title>設定 -- start -- ***/}
				<Head>
					<title>{pageData.head} | {siteTitle}</title>
				</Head>
			{/*** <head>の<title>設定 -- end -- ***/}

			<div className={css.contentsBox}>

				{/*** セクション__タイトル -- start -- ***/}
					<section className={css.titleBox}>
						<h1 className={css.h1}>
							<img src={pageData.logo} className={css.logo}/>
							{pageData.title}
						</h1>
						<p className={css.p}>
							作成日 {pageData.createDate}<br/>
							更新日 {pageData.upDate}<br/>
							サイト <a href={pageData.link.site} target="_blank">{pageData.title}<img src="/icon/external-link.svg" className={css.link}/></a><br/>
							ソース <a href={pageData.link.source} target="_blank">Github<img src="/icon/external-link.svg" className={css.link}/></a>
						</p>
						<p className={css.p}>
							{pageData.summary}
						</p>
					</section>
				{/*** セクション__タイトル -- end -- ***/}

				{/*** セクション__内容 -- start --***/}
					<Section
						title={modalData.description.title}
						modalContent={modalData.description.content}
					>
						<p className={css.p}>
							{pageData.description}
						</p>
					</Section>
				{/*** セクション__内容 -- end --***/}

				{/*** セクション__作成方法 -- start --***/}
					<Section
						title={modalData.howToMake.title}
						modalContent={modalData.howToMake.content}
					>
						<p className={css.p}>
							{pageData.howToMake}
						</p>
					</Section>
				{/*** セクション__作成方法 -- end --***/}

				{/*** セクション__使用技術・FW -- start --***/}
					<Section
						title={modalData.skill.title}
						modalContent={modalData.skill.content}
					>
						{/* 画像：PCでは非表示 -- start -- */}
							<div className={css.imgBox}>
								{pageData.skill.map(skill => (
									<img
										src={`/main/${skill.image}`}
										alt={skill.title}
										key={`FW-image${skill.title}`}
									/>
								))}
							</div>
						{/* 画像：PCでは非表示 -- end -- */}
						{pageData.skill.map(skill => (
							<ul key={`FW-text${skill.title}`} className={css.listBox}>
								{/* 画像：SPでは非表示 -- start -- */}
									<img
										src={`/main/${skill.image}`}
										className={css.img}
									/>
								{/* 画像：SPでは非表示 -- end -- */}
								<li className={`${css.li} ${css.liOnlyProduction}`}>
									<span className={css.liText}>
										{skill.title}
									</span>
									{skill.contents.map(item => (
										<React.Fragment key={item}>
											{item !== "" && (
												<p className={css.liNote}>
													{item}
												</p>
											)}
										</React.Fragment>
									))}
								</li>
							</ul>
						))}
					</Section>
				{/*** セクション__使用技術・FW -- end --***/}

				{/*** セクション__画面イメージ -- start --***/}
					<Section
						title={modalData.iframe.title}
						modalContent={modalData.iframe.content}
					>
						<iframe
							className={css.iframe}
							src={pageData.link.site}
						/>
					</Section>
				{/*** セクション__画面イメージ -- end --***/}

			</div>
		</>
	)
}
export default PageLayout
