import Head from 'next/head'
import '../styles/_utils.css'
import '../styles/_nav.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { Navbar, PageFooter } from '../components'
import { ContextProvider } from '../context/context-provider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>JUST A RECIPE</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </ContextProvider>
      <PageFooter />
    </>
  )
}

export default MyApp
