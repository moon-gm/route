import Head from 'next/head'
import Modal from './modal'
import styles from '../styles/modules/page.module.scss'

const PageLayout = ({pageData}) => {

	// モーダルの値設定
	const openBtn = "?"
	const modalData = {
		contents: {
			title: "内容",
			content: "作成したサイトが果たす主な役割・機能の詳細。このサイトで何ができるのかなど。",
		},
		wayToMake: {
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
	const Section = ({title, modalContent, children}) => {
		return (
			<section className={styles.sectionBox}>
				<div className={styles.sectionTitle}>
					<h2 className={`
						${styles.h2}
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

	return (
		<>
			{/*** <head>の<title>設定 -- start -- ***/}
				<Head>
					<title>{pageData.head} | Portfolio Show</title>
				</Head>
			{/*** <head>の<title>設定 -- end -- ***/}

			<div className={styles.contentsBox}>

				{/*** サイトタイトル -- start -- ***/}
					<div className={styles.titleBox}>
						<h1 className={styles.h1}>
							<img src={pageData.logo} className={styles.logo}/>
							{pageData.title}
						</h1>
						<p className={styles.p}>
							作成日 {pageData.createDate}<br/>
							更新日 {pageData.upDate}<br/>
							サイト <a href={pageData.link.site} target="_blank">{pageData.title}<img src="/external-link.svg" className={styles.link}/></a><br/>
							ソース <a href={pageData.link.source} target="_blank">Github<img src="/external-link.svg" className={styles.link}/></a>
						</p>
						<p className={styles.p}>
							{pageData.summary}
						</p>
					</div>
				{/*** サイトタイトル -- end -- ***/}

				{/*** セクション__内容 -- start --***/}
					<Section
						title={modalData.contents.title}
						modalContent={modalData.contents.content}
					>
						<p className={styles.p}>
							{pageData.contents}
						</p>
					</Section>
				{/*** セクション__内容 -- end --***/}

				{/*** セクション__作成方法 -- start --***/}
					<Section
						title={modalData.wayToMake.title}
						modalContent={modalData.wayToMake.content}
					>
						<p className={styles.p}>
							{pageData.wayToMake}
						</p>
					</Section>
				{/*** セクション__作成方法 -- end --***/}

				{/*** セクション__使用技術・FW -- start --***/}
					<Section
						title={modalData.skill.title}
						modalContent={modalData.skill.content}
					>
						{/** 画像 -- start -- **/}
							<div className={styles.imgBox}>
								{pageData.skill.map(skill => {
									return (
										<img
											src={`/${skill.image}`}
											alt={skill.title}
											key={`FW-image${skill.title}`}
										/>
									)
								})}
							</div>
						{/** 画像 -- end -- **/}
						{pageData.skill.map(skill => {
							return (
								<ul key={`FW-text${skill.title}`} className={styles.listBox}>
									{/* SPでは非表示 */}
										<img
											src={`/${skill.image}`}
											className={styles.img}
										/>
									{/* SPでは非表示 */}
									<li className={`${styles.li} ${styles.liOnlyProduction}`}>
										<span className={styles.liText}>{skill.title}</span>
										{skill.contents.map(item => {
											return (
												<React.Fragment key={item}>
													{item !== "" && (
														<p className={styles.liNote}>
															{item}
														</p>
													)}
												</React.Fragment>
											)
										})}
									</li>
								</ul>
							)
						})}
					</Section>
				{/*** セクション__使用技術・FW -- end --***/}

				{/*** セクション__画面イメージ -- start --***/}
					<Section
						title={modalData.iframe.title}
						modalContent={modalData.iframe.content}
					>
						<iframe
							className={styles.iframe}
							src={pageData.link.site}
						/>
					</Section>
				{/*** セクション__画面イメージ -- end --***/}

			</div>
		</>
	)
}
export default PageLayout
