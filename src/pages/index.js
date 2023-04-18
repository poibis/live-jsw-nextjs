import localFont from 'next/font/local'
import Layout from '../components/Layout';

const myFont = localFont({ src: './fonts/PretendardVariable.woff2' })

export default () => {
  return (
    <main className={myFont.className}>
      <Layout>t</Layout>
      testtest
      <br/>
      <span className="text-lg">한글 테스트 하나 22둘 셋 넷</span>
    </main>
  )
}
