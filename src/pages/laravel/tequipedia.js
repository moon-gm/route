import PageLayout from '../../components/pageLayout'

const Tequipedia = ({info, fw, pg}) => {
	const pageData = {
		// Webページタイトル
		head: info[fw.Laravel].FW,

		// サイトタイトル
		title: info[fw.Laravel].Page[pg.Tequipedia].Title,
		logo: info[fw.Laravel].Img,

		// 作成日
		createDate: info[fw.Laravel].Page[pg.Tequipedia].CreateDate,

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
		],

		// 使用技術
		skill: [
			{title: "Laravel", contents: ["コマンド系（artisan）", "MVC（主にController）", "ファサード（DBやStorage、Logなど）"]},
			{title: "Php", contents: ["配列関連（array_filter, array_key_exists, array_merge, asort...）"]},
			{title: "jQuery", contents: ["アニメーション系（toggle, slideIn, fadeOut）"]},
			{title: "Node.js", contents: ["npm"]},
			{title: "Sass(css)", contents: ["@mixin", "レスポンシブ"]},
			{title: "Mysql(SQL)", contents: ["DB系（show, drop, create）", "テーブル系（show, drop, create, alter, desc）", "レコード系（select, insert, delete, update）"]},
		]
	}
	return <PageLayout pageData={pageData}/>
}
export default Tequipedia
