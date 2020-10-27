import PageLayout from '../../components/pageLayout'

const NationalFlags = ({info, fw, pg}) => {
	const pageData = {
		// Webページタイトル
		head: info[fw.Next].FW,

		// サイトタイトル
		title: info[fw.Next].Page[pg.NationalFlags].Title,
		logo: info[fw.Next].Img,

		// 作成日・更新日
		createDate: info[fw.Next].Page[pg.NationalFlags].CreateDate,
		upDate: "2020.10.13",

		// 概要
		summary: "Next.jsとFaunaDBで作成した、国旗を軸とした国データ検索・登録アプリケーション。Node.jsで画像アップロード処理を実装。",

		// サイトリンク・Githubソース・画面イメージ
		link: {
			site: "https://national-flags.vercel.app/",
			source: "https://github.com/moon-gm/national-flags",
		},

		// 内容
		contents: "全世界または、エリアごとに国データを表示したり、人口や面積などでランキング表示させたりする。また、検索画面で表示データに基づいた値の入力で、ヒットした国を表示させる。データ編集画面からは新規データ登録・既存のデータ編集ができる。",

		// 作成方法
		wayToMake: "ReactのフレームワークのNext.jsとクラウドデータベースのFaunaDBで作成。トップ画面からは、エリアのボタンを押すとサーバーサイドでAPIを実行し、DBからAPIに基づいたデータを取ってくる。各エリアの画面に移動すると、「国名一覧」から選択した国へジャンプ、「ランキング」からは、JS制御による値に基づいたソートができる。データ編集の管理画面へは簡易的にパスワード(register_access)を設定してアクセス制限をしている。また、画像はAjaxでアップロードしてプレビュー表示し、formidable,fs,utilなどのプラグインを用いてサーバにアップロード。",

		// 使用技術・FW
		skill: [
			{title: "Next", image: "nextjs.png", contents: ["API Routesでサーバアクセス", "next-router"]},
			{title: "FaunaDB(FQL)", image: "faunadb.png", contents: ["配列関連（Map, Paginate, Lambda）", "レコード・テーブル関連（Index, Collection, Ref, Match）", "CRUD関連（Create, Get, Update, Delete）"]},
			{title: "React", image: "react.png", contents: ["Hooks（useState, useEffect）"]},
			{title: "jQuery", image: "jquery.png", contents: ["Ajax"]},
			{title: "Node.js", image: "nodejs.png", contents: ["formidable(formData操作)", "fs（ファイルシステム）", "util（ユーティリティ）"]},
			{title: "JavaScript", image: "javascript.png", contents: ["dataURL, Base64", "sessionStorage", "fetch", "ユーザーエージェント判定", "Form-Data", "promptを用いたパスワード設定"]},
			{title: "Sass(css)", image: "sass.png", contents: ["@mixin", "レスポンシブ"]},
		]
	}
	return <PageLayout pageData={pageData}/>
}
export default NationalFlags
