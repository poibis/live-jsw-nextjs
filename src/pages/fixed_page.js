import Layout from '../components/Layout';


export default function fixedPage() {
  return (
    <>
      <Layout>
      </Layout>
        <div class="container shadow-lg mx-auto bg-white md:mt-16">
        <div class="w-full p-6 h-screen">
          <p class="font-bold text-center text-grey-darkest text-2xl md:text-4xl px-3 mb-5 sm:mb-16">Tailwind Starter Templates - Fixed Header</p>
          <p class="py-4"><i class="em em-wave"></i> <i class="em em-world_map"></i></p>
          <p class="text-grey-darkest">This starter template contains:</p>
          <p class="pt-4"></p>
          
          <div class="flex items-center pt-2">
            <svg class="flex-none m-2 h-6 fill-current text-green-dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z" />
            </svg>
            <span class="flex-1 py-1 pl-3 m-1">Fixed Header</span>
          </div>
          <div class="flex items-center">
            <svg class="flex-none m-2 h-6 fill-current text-green-dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z" />
            </svg>
            <span class="flex-1 py-1 pl-3 m-1">Nav List which wraps onto the next row for small screens</span>
          </div>
          <div class="flex items-center">
            <svg class="flex-none m-2 h-6 fill-current text-green-dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z" />
            </svg>
            <span class="flex-1 py-1 pl-3 m-1">Container with 1 column</span>
          </div>

          <p class="text-center no-underline hover:no-underline mt-8 mb-8"><a href="https://github.com/tailwindtoolbox/Fixed-Header/archive/master.zip" target="_blank"><button class="w-full sm:w-auto bg-teal hover:bg-teal-dark text-white text-xl font-extrabold py-3 px-5 rounded shadow hover:shadow-lg"><svg class="fill-current h-4 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg> Download Template</button></a></p>
          
          <p class="text-center no-underline hover:no-underline"><a href="https://github.com/tailwindtoolbox/Fixed-Header" target="_blank"><button class="w-full sm:w-auto bg-grey-lightest hover:bg-black text-grey-darkest hover:text-white text-xl font-extrabold py-3 px-5 rounded shadow hover:shadow-lg">View on GitHub</button></a></p>
          
          <p class="mt-16 p-6 w-full container mx-auto bg-teal-lightest text-center text-grey-dark">Find more templates at: <a class="font-extrabold text-teal-dark hover:text-teal-darkest" href="https://www.tailwindtoolbox.com/templates" target="_blank">www.TailwindToolbox.com/templates</a></p>	
        </div>
        </div>

    </>

  )
}
