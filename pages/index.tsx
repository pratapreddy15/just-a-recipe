import type { NextPage } from 'next'
import Head from 'next/head'

import { Hero } from '../components'

/**
 * xs: 360px
 * sm: 768px
 * md: 992px
 * lg: 1328px
 * xl: 1920px
 */

interface HomePageProps {
  heroes: Array<{ imagePath: string; authorName: string; authorUrl: string; content: string[] }>
}

const Home: NextPage<HomePageProps> = (props: HomePageProps) => {
  return (
    <div>
      <Head>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <main>
        <Hero heroContent={props.heroes} />
      </main>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      heroes: [
        {
          imagePath: '/images/angshu-purkait.jpg',
          authorName: 'Angshu Purkait',
          authorUrl: 'https://unsplash.com/@angshu_purkait?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
          content: ['Bringing all the recipes', "from Feedspot's top 3 Indian bloggers", 'in one place']
        },
        {
          imagePath: '/images/pranjall-kumar.jpg',
          authorName: 'Pranjall Kumar',
          authorUrl: 'https://unsplash.com/@pranjallk1995?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
          content: ['Thousands of recipes from India', 'and other parts of the world']
        },
        {
          imagePath: '/images/pratiksha-mohanty.jpg',
          authorName: 'Pratiksha Mohanty',
          authorUrl: 'https://unsplash.com/@pratiksha_mohanty?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
          content: ['A collection of', 'vegeterian, non vegeterian,', 'vegan and glutten free', 'recipes']
        }
      ]
    }
  }
}

export default Home
