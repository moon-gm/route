import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import metaData from '../config/meta-data.json'

export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html>
				<Head>
					<meta charSet="UTF-8"/>
					<meta name="description" content={metaData.siteTitle}/>
					<meta property="og:url" content={metaData.siteURL}/>
					<meta property="og:title" content={metaData.siteTitle}/>
					<meta property="og:description" content={metaData.siteDescription}/>
					<meta property="og:image" content={metaData.siteImage.src}/>
					<link rel="apple-touch-icon" href="apple-touch-icon.png"/>
					<link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png"/>
					<link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png"/>
					<link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png"/>
					<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png"/>
					<link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png"/>
					<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png"/>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
