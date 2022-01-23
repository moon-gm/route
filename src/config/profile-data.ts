import { Category, IdName } from '../config/site-data'

// ---------- Types ---------- //
export type ProfilePage = {
    sectionData: ProfileSectionData[]
}

export type ProfileSectionData= {
	id: string,
	name: string,
	modal?: string,
	contents?: {
		id: string,
		title?: string,
		lists: {
			type?: string,
			text: string,
			note?: string[]
		}[]
	}[]
}

// ---------- Values ---------- //
const category: IdName = {
	id: 'profile',
	name: 'Profile'
}

// ---------- Set Value ---------- //
const profile: Category<ProfilePage> = {
	id: category.id,
	name: category.name,
	URL: '/' + category.id,
	state: category.id,
	dataSet: [
		{
			sectionData: [
				{
					id: 'career',
					name: '経歴',
					modal: '経歴の概略、業務と学んだ技術を記載。時系列順にはなっているが、実際の細かい経歴については、経歴書の方で確認。',
					contents: [
						{
							id: 'prevCareer',
							title: '前職',
							lists: [
								{
									text: '楽器店勤務',
									note: [
										'ベースの販売・リペア・通販担当',
										'伝票・レジ処理などの事務も兼任'
									]
								}
							]
						},
						{
							id: 'currentCareer',
							title: '現職',
							lists: [
								{
									type: 'SES',
									text: '銀行関連の現場で勤務',
									note: [
										'Excel Macro、コマンド（バッチファイル ）やJCL（Job Control Language）を学習・使用'
									]
								},
								{
									type: '本社受託開発',
									text: '証券会社の口座申込フォーム作成',
									note: [
										'Laravelを用いてフォームのフロント・一部サーバーサイド処理を実装',
										'設計書の作成・修正や単体テストの試験仕様書の作成・実施'
									]
								},
								{
									type: '本社受託開発',
									text: '株アプリの作成',
									note: [
										'「Android Studio・Xcode」で「Kotlin・Swift」を学習しながら、ソースをもとに詳細設計書の書き起こし',
										'エミュレータや実機で動作確認'
									]
								},
								{
									type: '本社受託開発',
									text: '就職関連のLPページ作成',
									note: [
										'HTMLの枠組みからSassを使用してのデザインまで担当・作成'
									]
								},
								{
									type: '本社受託開発',
									text: 'ファンクラブアプリの作成',
									note: [
										'ほんの一部だが、画面遷移図・画面一覧の作成程度の上流工程を経験'
									]
								},
								{
									type: '本社受託開発',
									text: '口座開設サイトの保守',
									note: [
										'ログをチェックし、バッチファイル作成で該当箇所を抽出',
										'Android/iOS端末でのデバッグテスト'
									]
								},
								{
									type: 'SES',
									text: 'クレジットカード集計システムの開発・保守',
									note: [
										'データ集計システムの開発で、見積もりからリリースまで主に技術面を担当',
										'CakePHPを使用したシステムで、ソース内に記述の複雑に入り組んだSQLを操作・修正',
										'膨大なローデータ・集計データの集計をするバッチのSQLの不具合調査・修正',
										'集計されたデータを複雑な条件で表示させるController部分のSQLも修正'
									]
								}
							]
						}
					]
				},
				{
					id: 'skillUp',
					name: '技術・現在力を入れていること',
					contents: [
						{
							id: 'react',
							lists: [
								{
									text: 'React',
									note: [
										'主に独学での使用だが、Javascriptとともにかなり力を入れて学習を進めているため、現場でも貢献できる自信あり。最近は主にNext.jsを用いて開発を行っている（当サイトもNext.jsで作成）。stateを用いて表示切替、jQueryと交えたclass操作。Prop-typesなどのよく使うライブラリも一通り目を通している。',
										'Reactの学習サイトや、飼い猫のギャラリーサイト、当ポートフォリオサイトを作成している。'
									]
								}
							]
						},
						{
							id: 'laravel',
							lists: [
								{
									text: 'Laravel',
									note: [
										'業務では主にLaravelを扱ってきたので、DBと絡めたフロントの表示やセッションを用いたサーバーサイドの処理の実装経験あり。Bladeテンプレートで申込フォームを作成し、条件により表示切り替えの処理を入れたり、入力値をセッションに入れてDBに保存したり、APIにデータを渡す処理などを行った。',
										'個人では、「テキーラ全書」という飲み比べレビューサイトを作成している'
									]
								}
							]
						}
					]
				},
				{
					id: 'myself',
					name: '趣味・得意なこと',
					contents: [
						{
							id: 'hobby',
							lists: [
								{ text: '学習して知見を溜めること' },
								{ text: '映画・アニメ観賞' },
								{ text: 'ギター・ベース演奏' },
								{ text: 'ゼルダ・ドラクエモン' },
								{ text: 'スキューバ・ウィンドサーフィン' },
								{ text: '整理整頓（部屋からソースまで）' }
							]
						}
					]
				}
			]
		}
	]
}

export default profile
