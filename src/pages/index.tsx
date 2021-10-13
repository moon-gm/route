import Head from 'next/head'
import styles from '../styles/modules/page.module.scss'

const Home = ({ category, siteTitle }) => {
	return (
		<>
			{/***  ヘッド設定 -- start -- ***/}
				<Head>
					<title>{category.HOME.NAME} | {siteTitle}</title>
				</Head>
			{/***  ヘッド設定 -- end -- ***/}

			{/***  コンテンツボックス -- start -- ***/}
				<div className={styles.contentsBox}>

					{/*  タイトル（プロフィール） -- start -- */}
						<h1 className={styles.h1}>
							{siteTitle}
						</h1>
					{/*  タイトル（プロフィール） -- end -- */}

					{/*  タイトル（プロフィール） -- start -- */}
						<p className={styles.p} style={{textAlign: 'center'}}>
							<img
								src={category.HOME.IMG}
								alt="TOP LOGO"
								width="100%"
								style={{maxWidth: '400px', textAlign: 'center'}}
							/>
						</p>
					{/*  タイトル（プロフィール） -- end -- */}

				</div>
			{/***  コンテンツボックス -- end -- ***/}
		</>
	)
}
export default Home
