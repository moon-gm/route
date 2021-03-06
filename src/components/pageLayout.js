import Head from 'next/head'
import Modal from './modal'
import css from '../styles/modules/page.module.scss'

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

	return (
		<>
			{/*** <head>の<title>設定 -- start -- ***/}
				<Head>
					<title>{pageData.head} | Portfolio Show</title>
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
							サイト <a href={pageData.link.site} target="_blank">{pageData.title}<img src="/external-link.svg" className={css.link}/></a><br/>
							ソース <a href={pageData.link.source} target="_blank">Github<img src="/external-link.svg" className={css.link}/></a>
						</p>
						<p className={css.p}>
							{pageData.summary}
						</p>
					</section>
				{/*** セクション__タイトル -- end -- ***/}

				{/*** セクション__内容 -- start --***/}
					<Section
						title={modalData.contents.title}
						modalContent={modalData.contents.content}
					>
						<p className={css.p}>
							{pageData.contents}
						</p>
					</Section>
				{/*** セクション__内容 -- end --***/}

				{/*** セクション__作成方法 -- start --***/}
					<Section
						title={modalData.wayToMake.title}
						modalContent={modalData.wayToMake.content}
					>
						<p className={css.p}>
							{pageData.wayToMake}
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
										src={`/${skill.image}`}
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
										src={`/${skill.image}`}
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
