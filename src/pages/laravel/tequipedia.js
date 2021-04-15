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
		upDate: "2020.11.25",

		// 概要
		summary: "テキーラを題材にした物品紹介サイト。",

		// サイトリンク・Githubソース・画面イメージ
		link: {
			site: "http://www.tequipedia.com",
			source: "https://github.com/moon-gm/tequila",
		},

		// 内容
		contents: "各テキーラ商品をコンポーネント化し、ブランド別・蒸留所別など用途に合わせて出し分けてコンテンツを紹介する。AWSのEC2を利用し、Phpで動的に商品登録のできるページを作成済だが、ログインなどのセキュリティの実装をしていないため、導線は用意していない。（URLを直入力でアクセス可能。パスは「/form-input」）",

		// 作成方法
		wayToMake: "PHPフレームワークのLaravelで作成。商品紹介ページでは、Mysqlで作成のDBからLaravelのMigrationで接続し表示し、jQueryで表示切替処理をする。 CSSはNode.jsを使用してSassをコンパイル。AWSのEC2にデプロイしている。",

		// 使用技術・FW
		skill: [
			{title: "Laravel", image: "laravel.png", contents: ["コマンド系（artisan）", "MVC（主にController）", "ファサード（DBやStorage、Logなど）"]},
			{title: "Php", image: "php.jpg", contents: ["配列関連（array_filter, array_key_exists, array_merge, asort...）"]},
			{title: "jQuery", image: "jquery.png", contents: ["アニメーション系（toggle, slideIn, fadeOut）"]},
			{title: "Node.js", image: "nodejs.png", contents: ["npm"]},
			{title: "Sass(css)", image: "sass.png", contents: ["@mixin", "レスポンシブ"]},
			{title: "Mysql(SQL)", image: "mysql.png", contents: ["DB系（show, drop, create）", "テーブル系（show, drop, create, alter, desc）", "レコード系（select, insert, delete, update）"]},
			{title: "Github", image: "github.png", contents: ["Gitリポジトリ"]},
			{title: "AWS", image: "aws.png", contents: ["EC2", "サーバにSSH接続"]},
		]
	}
	return <PageLayout pageData={pageData}/>
}
export default Tequipedia
