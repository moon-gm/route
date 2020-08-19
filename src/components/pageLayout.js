import Head from 'next/head'
import Styles from '../styles/modules/page.module.scss'

const PageLayout = ({pageData}) => {

	// 使用フレームワークの最後の配列を取得
	const lastArray = pageData.FW.slice(-1)[0];

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
					<h2 className={Styles.h2}>
						概要
					</h2>
					<p className={Styles.p}>
						{pageData.summary}
					</p>
				</section>

				{/*** セクション２ -- サイトリンク -- ***/}
				<section className={`${Styles.sectionBox} ${Styles.sectionBox2}`}>
					<h2 className={Styles.h2}>
						サイトリンク
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
					<h2 className={Styles.h2}>
						Githubソース
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
					<h2 className={Styles.h2}>
						内容
					</h2>
					<p className={Styles.p}>
					{pageData.contents}
					</p>
				</section>

				{/*** セクション５ -- 作成方法 -- ***/}
				<section className={`${Styles.sectionBox} ${Styles.sectionBox5}`}>
					<h2 className={Styles.h2}>
						作成方法
					</h2>
					<p className={Styles.p}>
						{pageData.wayToMake}
					</p>
				</section>

				{/*** セクション６ -- 使用フレームワーク -- ***/}
				<section className={`${Styles.sectionBox} ${Styles.sectionBox6}`}>
					<h2 className={Styles.h2}>
						使用フレームワーク
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

				{/*** セクション７ -- 画面イメージ -- ***/}
				<section className={`${Styles.sectionBox} ${Styles.sectionBox7}`}>
					<h2 className={Styles.h2}>
						画面イメージ
					</h2>
					<iframe className={Styles.iframe} src={pageData.link.site}/>
				</section>

			</div>
		</>
	)
}
export default PageLayout
