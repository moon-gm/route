import Head from 'next/head'

const Home = () => {
	return (
		<>
			<Head>
				<title>Home | Portfolio List</title>
			</Head>
			<div className="page-layout">
				<h1>
					ポートフォリオ作成概要
				</h1>
				<p>
					作成サイト一覧か、上記画像を押下でここに作成サイトの詳細が表示される
				</p>
			</div>
		</>
	)
}
export default Home
