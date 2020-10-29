import PageLayout from '../../components/pageLayout'

const AtelierK = ({info, fw, pg}) => {
	const pageData = {
		// Webページタイトル
		head: info[fw.Gatsby].FW,

		// サイトタイトル
		title: info[fw.Gatsby].Page[pg.AtelierK].Title,
		logo: info[fw.Gatsby].Img,

		// 作成日・更新日
		createDate: info[fw.Gatsby].Page[pg.AtelierK].CreateDate,
		upDate: "2020.6.30",

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

		// 使用技術・FW
		skill: [
			{title: "Gatsby", image: "gatsby.png", contents: ["Routes", "gatsby-image", "Gatsby-GraphQL"]},
			{title: "React", image: "react.png", contents: [""]},
			{title: "Node.js", image: "nodejs.png", contents: ["npm"]},
			{title: "GarphQL", image: "graphql.png", contents: ["gatsby-graphql"]},
			{title: "JavaScript", image: "javascript.png", contents: ["sessionStorage"]},
			{title: "Sass(css)", image: "sass.png", contents: ["@mixin", "レスポンシブ"]},
			{title: "Github", image: "github.png", contents: ["Gitリポジトリ", "Github Pages"]},
		]
	}
	return <PageLayout pageData={pageData}/>
}
export default AtelierK
