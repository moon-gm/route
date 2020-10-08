import Head from 'next/head'
import Modal from './modal'
import Styles from '../styles/modules/page.module.scss'

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

	return (
		<>
			{/*** <head>の<title>設定 ***/}
			<Head>
				<title>{pageData.head} | Portfolio Show</title>
			</Head>

			<div
				className={Styles.contentsBox}
			>
				{/*** サイトタイトル ***/}
				<h1 className={Styles.h1}>
					{pageData.title}
				</h1>

				{/*** セクション１ -- 概要 -- ***/}
				<section className={`${Styles.sectionBox} ${Styles.sectionBox1}`}>
					<h2 className={`${Styles.h2} flex-start align-items-center`}>
						{modalData.summary.title}
						<Modal
							openBtn={openBtn}
							title={modalData.summary.title}
							content={modalData.summary.content}
						/>
					</h2>
					<p className={Styles.p}>
						{pageData.summary}
					</p>
				</section>

				{/*** セクション２ -- サイトリンク -- ***/}
				<section className={`${Styles.sectionBox} ${Styles.sectionBox2}`}>
					<h2 className={`${Styles.h2} flex-start align-items-center`}>
						{modalData.site.title}
						<Modal
							openBtn={openBtn}
							title={modalData.site.title}
							content={modalData.site.content}
						/>
					</h2>
					<p className={Styles.p}>
						<a
							href={pageData.link.site}
							target="_blank"
						>
							{pageData.link.site}
						</a>
					</p>
				</section>

				{/*** セクション３ -- Githubソース -- ***/}
				<section className={`${Styles.sectionBox} ${Styles.sectionBox3}`}>
					<h2 className={`${Styles.h2} flex-start align-items-center`}>
						{modalData.source.title}
						<Modal
							openBtn={openBtn}
							title={modalData.source.title}
							content={modalData.source.content}
						/>
					</h2>
					<p className={Styles.p}>
						<a
							href={pageData.link.source}
							target="_blank"
						>
							{pageData.link.source}
						</a>
					</p>
				</section>

				{/*** セクション４ -- 内容 -- ***/}
				<section className={`${Styles.sectionBox} ${Styles.sectionBox4}`}>
					<h2 className={`${Styles.h2} flex-start align-items-center`}>
						{modalData.contents.title}
						<Modal
							openBtn={openBtn}
							title={modalData.contents.title}
							content={modalData.contents.content}
						/>
					</h2>
					<p className={Styles.p}>
					{pageData.contents}
					</p>
				</section>

				{/*** セクション５ -- 作成方法 -- ***/}
				<section className={`${Styles.sectionBox} ${Styles.sectionBox5}`}>
					<h2 className={`${Styles.h2} flex-start align-items-center`}>
						{modalData.wayToMake.title}
						<Modal
							openBtn={openBtn}
							title={modalData.wayToMake.title}
							content={modalData.wayToMake.content}
						/>
					</h2>
					<p className={Styles.p}>
						{pageData.wayToMake}
					</p>
				</section>

				{/*** セクション６ -- 使用フレームワーク・言語 -- ***/}
				<section className={`${Styles.sectionBox} ${Styles.sectionBox6}`}>
					<h2 className={`${Styles.h2} flex-start align-items-center`}>
						{modalData.FW.title}
						<Modal
							openBtn={openBtn}
							title={modalData.FW.title}
							content={modalData.FW.content}
						/>
					</h2>
					{/** テキスト **/}
					<p className={Styles.p}>
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
					{/** 画像 **/}
					<div className={Styles.imgBox}>
						{pageData.FW.map(items => {
							return (
								<img
									src={`/${items.image}`}
									alt={items.text}
									key={`FW-image${items.text}`}
								/>
							);
						})}
					</div>
				</section>

				{/*** セクション７ -- 使用技術 -- ***/}
				<section className={`${Styles.sectionBox} ${Styles.sectionBox6}`}>
					<h2 className={`${Styles.h2} flex-start align-items-center`}>
						{modalData.skill.title}
						<Modal
							openBtn={openBtn}
							title={modalData.skill.title}
							content={modalData.skill.content}
						/>
					</h2>
					{/** リスト **/}
					{pageData.skill.map(items => {
						return (
							<ul key={`FW-text${items.title}`} className="list-box">
								<li className="li">
									<span className="li-text">{items.title}</span>
									{items.contents.map(item => {
										return (
											<p className="li-note">
												・{item}
											</p>
										);
									})}
								</li>
							</ul>
						);
					})}
				</section>

				{/*** セクション８ -- 画面イメージ -- ***/}
				<section className={`${Styles.sectionBox} ${Styles.sectionBox7}`}>
					<h2 className={`${Styles.h2} flex-start align-items-center`}>
						{modalData.iframe.title}
						<Modal
							openBtn={openBtn}
							title={modalData.iframe.title}
							content={modalData.iframe.content}
						/>
					</h2>
					<iframe className={Styles.iframe} src={pageData.link.site}/>
				</section>

			</div>
		</>
	)
}
export default PageLayout
