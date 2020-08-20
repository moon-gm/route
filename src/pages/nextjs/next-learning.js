import PageLayout from '../../components/pageLayout'

const NextJS = ({info}) => {
	const pageData = {
		// Webページタイトル
		head: info[1].FW,

		// サイトタイトル
		title: info[1].Page[1].Title,

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
export default NextJS
