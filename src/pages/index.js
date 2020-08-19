import Head from 'next/head'
import Styles from '../styles/modules/page.module.scss'

const Home = () => {
	return (
		<>
			<Head>
				<title>Home | Portfolio Show</title>
			</Head>
			<div className={Styles.contentsBox}>
				<h1 className={Styles.h1}>
					ポートフォリオ作成概要
				</h1>
				<p　className="p">
					自身の力のみで作成したサイトを、使用したフレームワーク別で紹介。<br/>
					具体的には、サイトごとに以下の内容で展開していく。
				</p>
				<ul　className="list-box">
					<li className="li">概要</li>
					<li className="li">サイトリンク</li>
					<li className="li">Githubリポジトリでのソース確認</li>
					<li className="li">どういう内容のサイトなのかの機能説明</li>
					<li className="li">作成方法</li>
					<li className="li">使用した言語・フレームワーク</li>
					<li className="li">iframeを用いたサイトの画面イメージ</li>
				</ul>
			</div>
		</>
	)
}
export default Home
