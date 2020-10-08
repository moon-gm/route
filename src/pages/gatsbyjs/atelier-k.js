import PageLayout from '../../components/pageLayout'

const AtelierK = ({info}) => {
	const pageData = {
		// Webページタイトル
		head: info[2].FW,

		// サイトタイトル
		title: info[2].Page[0].Title,

		// 概要
		summary: "飼い猫を題材にした写真ギャラリーサイト。",

		// サイトリンク・Githubソース・画面イメージ
		link: {
			site: "https://moon-gm.github.io/atelier-k",
			source: "https://github.com/moon-gm/atelier-k",
		},

		// 内容
		contents: "写真を年代別に一覧表示し、月別に表示。画像を押下で原寸サイズを表示。英語の復習も兼ねて全編英語で作成。Gatsby.jsで初めて作成したサイト。",

		// 作成方法
		wayToMake: "ReactフレームワークのGatsby.jsで作成。GraphQLでデータやファイルを取得し、Reactコンポーネントにデータを渡してレンダリング。画像は、プラグインの「gatsby-image」を使うことで最適化され、遅延のない快適な画面表示。CSSは、プラグインの「gatsby-plugin-sass」、CSSモジュールを使用の上、Sassで記述。",

		// 使用フレームワーク
		FW: [
			{ text: "Gatsby", image: "gatsby.png" },
			{ text: "React", image: "react.png" },
			{ text: "Sass", image: "sass.png" },
			{ text: "GarphQL", image: "graphql.png" },
			{ text: "Node.js", image: "nodejs.png" },
			{ text: "JavaScript", image: "javascript.png" },
		],

		// 使用技術
		skill: [
			{title: "Gatsby", contents: ["Routes", "gatsby-image", "Gatsby-GraphQL"]},
			{title: "Node.js", contents: ["npm"]},
			{title: "JavaScript", contents: ["sessionStorage"]},
			{title: "Sass(css)", contents: ["@mixin", "レスポンシブ"]},
		]
	}
	return <PageLayout pageData={pageData}/>
}
export default AtelierK
