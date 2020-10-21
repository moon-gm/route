// FWごとのページデータ設定
export default function returnAllPage(State, Funcs) {
	const pageData = [
		{//React
			FW: "React",
			URL: "/reactjs",
			State: State.selFW.React,
			Img: "/icon/react.png",
			Page: [
				{
					Title: "React Learning",
					URL: "/reactjs/react-learning",
					ID: "react-learning",
					Func: Funcs.ReactLearning,
					State: State.imgIx.ReactLearning,
					CreateDate: "2020.6.5",
				},
			],
		},
		{// Next
			FW: "Next.js",
			URL: "/nextjs",
			State: State.selFW.Next,
			Img: "/icon/next.png",
			Page: [
				{
					Title: "Portfolio Show",
					URL: "/nextjs/portfolio-show",
					ID: "portfolio-show",
					Func: Funcs.PortfolioShow,
					State: State.imgIx.PortfolioShow,
					CreateDate: "2020.8.3",
				},
				{
					Title: "Next Learning",
					URL: "/nextjs/next-learning",
					ID: "next-learning",
					Func: Funcs.NextLearning,
					State: State.imgIx.NextLearning,
					CreateDate: "2020.7.21",
				},
				{
					Title: "National Flags",
					URL: "/nextjs/national-flags",
					ID: "national-flags",
					Func: Funcs.NationalFlags,
					State: State.imgIx.NationalFlags,
					CreateDate: "2020.8.26",
				},
			],
		},
		{// Gatsby
			FW: "Gatsby.js",
			URL: "/gatsbyjs",
			State: State.selFW.Gatsby,
			Img: "/icon/gatsby.png",
			Page: [
				{
					Title: "Atelier K",
					URL: "/gatsbyjs/atelier-k",
					ID: "atelier-k",
					Func: Funcs.AtelierK,
					State: State.imgIx.AtelierK,
					CreateDate: "2020.5.6",
				},
				{
					Title: "Gatsby Learning",
					URL: "/gatsbyjs/gatsby-learning",
					ID: "gatsby-learning",
					Func: Funcs.GatsbyLearning,
					State: State.imgIx.GatsbyLearning,
					CreateDate: "2020.7.23",
				},
			],
		},
		{// Laravel
			FW: "Laravel",
			URL: "/laravel",
			Img: "/icon/laravel.png",
			State: State.selFW.Laravel,
			Page: [
				{
					Title: "テキーラ全書",
					URL:  "/laravel/tequipedia",
					ID: "tequipedia",
					Func: Funcs.Tequipedia,
					State: State.imgIx.Tequipedia,
					CreateDate: "2020.2.18",
				},
			],
		},
	]

	return pageData
}
