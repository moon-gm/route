import { Category, IdName } from '../config/site-data'

// ---------- Types ---------- //
export type ProductionPage = {
    framework: string,
    title: string,
    image: string,
    summary: string,
    baseData: ProductionBaseData[],
    sectionData: ProductionSectionData[]
}

export type ProductionBaseData = {
    id: string,
    title: string,
    content?: string,
    url?: string
}

export type ProductionSectionData = {
    id: string,
    name: string,
    modal: string,
    content?: string | Skill[]
}

export type ProductionOrder = {
    framework: Record<string, number>,
    website: Record<string, number>
}

export type Framework = {
    id: string,
    name: string,
    state: string,
    imageSrc: string,
    pages: Website[]
}

type FrameworkData = {
    id: string,
    name: string,
    website: string[]
}

export type Website = {
    id: string,
    name: string,
    URL: string,
    state: number,
    imageSrc: string,
    createDate: string,
    updateDate: string,
    summary: string,
    link: {
        site: string,
        source: string,
    },
    description: string,
    howToMake: string,
    skills: Skill[]
}

type WebsiteData = {
    id: string,
    name: string,
    frameworkId: string,
    imageSrc: string,
    createDate: string,
    updateDate: string,
    summary: string,
    link: {
		site: string,
		source: string
	},
    description: string,
    howToMake: string,
    skills: Record<string, string[]>
}

export type Skill = {
	id: string,
    name: string,
    image: string,
    contents?: string[]
}

// ---------- Methods ---------- //
const setItem: Record<string, Function> = {
	imageSrc: (imageId: string): string => {
		return '/logo/' + imageId + '.png'
	},
	state: (websiteId: string): number => {
		const websiteIndex = websiteData.findIndex(ws => ws.id === websiteId)
		return websiteIndex !== -1 ? websiteIndex : 0
	},
	skills: (skillLists: Record<string, string[]>): Skill[] => {
		const rtn: Skill[] = []
		const skillListsKeys = Object.keys(skillLists)
		for (const skillListKey of skillListsKeys) {
			const skillIndex = skills.findIndex(skill => skill.id === skillListKey)
			if (skillIndex !== -1) {
				Object.assign(skills[skillIndex], { contents: skillLists[skillListKey] })
				rtn.push(skills[skillIndex])
			}
		}
		return rtn
	},
	pages: (websites: string[]) => {
		return websites.map(website => {
			const wsIndex: number = websiteLists.findIndex(wsBlock => wsBlock.id === website)
			return websiteLists[wsIndex]
		})
	}
}

const setProductionOrder = (productionDataSet: Framework[]): ProductionOrder => {
	const productionOrder: ProductionOrder = {
		framework: {},
		website: {}
	}
	for (const [fwIdx, fw] of productionDataSet.entries()) {
		productionOrder.framework[fw.id] = fwIdx
		for (const [wsIdx, ws] of fw.pages.entries()) {
			productionOrder.website[ws.id] = wsIdx
		}
	}
	return productionOrder
}

export const setContentToOrigin = <T extends ProductionBaseData | ProductionSectionData>(
	originLists: T[],
	contentLists: Record<string, { content: string | Skill[], url?: string }>,
): T[] => {
	const rtn: T[] = []
	const contents = Object.entries(contentLists)
	for (const [contentskey, contentsValue] of contents) {
		const originList = originLists.find(key => key.id === contentskey)
		if (origin !== undefined) {
			Object.assign(originList, contentsValue)
			rtn.push(originList)
		}
	}
	return rtn
}

// ---------- Values ---------- //
const category: IdName = {
	id: 'production',
	name: 'Production'
}

export const baseData: ProductionBaseData[] = [
	{ id: 'createDate', title: '作成日' },
	{ id: 'updateDate', title: '更新日' },
	{ id: 'site', title: 'サイト' },
	{ id: 'source', title: 'ソース' }
]

