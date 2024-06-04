import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body className={inter.className}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
