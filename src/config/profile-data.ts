import { Category, IdName } from '../config/site-data'

// ---------- Types ---------- //
export type ProfilePage = {
    id: string,
    state: string,
    name: string,
    URL: string,
    contents: ProfileContents[]
}

type ProfileContents = {
    id: string,
    name: string,
	modal?: string,
    contents: ProfileLists[]
}

type ProfileLists = {
    id: string,
    title?: string,
    lists: {
        text: string,
        note?: string[]
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
	dataSet: {
		career: {
			id: 'career',
			state: 'career',
			name: 'Career',
			URL: '/' + category.id + '/career',
			contents: [
				{
					id: 'prevCareer',
					name: '前職',
					contents: [
						{
							id: 'firstPrev',
							title: '接客・販売',
							lists: [
								{
									text: '楽器店勤務',
									note: [
										'ベースの販売・リペア・通販担当',
										'伝票・レジ処理などの事務も兼任'
									]
								}
							]
						}
					]
				},
				{
					id: 'currentCareer',
					name: '現職',
					contents: [
						{
							id: 'firstCurrent',
							title: 'SES',
							lists: [
								{
									text: '銀行関連の現場で勤務',
									note: [
										'Excel Macro、コマンド（バッチファイル ）やJCL（Job Control Language）を学習・使用'
									]
								},
								{
									text: 'クレジットカード集計システムの開発・保守',
									note: [
										'データ集計システムの開発で、見積もりからリリースまで主に技術面を担当',
										'CakePHPを使用したシステムで、ソース内に記述の複雑に入り組んだSQLを操作・修正',
										'膨大なローデータ・集計データの集計をするバッチのSQLの不具合調査・修正',
										'集計されたデータを複雑な条件で表示させるController部分のSQLも修正'
									]
								}
							]
						},
						{
							id: 'secondCurrent',
							title: '本社受託開発',
							lists: [
								{
									text: '証券会社の口座申込フォーム作成',
									note: [
										'Laravelを用いてフォームのフロント・一部サーバーサイド処理を実装',
										'設計書の作成・修正や単体テストの試験仕様書の作成・実施'
									]
								},
								{
									text: '株アプリの作成',
									note: [
										'「Android Studio・Xcode」で「Kotlin・Swift」を学習しながら、ソースをもとに詳細設計書の書き起こし',
										'エミュレータや実機で動作確認'
									]
								},
								{
									text: '就職関連のLPページ作成',
									note: [
										'HTMLの枠組みからSassを使用してのデザインまで担当・作成'
									]
								},
								{
									text: 'ファンクラブアプリの作成',
									note: [
										'ほんの一部だが、画面遷移図・画面一覧の作成程度の上流工程を経験'
									]
								},
								{
									text: '口座開設サイトの保守',
									note: [
										'ログをチェックし、バッチファイル作成で該当箇所を抽出',
										'Android/iOS端末でのデバッグテスト'
									]
								}
							]
						},
					]
				},
			]
		},
		skillUp: {
			id: 'skillUp',
			state: 'skillUp',
			name: 'Main Skill',
			URL: '/' + category.id + '/skillUp',
			contents: [
				{
					id: 'react',
					name: 'React',
					contents: [
						{
							id: 'next',
							title: 'Next.js',
							lists: [
								{
									text: 'ポートフォリオサイト作成',
									note: [
										'主に独学での使用だが、Javascriptとともにかなり力を入れて学習を進めているため、現場でも貢献できる自信あり。最近は主にNext.jsを用いて開発を行っている（当サイトもNext.jsで作成）。stateを用いて表示切替、jQueryと交えたclass操作。Prop-typesなどのよく使うライブラリも一通り目を通している。',
										'Reactの学習サイトや、飼い猫のギャラリーサイト、当ポートフォリオサイトを作成している。'
									]
								}
							]
						},
					]
				},
				{
					id: 'vue',
					name: 'Vue.js',
					contents: [
						{
							id: 'nuxt',
							title: 'Nuxt.js',
							lists: [
								{
									text: 'テキーラの飲み比べサイト2作成',
									note: [
										'業務での経験を活かし、アウトプットの一つとして作成',
										'業務で学んだことを常にアップデートできるように適宜修正を加えている'
									]
								}
							]
						},
					]
				},
				{
					id: 'php',
					name: 'Php',
					contents: [
						{
							id: 'laravel',
							title: 'Laravel',
							lists: [
								{
									text: 'テキーラの飲み比べサイト作成',
									note: [
										'業務では主にLaravelを扱ってきたので、DBと絡めたフロントの表示やセッションを用いたサーバーサイドの処理の実装経験あり。Bladeテンプレートで申込フォームを作成し、条件により表示切り替えの処理を入れたり、入力値をセッションに入れてDBに保存したり、APIにデータを渡す処理などを行った。',
										'個人では、「テキーラ全書」という飲み比べレビューサイトを作成している'
									]
								}
							]
						}
					]
				},
			],
		},
		mySelf: {
			id: 'mySelf',
			state: 'mySelf',
			name: 'Myself',
			URL: '/' + category.id + '/mySelf',
			contents: [
				{
					id: 'hobby',
					name: '趣味',
					contents: [
						{
							id: 'culture',
							title: '文化系',
							lists: [
								{
									text: '映画観賞',
									note: [
										'ゴールデンスランバー',
										'ハングオーバー',
										'サマータイムマシンブルース',
									]
								},
								{
									text:'ドラマ観賞',
									note: [
										'勇者ヨシヒコ',
										'結婚できない男',
										'リーガルハイ',
									]
								},
								{
									text:'読書',
									note: [
										'『ゴールデンスランバー』伊坂幸太郎',
										'『変身』東野圭吾',
										'『告白』湊かなえ',
									]
								},
							]
						},
						{
							id: 'music',
							title: '音楽系',
							lists: [
								{
									text: 'ギター・ベース演奏',
									note: [
										'ギター : YAMAHA RGX-A2',
										'ベース : Moon Groove Master',
									]
								},
								{ text: 'フェス・ライブ参戦' },
								{
									text: '好きなアーティスト',
									note: [
										'[Alexandros]',
										'MAN WITH A MISSION',
										'BLUE ENCOUNT',
										'チャットモンチー',
									]
								},
							]
						},
						{
							id: 'sports',
							title: 'スポーツ系',
							lists: [
								{
									text: '球技',
									note: [
										'バスケ',
										'フットサル',
									]
								},
								{
									text: 'マリンスポーツ',
									note: [
										'スキューバダイビング',
										'ウィンドサーフィン',
									]
								},
								{
									text: 'ウィンタースポーツ',
									note: [
										'スノボ',
									]
								},
							]
						},
						{
							id: 'subCulture',
							title: 'サブカル系',
							lists: [
								{
									text: '好きなアニメ',
									note: [
										'呪術廻戦',
									]
								},
								{
									text: '好きな漫画',
									note: [
										'ワンピース',
										'ラーメン大好き小泉さん',
										'銀魂',
										'進撃の巨人',
									]
								},
								{
									text: '好きなゲーム',
									note: [
										'ゼルダの伝説',
										'ドラゴンクエストモンスターズ',
									]
								},
							]
						},
					]
				},
				{
					id: 'goodAt',
					name: '得意なこと',
					contents: [
						{
							id: 'firstGoodAt',
							lists: [
								{ text: '学習して知見を溜めること' },
								{ text: '整理整頓（部屋からソースまで）' },
								{ text: 'テキーラのテイスティング・分析' },
							]
						}
					]
				},
			]
		}
	}
}

export default profile
