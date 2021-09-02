import Document, { Html, Head, Main, NextScript } from 'next/document'

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
			<meta name="description" content="Portfolio Show"/>
			<meta property="og:url" content="https://route-eight.vercel.app/"/>
			<meta property="og:title" content="Portfolio Show"/>
			<meta property="og:description" content="各種フレームワークを用いて学習しながら作成"/>
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
