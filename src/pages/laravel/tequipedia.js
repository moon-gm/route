import PageLayout from '../../components/pageLayout'

const Tequipedia = ({info}) => {
	const pageData = {
		// Webページタイトル
		head: info[3].FW,

		// サイトタイトル
		title: info[3].Page[0].Title,

		// 概要
		summary: "テキーラを題材にした物品紹介サイト。",

		// サイトリンク・Githubソース・画面イメージ
		link: {
			site: "https://moon-gm.github.io/tequipedia/",
			source: "https://github.com/moon-gm/tequila",
		},

		// 内容
		contents: "各テキーラ商品をコンポーネント化し、ブランド別・蒸留所別など用途に合わせて出し分けてコンテンツを紹介する。動的に商品登録のできるページを作成済だが、現在、サーバを準備中のため、閲覧のみとなっている。",

		// 作成方法
		wayToMake: "PHPフレームワークのLaravelで作成。商品紹介ページでは、Mysqlで作成のDBからLaravelのMigrationで接続し表示し、jQueryで表示切替処理をする。 CSSはNode.jsを使用してSassをコンパイル。",

		// 使用フレームワーク
		FW: [
			{ text: "Laravel", image: "laravel.png" },
			{ text: "Php", image: "php.jpg" },
			{ text: "jQuery", image: "jquery.png" },
			{ text: "Node.js", image: "nodejs.png" },
			{ text: "Mysql", image: "mysql.png" },
			{ text: "SQL", image: "sql.png" },
		]
	}
	return <PageLayout pageData={pageData}/>
}
export default Tequipedia
