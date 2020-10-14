// FWごとのページデータ設定
import State from './state.json'
export default function returnAllPage(Funcs) {
	const pageData = [
		{//React
			FW: "React",
			URL: "/reactjs",
			State: State.selectedFW.React,
			Page: [
				{
					Title: "React Learning",
					URL: "/reactjs/react-learning",
					ID: "react-learning",
					Func: Funcs.ReactLearning,
					State: State.index.React.ReactLearning,
				},
			],
		},
		{// Next
			FW: "Next.js",
			URL: "/nextjs",
			State: State.selectedFW.Next,
			Page: [
				{
					Title: "Portfolio Show",
					URL: "/nextjs/portfolio-show",
					ID: "portfolio-show",
					Func: Funcs.PortfolioShow,
					State: State.index.Next.PortfolioShow,
				},
				{
					Title: "Next Learning",
					URL: "/nextjs/next-learning",
					ID: "next-learning",
					Func: Funcs.NextLearning,
					State: State.index.Next.NextLearning,
				},
				{
					Title: "National Flags",
					URL: "/nextjs/national-flags",
					ID: "national-flags",
					Func: Funcs.NationalFlags,
					State: State.index.Next.NationalFlags,
				},
			],
		},
		{// Gatsby
			FW: "Gatsby.js",
			URL: "/gatsbyjs",
			State: State.selectedFW.Gatsby,
			Page: [
				{
					Title: "Atelier K",
					URL: "/gatsbyjs/atelier-k",
					ID: "atelier-k",
					Func: Funcs.AtelierK,
					State: State.index.Gatsby.AtelierK,
				},
				{
					Title: "Gatsby Learning",
					URL: "/gatsbyjs/gatsby-learning",
					ID: "gatsby-learning",
					Func: Funcs.GatsbyLearning,
					State: State.index.Gatsby.GatsbyLearning,
				},
			],
		},
		{// Laravel
			FW: "Laravel",
			URL: "/laravel",
			State: State.selectedFW.Laravel,
			Page: [
				{
					Title: "テキーラ全書",
					URL:  "/laravel/tequipedia",
					ID: "tequipedia",
					Func: Funcs.Tequipedia,
					State: State.index.Laravel.Tequipedia,
				},
			],
		},
	]

	return pageData
}