export const sectionData: ProductionSectionData[] = [
	{
		id: 'description',
		name: '内容',
		modal: '作成したサイトが果たす主な役割・機能の詳細。このサイトで何ができるのかなど。',
	},
	{
		id: 'howToMake',
		name: '作成方法',
		modal: '使用したフレームワークなどをどのように活用しているか、また、どのようなシステムにしているかなどの説明。',
	},
	{
		id: 'skill',
		name: '使用技術',
		modal: '各言語・フレームワーク内で実際に使用した技術を記載。',
	},
	{
		id: 'image',
		name: '画面イメージ',
		modal: 'イメージとしているが、iframeで挿入しているため、実際のサイト同様に操作できる。',
	},
]

const skills: Skill[] = [
	{ id: 'sass', name: 'Sass', image: 'sass.png' },
	{ id: 'javaScript', name: 'JavaScript', image: 'javascript.png' },
	{ id: 'typeScript', name: 'TypeScript', image: 'typescript.png' },
	{ id: 'jQuery', name: 'jQuery', image: 'jquery.png' },
	{ id: 'react', name: 'React', image: 'react.png'},
	{ id: 'next', name: 'Next', image: 'nextjs.png' },
	{ id: 'gatsby', name: 'Gatsby', image: 'gatsby.png' },
	{ id: 'vue', name: 'Vue', image: 'vue.png' },
	{ id: 'nuxt', name: 'Nuxt', image: 'nuxt.png' },
	{ id: 'node', name: 'Node.js', image: 'nodejs.png' },
	{ id: 'swiper', name: 'Swiper.js', image: 'swiperjs.svg' },
	{ id: 'materialUI', name: 'Material UI', image: 'material-ui.png' },
	{ id: 'vuetify', name: 'Vuetify', image: 'vuetify.png' },
	{ id: 'php', name: 'Php', image: 'php.png' },
	{ id: 'laravel', name: 'Laravel', image: 'laravel.png' },
	{ id: 'mysql', name: 'Mysql', image: 'mysql.png' },
	{ id: 'faunaDB', name: 'FaunaDB(FQL)', image: 'faunadb.png' },
	{ id: 'graphQL', name: 'GarphQL', image: 'graphql.png' },
	{ id: 'windowsBat', name: 'Windows Bat', image: 'windows.png' },
	{ id: 'github', name: 'Github', image: 'github.png' },
	{ id: 'vercel', name: 'Vercel', image: 'vercel.png' },
	{ id: 'aws', name: 'AWS', image: 'aws.png' },
	{ id: 'googleAnalytics', name: 'Google Analytics', image: 'google-analytics.png' }
]

const frameworkData: FrameworkData[] = [
	{ id: 'react', name: 'React', website: ['cat-gallery', 'react-learning'] },
	{ id: 'next', name: 'Next.js', website: ['portfolio-show', 'national-flags', 'next-learning'] },
	{ id: 'gatsby', name: 'Gatsby.js', website: ['atelier-k', 'gatsby-learning'] },
	{ id: 'nuxt', name: 'Nuxt.js', website: ['tequipedia2'] },
	{ id: 'laravel', name: 'Laravel', website: ['tequipedia'] },
]

