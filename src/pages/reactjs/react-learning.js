import PageLayout from '../../components/pageLayout'

const ReactJS = ({info}) => {
	const pageData = {
		// Webページタイトル
		head: info[0].FW,

		// サイトタイトル
		title: info[0].Page[0].Title,

		// 概要
		summary: "Reactの学習内容をそのまま反映させていく学習サイト。",

		// サイトリンク・Githubソース・画面イメージ
		link: {
			site: "https://moon-gm.github.io/react-learning",
			source: "https://github.com/moon-gm/react-learning",
		},

		// 内容
		contents: "現在、独学で学んでいるReactで学んだことをそのままサイトにして自身でも活用できるように作成。",

		// 作成方法
		wayToMake: "JavascriptのフレームワークのReactで作成。学んだことを項目ごとにコンポーネント化してボタン操作でページを書き換え、素早くアクセスできるようReactの良さを出していく。CSSはnode-sassを使用してSassをそのままコンポーネントにインポートして使用。",

		// 使用フレームワーク
		FW: [
			{ text: "React", image: "react.png" },
			{ text: "Sass", image: "sass.png" },
			{ text: "Node.js", image: "nodejs.png" },
			{ text: "JavaScript", image: "javascript.png" },
		]
	}
	return <PageLayout pageData={pageData}/>
}
export default ReactJS
