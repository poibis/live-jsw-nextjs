import '/styles/globals.css'
import localFont from 'next/font/local';

const myFont = localFont({ src: './fonts/PretendardVariable.woff2' })

export default function App({ Component, pageProps }) {
  return (
    <main className={myFont.className}>
      <Component {...pageProps} />
    </main>
  )
}
