import PageLayout from '../../components/pageLayout'

const NextJS = ({info, fw, pg}) => {
	const pageData = {
		// Webページタイトル
		head: info[fw.Next].FW,

		// サイトタイトル
		title: info[fw.Next].Page[pg.NextLearning].Title,
		logo: info[fw.Next].Img,

		// 作成日・更新日
		createDate: info[fw.Next].Page[pg.NextLearning].CreateDate,
		upDate: "2020.8.17",

		// 概要
		summary: "Next.jsの学習内容をそのまま反映させていく学習サイト。",

		// サイトリンク・Githubソース・画面イメージ
		link: {
			site: "https://next-learning-teal.vercel.app/",
			source: "https://github.com/moon-gm/next-learning",
		},

		// 内容
		contents: "現在、独学で学んでいるNext.jsで、学習内容をそのままサイトにして自身でも活用できるように作成。React.jsでは実現させていなかったURLのパスを付与したサイトとなっている。",

		// 作成方法
		wayToMake: "ReactのフレームワークのNext.jsで作成。学んだことを項目ごとにコンポーネント化してボタン操作でページを書き換え、素早くアクセスできるようReactの良さを出していく。CSSはnode-sassを使用してSassをそのままコンポーネントにインポートして使用。",

		// 使用技術・FW
		skill: [
			{title: "Next", image: "nextjs.png", contents: ["API Routes"]},
			{title: "React", image: "react.png", contents: ["スワイプ（react-swipeable-views）", "Hooks（useState, useEffect）"]},
			{title: "Node.js", image: "nodejs.png", contents: ["npm"]},
			{title: "jQuery", image: "jquery.png", contents: [""]},
			{title: "JavaScript", image: "javascript.png", contents: [""]},
			{title: "Sass(css)", image: "sass.png", contents: ["@mixin", "@Keyframes", "animation", "レスポンシブ"]},
			{title: "Github", image: "github.png", contents: ["Gitリポジトリ"]},
			{title: "Vercel", image: "vercel.png", contents: ["ホスティングサーバ"]},
		]
	}
	return <PageLayout pageData={pageData}/>
}
export default NextJS
