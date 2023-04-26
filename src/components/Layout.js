import Head from 'next/head';
import Image from 'next/image';

export const siteTitle = "JSW's aircraft website";
export const description = "Go and Get Engine";

export default function Layout() {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        
        <meta charset="UTF-8" />
        <meta name="author" content="JSW" />
        <meta name="keywords" content="JSW Aero space" />

        <link rel="icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />

        <meta http-equiv="X-UA-Compatible" content="ie=edge" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description}/>

        <meta property="og:title" content={siteTitle} />
      </Head>
      
      {/* NAV */}
      <nav className="bg-blue-50 p-2 mt-0 fixed w-full z-10 pin-t">
        <div className="container mx-auto flex flex-wrap items-center">
          <div className="flex w-full md:w-1/2 justify-center md:justify-start text-blue-700 font-extrabold">
            <a className="text-blue-700 no-underline hover:text-blue-900 hover:no-underline" href="#">
              <span className="text-2xl pl-2"><i className="em em-grinning"></i> Brand McBrandface</span>
            </a>
          </div>
          <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
            <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
              <li className="mr-3">
              <a className="inline-block py-2 px-4 text-blue-400 no-underline" href="#">Active</a>
              </li>
              <li className="mr-3">
              <a className="inline-block text-grey-dark no-underline hover:text-grey-lighter hover:text-underline py-2 px-4" href="#">link</a>
              </li>
              <li className="mr-3">
              <a className="inline-block text-grey-dark no-underline hover:text-grey-lighter hover:text-underline py-2 px-4" href="#">link</a>
              </li>
              <li className="mr-3">
              <a className="inline-block text-grey-dark no-underline hover:text-grey-lighter hover:text-underline py-2 px-4" href="#">link</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* NAV */}

      <div className='bg-indigo-500 text-bold text-white inline-flex items-center p-4 rounded shadow-md text-lg mt-6' >test</div>
      <div className='flex' >test2</div>
      <div className='flex' >test3</div>
      <div className='flex' >test4</div>
      <div className='flex' >test5</div>

      <div className="box-shaping">this is box default module </div>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:shrink-0">
          <Image
            priority
            src="https://images.unsplash.com/photo-1637734433731-621aca1c8cb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=404&q=80"
            className="h-48 w-full object-cover md:h-full md:w-48"
            width={144}
            height={144}
            alt="Modern building architecture"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company retreats</div>
          <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Incredible accommodation for your team</a>
          <p className="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.</p>
        </div>
      </div>
    </div>
    </>
  );
}