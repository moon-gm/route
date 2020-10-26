import PageLayout from '../../components/pageLayout'

const PortfolioShow = ({info, fw, pg}) => {
	const pageData = {
		// Webページタイトル
		head: info[fw.Next].FW,

		// サイトタイトル
		title: info[fw.Next].Page[pg.PortfolioShow].Title,
		logo: info[fw.Next].Img,

		// 作成日
		createDate: info[fw.Next].Page[pg.PortfolioShow].CreateDate,

		// 概要
		summary: "Next.jsで作成の当サイト。他に作成したものをまとめたポートフォリオサイト。",

		// サイトリンク・Githubソース・画面イメージ
		link: {
			site: "https://route-eight.vercel.app/",
			source: "https://github.com/moon-gm/route",
		},

		// 内容
		contents: "自身で作成したサイトを取りまとめ、サイトごとにどのように作成したかなどを記載している。",

		// 作成方法
		wayToMake: "ReactのフレームワークのNext.jsで作成。ヘッダーの「Production」タブをクリックで、FW別に全ての作成サイトリストを表示。リストまたは画像をクリックで詳細を表示。一部jQueryと連携して画面内での描画操作をしている。アニメーションは全てCSSのみで付与している（条件をJavaScriptで制御）",

		// 使用フレームワーク
		FW: [
			{ text: "Next", image: "nextjs.png" },
			{ text: "React", image: "react.png" },
			{ text: "Sass", image: "sass.png" },
			{ text: "jQuery", image: "jquery.png" },
			{ text: "Node.js", image: "nodejs.png" },
			{ text: "JavaScript", image: "javascript.png" },
		],

		// 使用技術
		skill: [
			{title: "Next", contents: ["API Routes"]},
			{title: "React", contents: ["スワイプ（react-swipeable-views）", "モーダルウィンドウ（react-modal）", "Hooks（useState, useEffect）"]},
			{title: "Node.js", contents: ["npm"]},
			{title: "JavaScript", contents: ["sessionStorage"]},
			{title: "Sass(css)", contents: ["@mixin", "@Keyframes", "animation", "レスポンシブ"]},
		]
	}
	return <PageLayout pageData={pageData}/>
}
export default PortfolioShow
