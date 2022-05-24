import '../styles/globals.css'
import Header from '../comps/Header'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Header />
    <main className="container">
      <Component {...pageProps} />
    </main>
    </>
  )
}

export default MyApp