const websiteData: WebsiteData[] = [
	{
		id: 'cat-gallery',
		name: 'Cat Gallery',
		frameworkId: 'react',
		imageSrc: 'cat-gallery',
		createDate: '2021.9.25',
		updateDate: '2021.9.25',
		summary: '飼い猫を題材にした写真ギャラリーサイト。',
		link: {
			site: 'https://cat-gallery.vercel.app/',
			source: 'https://github.com/moon-gm/cat-gallery'
		},
		description: '写真を年代毎に選択して月毎にアルバム表示。Viewを押下で原寸サイズを表示。英語の復習も兼ねて全編英語で作成。',
		howToMake: 'Create React App + Material UIで作成。',
		skills: {
			react: ['create-react-app', 'react-router'],
			materialUI: ['material-ui-core', 'material-ui-icons'],
			windowsBat: ['バッチで画像配置'],
			github: ['リポジトリ利用'],
			vercel: ['ホスティング利用']
		}
	},
	{
		id: 'react-learning',
		name: 'React Learning',
		frameworkId: 'react',
		imageSrc: 'react',
		createDate: '2020.6.5',
		updateDate: '2020.7.24',
		summary: 'Reactの学習内容をそのまま反映させていく学習サイト。',
		link: {
			site: 'https://moon-gm.github.io/react-learning',
			source: 'https://github.com/moon-gm/react-learning'
		},
		description: 'React学習サイト。Reactで学んだことをそのままアウトプット。Reactで一番最初に作ったサイト。',
		howToMake: 'JavascriptのフレームワークのReactで作成。学んだことを項目ごとにコンポーネント化してボタン操作でページを書き換え、素早くアクセスできるようReactの良さを出していく。CSSはnode-sassを使用してSassをそのままコンポーネントにインポートして使用。',
		skills: {
			react: ['スワイプ（react-swipeable-views）', 'モーダルウィンドウ（react-modal）', 'コードハイライト（react-syntax-highlighter）', 'ファイルドロップ（react-dropzone）', 'アイテムドラッグ（react-draggable）', '型チェック（prop-types）', 'ルーター（react-router-dom）', '範囲外クリック（react-onclickoutside）'],
			javaScript: ['sessionStorage'],
			sass: ['animation', 'レスポンシブ'],
			github: ['リポジトリ利用', 'Github Pages']
		}
	},
	{
		id: 'portfolio-show',
		name: 'Portfolio Show',
		frameworkId: 'next',
		imageSrc: 'portfolio-show',
		createDate: '2020.9.15',
		updateDate: '2021.9.15',
		summary: 'Next.jsで作成の当ポートフォリオサイト。',
		link: {
			site: 'https://route-eight.vercel.app/',
			source: 'https://github.com/moon-gm/route'
		},
		description: '自身で作成したサイトをまとめて、どのように作成したかなどを記載当サイト。',
		howToMake: 'Next.js + TypeScriptで作成。Swiper.jsでカバーフロー表示',
		skills: {
			next: ['API Routes'],
			react: ['モーダルウィンドウ（react-modal）', 'Hooks'],
			typeScript: [''],
			swiper: ['coverflow', 'swiper-react-component'],
			sass: ['animation', 'レスポンシブ'],
			github: ['リポジトリ利用'],
			vercel: ['ホスティング利用']
		}
	},
	{
		id: 'national-flags',
		name: 'National Flags',
		frameworkId: 'next',
		imageSrc: 'national-flags',
		createDate: '2020.8.26',
		updateDate: '2020.10.13',
		summary: 'Next.js + FaunaDB。国旗を軸とした国データ検索・登録アプリケーション。Node.jsで画像アップロード処理を実装。',
		link: {
			site: 'https://national-flags.vercel.app/',
			source: 'https://github.com/moon-gm/national-flags'
		},
		description: '全世界または、エリアごとに国データを表示したり、人口や面積などでランキング表示させたりする。また、検索画面で表示データに基づいた値の入力で、ヒットした国を表示させる。データ編集画面からは新規データ登録・既存のデータ編集ができる。',
		howToMake: 'ReactのフレームワークのNext.jsとクラウドデータベースのFaunaDBで作成。トップ画面からは、エリアのボタンを押すとサーバーサイドでAPIを実行し、DBからAPIに基づいたデータを取ってくる。各エリアの画面に移動すると、「国名一覧」から選択した国へジャンプ、「ランキング」からは、JS制御による値に基づいたソートができる。データ編集の管理画面へは簡易的にパスワード(register_access)を設定してアクセス制限をしている。また、画像はAjaxでアップロードしてプレビュー表示し、formidable,fs,utilなどのプラグインを用いてサーバにアップロード。',
		skills: {
			next: ['API Routes', 'next-router'],
			faunaDB: ['配列関連（Map, Paginate, Lambda）', 'レコード・テーブル関連（Index, Collection, Ref, Match）', 'CRUD関連（Create, Get, Update, Delete）'],
			react: ['Hooks'],
			jQuery: ['Ajax'],
			node: ['formidable(formData操作)', 'fs（ファイルシステム）', 'util（ユーティリティ）'],
			javaScript: ['dataURL, Base64', 'sessionStorage', 'UA判定', 'Form-Data', 'prompt'],
			sass: ['レスポンシブ'],
			github: ['リポジトリ利用'],
			vercel: ['ホスティング利用', 'Secret Key', 'vercel-cli']
		}
	},
	{
		id: 'next-learning',
		name: 'Next Learning',
		frameworkId: 'next',
		imageSrc: 'next',
		createDate: '2020.7.21',
		updateDate: '2020.8.17',
		summary: 'Next.js学習サイト。',
		link: {
			site: 'https://next-learning-teal.vercel.app/',
			source: 'https://github.com/moon-gm/next-learning'
		},
		description: 'Next.jsで、学習内容をそのままサイトにして自身でも活用できるように作成。',
		howToMake: 'Next.jsで作成。CSSはnode-sass',
		skills: {
			next: ['API Routes'],
			react: ['スワイプ（react-swipeable-views）', 'Hooks'],
			node: ['node-sass'],
			sass: ['animation', 'レスポンシブ'],
			github: ['リポジトリ利用'],
			vercel: ['ホスティング利用']
		}
	},
	{
		id: 'atelier-k',
		name: 'Atelier K',
		frameworkId: 'gatsby',
		imageSrc: 'cat-gallery',
		createDate: '2020.5.6',
		updateDate: '2020.6.30',
		summary: '飼い猫を題材にした写真ギャラリーサイト。',
		link: {
			site: 'https://moon-gm.github.io/atelier-k',
			source: 'https://github.com/moon-gm/atelier-k'
		},
		description: '写真を年代別に一覧表示し、月別に表示。画像を押下で原寸サイズを表示。英語の復習も兼ねて全編英語で作成。Gatsby.jsで初めて作成したサイト。',
		howToMake: 'Gatsby.jsで作成。データやファイルはGraphQLで取得。画像は、プラグインの「gatsby-image」を使うことで最適化され、遅延のない快適な画面表示。CSSは、プラグインの「gatsby-plugin-sass」',
		skills: {
			gatsby: ['Routes', 'gatsby-image', 'gatsby-plugin-sass'],
			graphQL: ['gatsby-graphql'],
			javaScript: ['sessionStorage'],
			sass: ['レスポンシブ'],
			github: ['リポジトリ利用', 'Github Pages']
		}
	},
	{
		id: 'gatsby-learning',
		name: 'Gatsby Learning',
		frameworkId: 'gatsby',
		imageSrc: 'gatsby',
		createDate: '2020.7.23',
		updateDate: '2020.7.30',
		summary: 'Gatsby.js学習サイト。',
		link: {
			site: 'https://gatsby-learning-bay.vercel.app/',
			source: 'https://github.com/moon-gm/gatsby-learning'
		},
		description: 'Gatsby.jsで、学習内容をそのままサイトにして自身でも活用できるように作成。',
		howToMake: 'Gatsby.jsで作成。Gatsby.jsの魅力のGraphQLを用い、データの取得を行う。',
		skills: {
			gatsby: ['Routes'],
			react: ['スワイプ（react-swipeable-views）'],
			graphQL: ['gatsby-graphql'],
			javaScript: ['sessionStorage'],
			sass: ['animation', 'レスポンシブ'],
			github: ['リポジトリ利用'],
			vercel: ['ホスティング利用']
		}
	},
	{
		id: 'tequipedia2',
		name: 'Tequipedia2',
		frameworkId: 'nuxt',
		imageSrc: 'tequipedia',
		createDate: '2021.9.15',
		updateDate: '2021.9.20',
		summary: 'テキーラを題材にした商品検索・情報サイト',
		link: {
			site: 'https://tequipedia.vercel.app/',
			source: 'https://github.com/moon-gm/tequipedia'
		},
		description: 'NuxtとVuetifyを利用して既にLaravelで作成している「テキーラ全書」をリニューアル',
		howToMake: 'VueフレームワークのNuxt.jsで作成。データはEC2に配置しているデータベースを利用',
		skills: {
			nuxt: ['Routing', 'API'],
			typeScript: [''],
			vue: [''],
			vuetify: ['要素は全てVuetifyコンポーネント利用'],
			node: ['express', 'axios', 'serverless-mysql'],
			mysql: ['EC2サーバーに配置'],
			github: ['リポジトリ利用'],
			vercel: ['ホスティング利用']
		}
	},
	{
		id: 'tequipedia',
		name: 'テキーラ全書（運用停止中）',
		frameworkId: 'laravel',
		imageSrc: 'tequipedia',
		createDate: '2020.2.18',
		updateDate: '2021.9.15',
		summary: 'テキーラを題材にした物品紹介サイト。',
		link: {
			site: 'http://www.tequipedia.com',
			source: 'https://github.com/moon-gm/tequila'
		},
		description: '各テキーラ商品をコンポーネント化し、ブランド別・蒸留所別など用途に合わせて出し分けてコンテンツを紹介する。AWSのEC2を利用し、Phpで動的に商品登録のできるページを作成済だが、ログインなどのセキュリティの実装をしていないため、導線は用意していない。（URLを直入力でアクセス可能。パスは「/form-input」）',
		howToMake: 'PHPフレームワークのLaravelで作成。商品紹介ページでは、Mysqlで作成のDBからLaravelのMigrationで接続し表示し、jQueryで表示切替処理をする。 CSSはNode.jsを使用してSassをコンパイル。AWSのEC2にデプロイしている。',
		skills: {
			laravel: ['コマンド系（artisan）', 'MVC（主にController）', 'ファサード（DBやStorage、Logなど）'],
			php: ['配列関連（array_filter, array_key_exists, array_merge, asort...）'],
			jQuery: ['アニメーション系（toggle, slideIn, fadeOut）'],
			sass: ['@mixin', 'レスポンシブ'],
			mysql: ['DB系（show, drop, create）', 'テーブル系（show, drop, create, alter, desc）', 'レコード系（select, insert, delete, update）'],
			github: ['リポジトリ利用'],
			aws: ['EC2(インスタンス)', 'Route53(ドメイン取得)', 'Elastic IP'],
			googleAnalytics: ['アクセスデータ分析']
		}
	},
]

// ---------- Set Content Value ---------- //
const websiteLists: Website[] = websiteData.map(website => {
	return {
		id: website.id,
		name: website.name,
		URL: '/' + category.id + '/' + website.frameworkId + '/' + website.id,
		state: setItem.state(website.id),
		imageSrc: setItem.imageSrc(website.imageSrc),
		createDate: website.createDate,
		updateDate: website.updateDate,
		summary: website.summary,
		link: {
			site: website.link.site,
			source: website.link.source
		},
		description: website.description,
		howToMake: website.howToMake,
		skills: setItem.skills(website.skills)
	}
})

const frameworkLists: Framework[] = frameworkData.map(framework => {
	return {
		id: framework.id,
		name: framework.name,
		state: framework.id,
		imageSrc: setItem.imageSrc(framework.id),
		pages: setItem.pages(framework.website)
	}
})

const production: Category<Framework> = {
	id: category.id,
	name: category.name,
	URL: '/' + category.id,
	state: category.id,
	dataSet: frameworkLists
}

export const productionOrder: ProductionOrder = setProductionOrder(frameworkLists)

export default production
