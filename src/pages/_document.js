import Document, { Html, Head, Main, NextScript } from 'next/document'
import GLOBAL from '../config/global.json'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
			<meta charset="UTF-8"/>
			<meta name="description" content={GLOBAL.SITE_TITLE}/>
			<meta property="og:url" content={GLOBAL.SITE_URL}/>
			<meta property="og:title" content={GLOBAL.SITE_TITLE}/>
			<meta property="og:description" content={GLOBAL.SITE_DESCRIPTION}/>
			<meta property="og:image" content="/github-logo.png"/>
			<link rel="apple-touch-icon" href="apple-touch-icon.png"/>
			<link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png"/>
			<link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png"/>
			<link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png"/>
			<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png"/>
			<link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png"/>
			<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png"/>
			<link rel="icon" href="/favicon.ico" />
			{/* swiper.js導入 */}
			<link rel="stylesheet" href="https://unpkg.com/swiper@6.3.3/swiper-bundle.css"/>
			<link rel="stylesheet" href="https://unpkg.com/swiper@6.3.3/swiper-bundle.min.css"/>

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
