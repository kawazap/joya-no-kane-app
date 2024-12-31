import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Kaisei+Decol:wght@500&display=swap"
        rel="stylesheet"
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp