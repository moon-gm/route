import PageLayout from '../../components/pageLayout'

const GatsbyJS = ({info, fw, pg}) => {
	const pageData = {
		// Webページタイトル
		head: info[fw.Gatsby].FW,

		// サイトタイトル
		title: info[fw.Gatsby].Page[pg.GatsbyLearning].Title,
		logo: info[fw.Gatsby].Img,

		// 作成日・更新日
		createDate: info[fw.Gatsby].Page[pg.GatsbyLearning].CreateDate,
		upDate: "2020.7.30",

		// 概要
		summary: "Gatsby.jsの学習内容をそのまま反映させていく学習サイト。",

		// サイトリンク・Githubソース・画面イメージ
		link: {
			site: "https://gatsby-learning-bay.vercel.app/",
			source: "https://github.com/moon-gm/gatsby-learning",
		},

		// 内容
		contents: "現在、独学で学んでいるGatsby.jsで、学習内容をそのままサイトにして自身でも活用できるように作成。ページごとにURLのパスを付与されるGatsby.jsの仕様にのっとったサイトとなっている。",

		// 作成方法
		wayToMake: "ReactのフレームワークのGatsby.jsで作成。学んだことを項目ごとにコンポーネント化してボタン操作でページを書き換え、素早くアクセスできるようReactの良さを出していく。CSSはnode-sassを使用してSassをそのままコンポーネントにインポートして使用。Gatsby.jsの魅力のGraphQLを用い、データの取得を行う。",

		// 使用技術・FW
		skill: [
			{title: "Gatsby", image: "gatsby.png", contents: ["Routes", "Gatsby-GraphQL"]},
			{title: "React", image: "react.png", contents: ["スワイプ（react-swipeable-views）"]},
			{title: "GarphQL", image: "graphql.png", contents: ["gatsby-graphql"]},
			{title: "Node.js", image: "nodejs.png", contents: ["npm"]},
			{title: "JavaScript", image: "javascript.png", contents: ["sessionStorage"]},
			{title: "Sass(css)", image: "sass.png", contents: ["@mixin", "@Keyframes", "animation", "レスポンシブ"]},
		]
	}
	return <PageLayout pageData={pageData}/>
}
export default GatsbyJS
