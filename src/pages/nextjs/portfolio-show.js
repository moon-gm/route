import PageLayout from '../../components/pageLayout'

const PortfolioShow = ({info}) => {
	const pageData = {
		// Webページタイトル
		head: info[1].FW,

		// サイトタイトル
		title: info[1].Page[1].Title,

		// 概要
		summary: "Next.jsで作成の当サイト。他に作成したものをまとめたポートフォリオサイト。現在の新作。",

		// サイトリンク・Githubソース・画面イメージ
		link: {
			site: "https://route-eight.vercel.app/",
			source: "https://github.com/moon-gm/route",
		},

		// 内容
		contents: "自身で作成したサイトを取りまとめ、サイトごとにどのように作成したかなどを記載している。",

		// 作成方法
		wayToMake: "ReactのフレームワークのNext.jsで作成。ヘッダータブをクリックで、対象のフレームワークで作成したサイトのリストを表示。リストまたは画像をクリックで詳細を表示。一部jQueryと連携して画面内での描画操作をしている。アニメーションは全てCSSのみで付与している（条件をJavaScriptで制御）",

		// 使用フレームワーク
		FW: [
			{ text: "Next", image: "nextjs.png" },
			{ text: "React", image: "react.png" },
			{ text: "Sass", image: "sass.png" },
			{ text: "jQuery", image: "jquery.png" },
			{ text: "Node.js", image: "nodejs.png" },
			{ text: "JavaScript", image: "javascript.png" },
		]
	}
	return <PageLayout pageData={pageData}/>
}
export default PortfolioShow
