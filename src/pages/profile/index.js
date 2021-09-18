import Head from 'next/head'
import Modal from '../../components/modal'
import styles from '../../styles/modules/page.module.scss'

const Profile = ({category, siteTitle}) => {
	return (
		<>
			{/***  ヘッド設定 -- start -- ***/}
				<Head>
					<title>{category.PROFILE.NAME} | {siteTitle}</title>
				</Head>
			{/***  ヘッド設定 -- end -- ***/}

			{/***  コンテンツボックス -- start -- ***/}
				<div className={styles.contentsBox}>

					{/*  タイトル（プロフィール） -- start -- */}
						<h1 className={styles.h1}>
							{category.PROFILE.NAME}
						</h1>
					{/*  タイトル（プロフィール） -- end -- */}

					{/*  項目（経歴） -- start -- */}
						<div className={styles.sectionBox}>
							<div className={styles.sectionTitle}>
								<h2 className={`${styles.h2} flex-start align-items-center`}>
									経歴
								</h2>
								<Modal
									openBtn="?"
									title="経歴"
									content="経歴の概略、業務と学んだ技術を記載。時系列順にはなっているが、実際の細かい経歴については、経歴書の方で確認。"
								/>
							</div>

							<h3　className={styles.h3}>
								前職
							</h3>
							<ul　className={styles.listBox}>
								<li className={styles.li}>
									<span className={styles.listText}>
										楽器店勤務
									</span>
									<p className={styles.liNote}>
										ベースの販売・リペア・通販担当
									</p>
									<p className={styles.liNote}>
										伝票・レジ処理などの事務も兼任
									</p>
								</li>
							</ul>

							<h3　className={styles.h3}>
								現職
							</h3>
							<ul　className={styles.listBox}>
								<li className={styles.li}>
									<span className={styles.liText}>
										銀行関連の現場で勤務（SES）
									</span>
									<p className={styles.liNote}>
										Excel Macro、コマンド（バッチファイル ）やJCL（Job Control Language）を学習・使用
									</p>
								</li>
								<li className={styles.li}>
									<span className={styles.liText}>
										証券会社の口座申込フォーム作成（本社受託開発）
									</span>
									<p className={styles.liNote}>
										Laravelを用いてフォームのフロント・一部サーバーサイド処理を実装
									</p>
									<p className={styles.liNote}>
										設計書の作成・修正や単体テストの試験仕様書の作成・実施
									</p>
								</li>
								<li className={styles.li}>
									<span className={styles.liText}>
										株アプリの作成（本社受託開発）
									</span>
									<p className={styles.liNote}>
										「Android Studio・Xcode」で「Kotlin・Swift」を学習しながら、ソースをもとに詳細設計書の書き起こし
									</p>
									<p className={styles.liNote}>
										エミュレータや実機で動作確認
									</p>
								</li>
								<li className={styles.li}>
									<span className={styles.liText}>
										就職関連のLPページ作成（本社受託開発）
									</span>
									<p className={styles.liNote}>
										HTMLの枠組みからSassを使用してのデザインまで担当・作成
									</p>
								</li>
								<li className={styles.li}>
									<span className={styles.liText}>
										ファンクラブアプリの作成（本社受託開発）
									</span>
									<p className={styles.liNote}>
										ほんの一部だが、画面遷移図・画面一覧の作成程度の上流工程を経験
									</p>
								</li>
								<li className={styles.li}>
									<span className={styles.liText}>
										口座開設サイトの保守（本社受託開発）
									</span>
									<p className={styles.liNote}>
										ログをチェックし、バッチファイル作成で該当箇所を抽出
									</p>
									<p className={styles.liNote}>
										Android/iOS端末でのデバッグテスト
									</p>
								</li>
								<li className={styles.li}>
									<span className={styles.liText}>
										クレジットカード集計システムの開発・保守（SES）
									</span>
									<p className={styles.liNote}>
										データ集計システムの開発で、見積もりからリリースまで主に技術面を担当
									</p>
									<p className={styles.liNote}>
										CakePHPを使用したシステムで、ソース内に記述の複雑に入り組んだSQLを操作・修正
									</p>
									<p className={styles.liNote}>
										膨大なローデータ・集計データの集計をするバッチのSQLの不具合調査・修正
									</p>
									<p className={styles.liNote}>
										集計されたデータを複雑な条件で表示させるController部分のSQLも修正
									</p>
								</li>
							</ul>
						</div>
					{/*  項目（経歴） -- end -- */}

					{/*  項目（技術・現在力を入れていること） -- start -- */}
						<div className={styles.sectionBox}>
							<div className={styles.sectionTitle}>
								<h2　className={styles.h2}>
									技術・現在力を入れていること
								</h2>
							</div>
							<ul　className={styles.listBox}>
								<li className={styles.li}>
									<span className={styles.liText}>
										React
									</span>
									<p className={styles.liNote}>
										主に独学での使用だが、Javascriptとともにかなり力を入れて学習を進めているため、現場でも貢献できる自信あり。最近は主にNext.jsを用いて開発を行っている（当サイトもNext.jsで作成）。stateを用いて表示切替、jQueryと交えたclass操作。Prop-typesなどのよく使うライブラリも一通り目を通している。
									</p>
									<p className={styles.liNote}>
										Reactの学習サイトや、飼い猫のギャラリーサイト、当ポートフォリオサイトを作成している。
									</p>
								</li>
								<li className={styles.li}>
									<span className={styles.liText}>
										Laravel
									</span>
									<p className={styles.liNote}>
										業務では主にLaravelを扱ってきたので、DBと絡めたフロントの表示やセッションを用いたサーバーサイドの処理の実装経験あり。Bladeテンプレートで申込フォームを作成し、条件により表示切り替えの処理を入れたり、入力値をセッションに入れてDBに保存したり、APIにデータを渡す処理などを行った。
									</p>
									<p className={styles.liNote}>
										個人では、「テキーラ全書」という飲み比べレビューサイトを作成している
									</p>
								</li>
							</ul>
						</div>
					{/*  項目（技術・現在力を入れていること） -- end -- */}

					{/*  項目（趣味・得意なこと） -- start -- */}
						<div className={styles.sectionBox}>
							<div className={styles.sectionTitle}>
								<h2　className={styles.h2}>
									趣味・得意なこと
								</h2>
							</div>
							<ul　className={styles.listBox}>
								<li className={styles.li}>テキーラを嗜むこと</li>
								<li className={styles.li}>学習して知見を溜めること</li>
								<li className={styles.li}>映画・アニメ観賞</li>
								<li className={styles.li}>ギター・ベース演奏</li>
								<li className={styles.li}>ゼルダ・ドラクエモン</li>
								<li className={styles.li}>スキューバ・ウィンドサーフィン</li>
								<li className={styles.li}>整理整頓（部屋からソースまで）</li>
							</ul>
						</div>
					{/*  項目（趣味・得意なこと） -- end -- */}
				</div>
			{/***  コンテンツボックス -- end -- ***/}
		</>
	)
}
export default Profile
