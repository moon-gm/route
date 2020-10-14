// FWごとのページデータ設定
export default function returnAllPage(State, Funcs) {
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
					State: State.index.ReactLearning,
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
					State: State.index.PortfolioShow,
				},
				{
					Title: "Next Learning",
					URL: "/nextjs/next-learning",
					ID: "next-learning",
					Func: Funcs.NextLearning,
					State: State.index.NextLearning,
				},
				{
					Title: "National Flags",
					URL: "/nextjs/national-flags",
					ID: "national-flags",
					Func: Funcs.NationalFlags,
					State: State.index.NationalFlags,
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
					State: State.index.AtelierK,
				},
				{
					Title: "Gatsby Learning",
					URL: "/gatsbyjs/gatsby-learning",
					ID: "gatsby-learning",
					Func: Funcs.GatsbyLearning,
					State: State.index.GatsbyLearning,
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
					State: State.index.Tequipedia,
				},
			],
		},
	]

	return pageData
}
