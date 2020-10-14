import State from './state.json'
export default function returnAllPage(Funcs) {
	return (
		[
			{// React.js
				FW: "React.js",
				URL: "/reactjs",
				State: State.MenuTab.React,
				Page: [
					{
						Title: "React Learning",
						URL: "/reactjs/react-learning",
						ID: "react-learning",
						Func: Funcs.ReactLearning,
						State: State.index.SitePages.React.ReactLearning
					},
				],
			},
			{// Next.js
				FW: "Next.js",
				URL: "/nextjs",
				State: State.MenuTab.Next,
				Page: [
					{
						Title: "Portfolio Show",
						URL: "/nextjs/portfolio-show",
						ID: "portfolio-show",
						Func: Funcs.PortfolioShow,
						State: State.index.SitePages.Next.PortfolioShow
					},
					{
						Title: "Next Learning",
						URL: "/nextjs/next-learning",
						ID: "next-learning",
						Func: Funcs.NextLearning,
						State: State.index.SitePages.Next.NextLearning
					},
					{
						Title: "National Flags",
						URL: "/nextjs/national-flags",
						ID: "national-flags",
						Func: Funcs.NationalFlags,
						State: State.index.SitePages.Next.NationalFlags
					},
				],
			},
			{// Gatsby.js
				FW: "Gatsby.js",
				URL: "/gatsbyjs",
				State: State.MenuTab.Gatsby,
				Page: [
					{
						Title: "Atelier K",
						URL: "/gatsbyjs/atelier-k",
						ID: "atelier-k",
						Func: Funcs.AtelierK,
						State: State.index.SitePages.Gatsby.AtelierK
					},
					{
						Title: "Gatsby Learning",
						URL: "/gatsbyjs/gatsby-learning",
						ID: "gatsby-learning",
						Func: Funcs.GatsbyLearning,
						State: State.index.SitePages.Gatsby.GatsbyLearning
					},
				],
			},
			{// Laravel
				FW: "Laravel",
				URL: "/laravel",
				State: State.MenuTab.Laravel,
				Page: [
					{
						Title: "テキーラ全書",
						URL:  "/laravel/tequipedia",
						ID: "tequipedia",
						Func: Funcs.Tequipedia,
						State: State.index.SitePages.Laravel.Tequipedia
					},
				],
			},
		]
	)
}
