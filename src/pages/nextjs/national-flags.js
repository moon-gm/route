import PageLayout from '../../components/pageLayout'

const NationalFlags = ({info}) => {
	const pageData = {
		// Webページタイトル
		head: info[1].FW,

		// サイトタイトル
		title: info[1].Page[2].Title,

		// 概要
		summary: "Next.jsとFaunaDBで作成した、国旗を軸とした国データ検索・登録アプリケーション。",

		// サイトリンク・Githubソース・画面イメージ
		link: {
			site: "https://national-flags.vercel.app/",
			source: "https://github.com/moon-gm/national-flags",
		},

		// 内容
		contents: "全世界または、エリアごとに国データを表示したり、人口や面積などでランキング表示させたりする。また、検索画面で表示データに基づいた値の入力で、ヒットした国を表示させる。データ編集画面からは新規データ登録・既存のデータ編集ができる。",

		// 作成方法
		wayToMake: "ReactのフレームワークのNext.jsとクラウドデータベースのFaunaDBで作成。トップ画面からは、エリアのボタンを押すとサーバーサイドでAPIを実行し、DBからAPIに基づいたデータを取ってくる。各エリアの画面に移動すると、「国名一覧」から選択した国へジャンプ、「ランキング」からは、JS制御による値に基づいたソートができる。データ編集の管理画面へは簡易的にパスワード(register_access)を設定してアクセス制限をしている。",

		// 使用フレームワーク
		FW: [
			{ text: "Next", image: "nextjs.png" },
			{ text: "FaunaDB", image: "faunadb.png" },
			{ text: "React", image: "react.png" },
			{ text: "Sass", image: "sass.png" },
			{ text: "jQuery", image: "jquery.png" },
			{ text: "Node.js", image: "nodejs.png" },
			{ text: "JavaScript", image: "javascript.png" },
		]
	}
	return <PageLayout pageData={pageData}/>
}
export default NationalFlags
