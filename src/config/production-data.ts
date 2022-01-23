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

export type Skill = {
    title: string,
    image: string,
    contents?: string[]
}

export type FW = {
    id: string,
    name: string,
    website?: IdName[]
}

export type WS = {
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

export type FW2 = {
    website: IdName[]
}

export type WS2 = {
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

const skills: Record<string, Skill> = {
	sass: { title: 'Sass', image: 'sass.png' },
	javaScript: { title: 'JavaScript', image: 'javascript.png' },
	typeScript: { title: 'TypeScript', image: 'typescript.png' },
	jQuery: { title: 'jQuery', image: 'jquery.png' },
	react: { title: 'React', image: 'react.png'},
	next: { title: 'Next', image: 'nextjs.png' },
	gatsby: { title: 'Gatsby', image: 'gatsby.png' },
	vue: { title: 'Vue', image: 'vue.png' },
	nuxt: { title: 'Nuxt', image: 'nuxt.png' },
	node: { title: 'Node.js', image: 'nodejs.png' },
	swiper: { title: 'Swiper.js', image: 'swiperjs.svg' },
	materialUI: { title: 'Material UI', image: 'material-ui.png' },
	vuetify: { title: 'Vuetify', image: 'vuetify.png' },
	php: { title: 'Php', image: 'php.png' },
	laravel: { title: 'Laravel', image: 'laravel.png' },
	mysql: { title: 'Mysql', image: 'mysql.png' },
	faunaDB: { title: 'FaunaDB(FQL)', image: 'faunadb.png' },
	graphQL: { title: 'GarphQL', image: 'graphql.png' },
	windowsBat: { title: 'Windows Bat', image: 'windows.png' },
	github: { title: 'Github', image: 'github.png' },
	vercel: { title: 'Vercel', image: 'vercel.png' },
	aws: { title: 'AWS', image: 'aws.png' },
	googleAnalytics: { title: 'Google Analytics', image: 'google-analytics.png' }
}

const frameworkIds: Record<string, IdName> = {
	react: { id: 'react', name: 'React' },
	next: { id: 'next', name: 'Next.js' },
	gatsby: { id: 'gatsby', name: 'Gatsby.js' },
	nuxt: { id: 'nuxt', name: 'Nuxt.js' },
	laravel: { id: 'laravel', name: 'Laravel' },
}

const websiteIds: Record<string, IdName> = {
	catGallery: { id: 'cat-gallery', name: 'Cat Gallery' },
	reactLearning: { id: 'react-learning', name: 'React Learning' },
	portfolioShow: { id: 'portfolio-show', name: 'Portfolio Show' },
	nationalFlags: { id: 'national-flags', name: 'National Flags' },
	nextLearning: { id: 'next-learning', name: 'Next Learning' },
	atelierK: { id: 'atelier-k', name: 'Atelier K' },
	gatsbyLearning: { id: 'gatsby-learning', name: 'Gatsby Learning' },
	tequipedia2: { id: 'tequipedia2', name: 'Tequipedia2' },
	tequipedia: { id: 'tequipedia', name: 'テキーラ全書（運用停止中）' },
}

// ---------- Methods ---------- //
const insertContents = <T extends FW | WS>(
	idBlock: IdName,
	contentsBlock: FW2 | WS2
): T => {
	Object.assign(idBlock, contentsBlock)
	return idBlock as T
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

const setImageSrc = (frameworkId: string): string => {
	return '/logo/' + frameworkId + '.png'
}

const setWebsiteURL = (
	frameworkId: string,
	websiteId: string
): string => {
	return '/' + category.id + '/' + frameworkId + '/' + websiteId
}

const setState = (websiteId: string): number => {
	const websiteIndex = Object.entries(ws).findIndex(ws => (ws[1] as IdName).id === websiteId)
	return websiteIndex !== -1 ? websiteIndex : 0
}

const setSkills = (skillLists: Record<string, string[]>): Skill[] => {
	const rtn: Skill[] = []
	const skillKeys = Object.keys(skills)
	const skillListsKeys = Object.keys(skillLists)
	for (const skillList of skillListsKeys) {
		const skillKey = skillKeys.find(key => key === skillList)
		if (skillKey !== undefined) {
			Object.assign(skills[skillKey], { contents: skillLists[skillKey] })
			rtn.push(skills[skillKey])
		}
	}
	return rtn
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

// ---------- Set Value ---------- //
const ws: Record<string, WS> = {
	catGallery: insertContents<WS>(websiteIds.catGallery, {
		frameworkId: frameworkIds.react.id,
		imageSrc: websiteIds.catGallery.id,
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
	}),
	reactLearning: insertContents<WS>(websiteIds.reactLearning, {
		frameworkId: frameworkIds.react.id,
		imageSrc: frameworkIds.react.id,
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
	}),
	portfolioShow: insertContents<WS>(websiteIds.portfolioShow, {
		frameworkId: frameworkIds.next.id,
		imageSrc: websiteIds.portfolioShow.id,
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
	}),
	nationalFlags: insertContents<WS>(websiteIds.nationalFlags, {
		frameworkId: frameworkIds.next.id,
		imageSrc: websiteIds.nationalFlags.id,
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
	}),
	nextLearning: insertContents<WS>(websiteIds.nextLearning, {
		frameworkId: frameworkIds.next.id,
		imageSrc: frameworkIds.next.id,
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
	}),
	atelierK: insertContents<WS>(websiteIds.atelierK, {
		frameworkId: frameworkIds.gatsby.id,
		imageSrc: websiteIds.catGallery.id,
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
	}),
	gatsbyLearning: insertContents<WS>(websiteIds.gatsbyLearning, {
		frameworkId: frameworkIds.gatsby.id,
		imageSrc: frameworkIds.gatsby.id,
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
	}),
	tequipedia2: insertContents<WS>(websiteIds.tequipedia2, {
		frameworkId: frameworkIds.nuxt.id,
		imageSrc: websiteIds.tequipedia.id,
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
			vue: [''],
			vuetify: ['要素は全てVuetifyコンポーネント利用'],
			node: ['express', 'axios', 'serverless-mysql'],
			mysql: ['EC2サーバーに配置'],
			github: ['リポジトリ利用'],
			vercel: ['ホスティング利用']
		}
	}),
	tequipedia: insertContents<WS>(websiteIds.tequipedia, {
		frameworkId: frameworkIds.laravel.id,
		imageSrc: websiteIds.tequipedia.id,
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
	}),
}
const fw: Record<string, FW> = {
	react: insertContents<FW>(frameworkIds.react, {
		website: [websiteIds.catGallery, websiteIds.reactLearning]
	}),
	next: insertContents<FW>(frameworkIds.next, {
		website: [websiteIds.portfolioShow, websiteIds.nationalFlags, websiteIds.nextLearning]
	}),
	gatsby: insertContents<FW>(frameworkIds.gatsby, {
		website: [websiteIds.atelierK, websiteIds.gatsbyLearning]
	}),
	nuxt: insertContents<FW>(frameworkIds.nuxt, {
		website: [websiteIds.tequipedia2]
	}),
	laravel: insertContents<FW>(frameworkIds.laravel, {
		website: [websiteIds.tequipedia]
	}),
}

const websiteLists: Website[] = Object.entries(ws).map(website => {
	return {
		id: website[1].id,
		name: website[1].name,
		URL: setWebsiteURL(website[1].frameworkId, website[1].id),
		state: setState(website[1].id),
		imageSrc: setImageSrc(website[1].imageSrc),
		createDate: website[1].createDate,
		updateDate: website[1].updateDate,
		summary: website[1].summary,
		link: {
			site: website[1].link.site,
			source: website[1].link.source
		},
		description: website[1].description,
		howToMake: website[1].howToMake,
		skills: setSkills(website[1].skills)
	}
})

const frameworkLists: Framework[] = Object.entries(fw).map(framework => {
	return {
		id: framework[1].id,
		name: framework[1].name,
		state: framework[1].id,
		imageSrc: setImageSrc(framework[1].id),
		pages: framework[1].website.map(website => {
			const wsIndex: number = websiteLists.findIndex(wsBlock => wsBlock.id === website.id)
			return websiteLists[wsIndex]
		})
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
