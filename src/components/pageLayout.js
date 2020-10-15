import Head from 'next/head'
import Modal from './modal'
import styles from '../styles/modules/page.module.scss'

const PageLayout = ({pageData}) => {

	// 使用フレームワークの最後の配列を取得
	const lastArray = pageData.FW.slice(-1)[0];

	// モーダルの値設定
	const openBtn = "?"
	const modalData = {
		summary: {
			title: "概要",
			content: "作成したサイトが主に果たす役割・機能のあらまし。",
		},
		site: {
			title: "サイトリンク",
			content: "作成したサイトへのリンク。主に「Github Pages」や「Vercel」でデプロイしている。",
		},
		source: {
			title: "Githubソース",
			content: "ソースは全てGithubにpushしており、リンクは対象リポジトリのトップを表示。",
		},
		contents: {
			title: "内容",
			content: "作成したサイトが果たす主な役割・機能の詳細。このサイトで何ができるのかなど。",
		},
		wayToMake: {
			title: "作成方法",
			content: "使用したフレームワークなどをどのように活用しているか、また、どのようなシステムにしているかなどの説明。",
		},
		FW: {
			title: "使用フレームワーク・言語",
			content: "実際に使用したフレームワークを全て記載。フレームワーク使用にあたって基本となる言語は省略（HTMLなど）。Node.jsは主にプロジェクトを導入する際に使用（npm）。",
		},
		skill: {
			title: "使用技術",
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
				<h2 className={`
					${styles.h2}
					flex-start
					align-items-center
				`}>
					{title}
					<Modal
						openBtn={openBtn}
						title={title}
						content={modalContent}
					/>
				</h2>
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
					<h1 className={styles.h1}>
						{pageData.title}
					</h1>
				{/*** サイトタイトル -- end -- ***/}

				{/*** セクション__概要 -- start --***/}
					<Section
						title={modalData.summary.title}
						modalContent={modalData.summary.content}
					>
						<p className={styles.p}>
							{pageData.summary}
						</p>
					</Section>
				{/*** セクション__概要 -- end --***/}

				{/*** セクション__サイトリンク -- start --***/}
					<Section
						title={modalData.site.title}
						modalContent={modalData.site.content}
					>
						<p className={styles.p}>
							<a
								href={pageData.link.site}
								target="_blank"
							>
								{pageData.link.site}
							</a>
						</p>
					</Section>
				{/*** セクション__サイトリンク -- end --***/}

				{/*** セクション__Githubソース -- start --***/}
					<Section
						title={modalData.source.title}
						modalContent={modalData.source.content}
					>
						<p className={styles.p}>
							<a
								href={pageData.link.source}
								target="_blank"
							>
								{pageData.link.source}
							</a>
						</p>
					</Section>
				{/*** セクション__Githubソース -- end --***/}

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

				{/*** セクション__使用フレームワーク・言語 -- start --***/}
					<Section
						title={modalData.FW.title}
						modalContent={modalData.FW.content}
					>
						<>

							{/** テキスト -- start -- **/}
								<p className={styles.p}>
									{pageData.FW.map(items => {
										if (items === lastArray) {
											// 配列の最後の値の場合
											return (
												<React.Fragment key={`FW-text${items.text}`}>
													{items.text}
												</React.Fragment>
											);
										} else {
											// 配列の最後の値以外の場合
											return (
												<React.Fragment key={`FW-text${items.text}`}>
													{`${items.text} / `}
												</React.Fragment>
											);
										}
									})}
								</p>
							{/** テキスト -- start -- **/}

							{/** 画像 -- start -- **/}
								<div className={styles.imgBox}>
									{pageData.FW.map(items => {
										return (
											<img
												src={`/${items.image}`}
												alt={items.text}
												key={`FW-image${items.text}`}
											/>
										)
									})}
								</div>
							{/** 画像 -- end -- **/}
						</>
					</Section>
				{/*** セクション__使用フレームワーク・言語 -- end --***/}

				{/*** セクション__使用技術 -- start --***/}
					<Section
						title={modalData.skill.title}
						modalContent={modalData.skill.content}
					>
						{pageData.skill.map(skill => {
							return (
								<ul key={`FW-text${skill.title}`} className="list-box">
									<li className="li">
										<span className="li-text">{skill.title}</span>
										{skill.contents.map(item => {
											return (
												<p className="li-note" key={item}>
													・{item}
												</p>
											)
										})}
									</li>
								</ul>
							)
						})}
					</Section>
				{/*** セクション__使用技術 -- end --***/}

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
