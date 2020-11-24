import PageLayout from '../../components/pageLayout'

const PortfolioShow = ({info, fw, pg}) => {
	const pageData = {
		// Webページタイトル
		head: info[fw.Next].FW,

		// サイトタイトル
		title: info[fw.Next].Page[pg.PortfolioShow].Title,
		logo: info[fw.Next].Img,

		// 作成日・更新日
		createDate: info[fw.Next].Page[pg.PortfolioShow].CreateDate,
		upDate: "2020.11.25",

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

		// 使用技術・FW
		skill: [
			{title: "Next", image: "nextjs.png", contents: ["API Routes"]},
			{title: "React", image: "react.png", contents: ["モーダルウィンドウ（react-modal）", "Hooks（useState, useEffect）"]},
			{title: "Node.js", image: "nodejs.png", contents: ["npm"]},
			{title: "Swiper.js", image: "swiperjs.svg", contents: ["coverflow", "Swiper React Component"]},
			{title: "JavaScript", image: "javascript.png", contents: ["Object操作（配列含む）", "map", "JSON"]},
			{title: "Sass(css)", image: "sass.png", contents: ["@mixin", "@Keyframes", "animation", "レスポンシブ"]},
			{title: "Github", image: "github.png", contents: ["Gitリポジトリ"]},
			{title: "Vercel", image: "vercel.png", contents: ["ホスティングサーバ"]},
		]
	}
	return <PageLayout pageData={pageData}/>
}
export default PortfolioShow
