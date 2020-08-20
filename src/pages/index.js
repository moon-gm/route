import Head from 'next/head'
import Styles from '../styles/modules/page.module.scss'

const Home = () => {
	return (
		<>
			<Head>
				<title>Home | Portfolio Show</title>
			</Head>
			<div className={Styles.contentsBox}>

				<div className={Styles.sectionBox}>
					<h1 className={Styles.h1}>
						プロフィール
					</h1>
					<h2　className={Styles.h2}>
						経歴
					</h2>
					<h3　className={Styles.h3}>
						前職
					</h3>
					<ul　className="list-box">
						<li className="li">
							<span className="li-text">楽器店勤務</span>
							<p className="li-note">
								→ベースの販売・リペア・通販担当
							</p>
							<p className="li-note">
								→伝票・レジ処理などの事務も兼任
							</p>
						</li>
					</ul>
					<h3　className={Styles.h3}>
						現職
					</h3>
					<ul　className="list-box">
						<li className="li">
							<span className="li-text">銀行関連の現場で勤務（SES）</span>
							<p className="li-note">
								→Excel Macro、コマンド（バッチファイル ）やJCL（Job Control Language）を学習・使用
							</p>
						</li>
						<li className="li">
							<span className="li-text">証券会社の口座申込フォーム作成（本社受託開発）</span>
							<p className="li-note">
								→Laravelを用いてフォームのフロント・一部サーバーサイド処理を実装
							</p>
							<p className="li-note">
								→設計書の作成・修正や単体テストの試験仕様書の作成・実施
							</p>
						</li>
						<li className="li">
							<span className="li-text">株アプリの作成（本社受託開発）</span>
							<p className="li-note">
								→「Android Studio・Xcode」で「Kotlin・Swift」を学習しながら、ソースをもとに詳細設計書の書き起こし
							</p>
							<p className="li-note">
								→エミュレータや実機で動作確認
							</p>
						</li>
						<li className="li">
							<span className="li-text">就職関連のLPページ作成（本社受託開発）</span>
							<p className="li-note">
								→HTMLの枠組みからSassを使用してのデザインまで担当・作成
							</p>
						</li>
						<li className="li">
							<span className="li-text">ファンクラブアプリの作成（本社受託開発）</span>
							<p className="li-note">
								→ほんの一部だが、画面遷移図・画面一覧の作成程度の上流工程を経験
							</p>
						</li>
						<li className="li">
							<span className="li-text">口座開設サイトの保守（本社受託開発）</span>
							<p className="li-note">
								→ログをチェックし、バッチファイル作成で該当箇所を抽出
							</p>
							<p className="li-note">
								→Android/iOS端末でのデバッグテスト
							</p>
						</li>
					</ul>
					<h2　className={Styles.h2}>
						技術・現在力を入れていること
					</h2>
					<ul　className="list-box">
						<li className="li">
							React
							<p className="li-note">
								→主に独学での使用だが、Javascriptとともにかなり力を入れて学習を進めているため、現場でも貢献できる自信あり。最近は主にNext.jsを用いて開発を行っている（当サイトもNext.jsで作成）。stateを用いて表示切替、jQueryと交えたclass操作。Prop-typesなどのよく使うライブラリも一通り目を通している。
							</p>
							<p className="li-note">
								→Reactの学習サイトや、飼い猫のギャラリーサイト、当ポートフォリオサイトを作成している。
							</p>
						</li>
						<li className="li">
							Laravel
							<p className="li-note">
								→業務では主にLaravelを扱ってきたので、DBと絡めたフロントの表示やセッションを用いたサーバーサイドの処理の実装経験あり。Bladeテンプレートで申込フォームを作成し、条件により表示切り替えの処理を入れたり、入力値をセッションに入れてDBに保存したり、APIにデータを渡す処理などを行った。
							</p>
							<p className="li-note">
								→個人では、「テキーラ全書」という飲み比べレビューサイトを作成している
							</p>
						</li>
					</ul>
					<h2　className={Styles.h2}>
						趣味・得意なこと
					</h2>
					<ul　className="list-box">
						<li className="li">テキーラを嗜むこと</li>
						<li className="li">学習して知見を溜めること</li>
						<li className="li">映画・アニメ観賞</li>
						<li className="li">ギター・ベース演奏</li>
						<li className="li">ゼルダ・ドラクエモン</li>
						<li className="li">スキューバ・ウィンドサーフィン</li>
						<li className="li">整理整頓（部屋からソースまで）</li>
					</ul>
				</div>

				<div className={Styles.sectionBox}>
					<h1 className={Styles.h1}>
						ポートフォリオ紹介
					</h1>
					<h2　className={Styles.h2}>
						概要説明
					</h2>
					<p　className="p">
						自身の力のみで作成したサイトを、使用したフレームワーク別で紹介。具体的には、サイトごとに以下のポイントの紹介を展開していく。
					</p>
					<h2　className={Styles.h2}>
						ポイント
					</h2>
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

			</div>
		</>
	)
}
export default Home
