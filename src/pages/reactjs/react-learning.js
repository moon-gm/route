import PageLayout from '../../components/pageLayout'

const ReactJS = ({info, fw, pg}) => {
	const pageData = {
		// Webページタイトル
		head: info[fw.React].FW,

		// サイトタイトル
		title: info[fw.React].Page[pg.ReactLearning].Title,
		logo: info[fw.React].Img,

		// 作成日・更新日
		createDate: info[fw.React].Page[pg.ReactLearning].CreateDate,
		upDate: "2020.7.24",

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

		// 使用技術・FW
		skill: [
			{title: "React", image: "react.png", contents: ["スワイプ（react-swipeable-views）", "モーダルウィンドウ（react-modal）", "コードハイライト（react-syntax-highlighter）", "ファイルドロップ（react-dropzone）", "アイテムドラッグ（react-draggable）", "型チェック（prop-types）", "ルーター（react-router-dom）", "範囲外クリック（react-onclickoutside）"]},
			{title: "Node.js", image: "nodejs.png", contents: ["npm"]},
			{title: "JavaScript", image: "javascript.png", contents: ["sessionStorage"]},
			{title: "Sass(css)", image: "sass.png", contents: ["@mixin", "@Keyframes", "animation", "レスポンシブ"]},
		]
	}
	return <PageLayout pageData={pageData}/>
}
export default ReactJS
