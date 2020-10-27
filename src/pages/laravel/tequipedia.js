import PageLayout from '../../components/pageLayout'

const Tequipedia = ({info, fw, pg}) => {
	const pageData = {
		// Webページタイトル
		head: info[fw.Laravel].FW,

		// サイトタイトル
		title: info[fw.Laravel].Page[pg.Tequipedia].Title,
		logo: info[fw.Laravel].Img,

		// 作成日・更新日
		createDate: info[fw.Laravel].Page[pg.Tequipedia].CreateDate,
		upDate: "2020.10.27",

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

		// 使用技術・FW
		skill: [
			{title: "Laravel", image: "laravel.png", contents: ["コマンド系（artisan）", "MVC（主にController）", "ファサード（DBやStorage、Logなど）"]},
			{title: "Php", image: "php.jpg", contents: ["配列関連（array_filter, array_key_exists, array_merge, asort...）"]},
			{title: "jQuery", image: "jquery.png", contents: ["アニメーション系（toggle, slideIn, fadeOut）"]},
			{title: "Node.js", image: "nodejs.png", contents: ["npm"]},
			{title: "Sass(css)", image: "sass.png", contents: ["@mixin", "レスポンシブ"]},
			{title: "Mysql(SQL)", image: "mysql.png", contents: ["DB系（show, drop, create）", "テーブル系（show, drop, create, alter, desc）", "レコード系（select, insert, delete, update）"]},
		]
	}
	return <PageLayout pageData={pageData}/>
}
export default Tequipedia
