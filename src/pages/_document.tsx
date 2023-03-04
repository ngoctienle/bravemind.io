import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document'

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    return await Document.getInitialProps(ctx)
  }

  render(): JSX.Element {
    return (
      <Html lang='en'>
        <Head />
        <meta name='theme-color' content='#2b2626' />
        {/* {process.env.NODE_ENV === 'production' && (
            <Script async defer
              strategy='afterInteractive'
              data-do-not-track='true'
              // please change to your data website id
              data-website-id=''
              // change to your hosted umami app
              src=''
            />
          )} */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
