// FWごとのページデータ設定
import State from './state.json'
export default function returnAllPage(Funcs) {
	const pageData = [
		{//React
			FW: "React",
			URL: "/reactjs",
			State: State.FWSelected.React,
			Page: [
				{
					Title: "React Learning",
					URL: "/reactjs/react-learning",
					ID: "react-learning",
					Func: Funcs.ReactLearning,
					State: State.index.SitePages.React.ReactLearning,
				},
			],
		},
		{// Next
			FW: "Next",
			URL: "/nextjs",
			State: State.FWSelected.Next,
			Page: [
				{
					Title: "Portfolio Show",
					URL: "/nextjs/portfolio-show",
					ID: "portfolio-show",
					Func: Funcs.PortfolioShow,
					State: State.index.SitePages.Next.PortfolioShow,
				},
				{
					Title: "Next Learning",
					URL: "/nextjs/next-learning",
					ID: "next-learning",
					Func: Funcs.NextLearning,
					State: State.index.SitePages.Next.NextLearning,
				},
				{
					Title: "National Flags",
					URL: "/nextjs/national-flags",
					ID: "national-flags",
					Func: Funcs.NationalFlags,
					State: State.index.SitePages.Next.NationalFlags,
				},
			],
		},
		{// Gatsby
			FW: "Gatsby",
			URL: "/gatsbyjs",
			State: State.FWSelected.Gatsby,
			Page: [
				{
					Title: "Atelier K",
					URL: "/gatsbyjs/atelier-k",
					ID: "atelier-k",
					Func: Funcs.AtelierK,
					State: State.index.SitePages.Gatsby.AtelierK,
				},
				{
					Title: "Gatsby Learning",
					URL: "/gatsbyjs/gatsby-learning",
					ID: "gatsby-learning",
					Func: Funcs.GatsbyLearning,
					State: State.index.SitePages.Gatsby.GatsbyLearning,
				},
			],
		},
		{// Laravel
			FW: "Laravel",
			URL: "/laravel",
			State: State.FWSelected.Laravel,
			Page: [
				{
					Title: "テキーラ全書",
					URL:  "/laravel/tequipedia",
					ID: "tequipedia",
					Func: Funcs.Tequipedia,
					State: State.index.SitePages.Laravel.Tequipedia,
				},
			],
		},
	]

	return pageData
}
