import { useContext, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import path from 'path'

import { AppContext, NAVIGATION_MENU_STATES } from '../context/context-provider'
import { RecipeCategory, RecipeDetail, RecipeCategoryGallery, RecipeCategoryWithCount } from '../types/recipe'
import { Hero, Bloggers, RecipeCategories } from '../components'
import { getFileContent } from '../utils/server'

/**
 * xs: 360px
 * sm: 768px
 * md: 992px
 * lg: 1328px
 * xl: 1920px
 */

interface HomePageProps {
  heroes: Array<{ imagePath: string; authorName: string; authorUrl: string; content: string }>
  bloggers: Array<{
    title: string
    blogUrl: string
    highlight: string
    youtubeUrl: string
    facebookUrl: string
    twitterUrl: string
  }>
  featuredCategories: Array<RecipeCategoryWithCount>
}

const HomePage: NextPage<HomePageProps> = (props: HomePageProps) => {
  const appContext = useContext(AppContext)
  useEffect(() => {
    if (appContext.navigationMenuState === NAVIGATION_MENU_STATES.OPEN) {
      appContext.setNavigationMenuState(NAVIGATION_MENU_STATES.CLOSED)
    }
  }, [])
  const categoriesGallery: RecipeCategoryGallery[] = props.featuredCategories.map((category) => {
    // const countMap = props.recipesCountMap.find((count) => count.categoryId === category.id)
    const photoDirectoryName = category.name.replace(' ', '-')
    return {
      id: category.id,
      name: category.name,
      recipesCount: category.recipesCount,
      galleryPhotos: [
        {
          imageSource: `/images/recipe-categories/${photoDirectoryName}/photo-1.jpeg`,
          imageTitle: 'Gallery Photo 1'
        },
        {
          imageSource: `/images/recipe-categories/${photoDirectoryName}/photo-2.jpeg`,
          imageTitle: 'Gallery Photo 2'
        },
        {
          imageSource: `/images/recipe-categories/${photoDirectoryName}/photo-3.jpeg`,
          imageTitle: 'Gallery Photo 3'
        }
      ]
    }
  })

  return (
    <div>
      <Head>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <main>
        <Hero heroContent={props.heroes} />
        <Bloggers bloggers={props.bloggers} />
        <RecipeCategories categoriesGallery={categoriesGallery} addBrowseAllCategoriesLink={true} />
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const recipeCategories = await getFileContent<RecipeCategory[]>(
    path.join(process.cwd(), 'data', 'recipe-categories.json')
  )
  const featuredCategories: RecipeCategory[] = recipeCategories.filter((category) => category.isFeatured)
  const recipes = await getFileContent<RecipeDetail[]>(path.join(process.cwd(), 'data', 'recipes.json'))

  const featuredCategoriesWithCount: RecipeCategoryWithCount[] = featuredCategories.map((category) => {
    const recipesCount = recipes.filter((rec) => rec.categoryId === category.id).length
    return {
      ...category,
      recipesCount: recipesCount
    }
  })

  return {
    props: {
      heroes: [
        {
          imagePath: '/images/amirali-mirhashemian.jpg',
          authorName: 'Amirali Mirhashemian',
          authorUrl:
            'https://unsplash.com/@amir_v_ali?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
          content: "Bringing all the recipes\nfrom Feedspot's top 3 Indian bloggers\nin one place"
        },
        {
          imagePath: '/images/pranjall-kumar.jpg',
          authorName: 'Pranjall Kumar',
          authorUrl:
            'https://unsplash.com/@pranjallk1995?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
          content: 'Thousands of recipes from India\nand other parts of the world'
        },
        {
          imagePath: '/images/jem-sahagun.jpg',
          authorName: 'Jem Sahagun',
          authorUrl:
            'https://unsplash.com/@jemsahagun?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
          content: 'A collection of\nvegeterian, non vegeterian,\nvegan and glutten free\nrecipes'
        }
      ],
      bloggers: [
        {
          title: "Dassana's Veg Recipes",
          blogUrl: 'https://www.vegrecipesofindia.com',
          highlight:
            'With more than 1800 recipes, this is one of the largest collection of pure Indian vegetarian recipes which are tried and tested and presented with step by step photos.',
          youtubeUrl: 'https://www.youtube.com/c/DassanasVegRecipes',
          facebookUrl: 'https://www.facebook.com/dassanasvegrecipes/',
          twitterUrl: 'https://twitter.com/dassanasrecipes'
        },
        {
          title: "Archana's Kitchen",
          blogUrl: 'https://www.archanaskitchen.com',
          highlight:
            'Giving the world a credible and confident DIY solutions for everyday cooking. Millions of readers using the recipes and videos enhanced with rich content like menu plans, special diets dinner ideas and more.',
          youtubeUrl: 'https://www.youtube.com/c/Archana-sKitchen',
          facebookUrl: 'https://www.facebook.com/ArchanasKitchen/',
          twitterUrl: 'https://twitter.com/archanaskitchen'
        },
        {
          title: "Rak's Kitchen",
          blogUrl: 'https://rakskitchen.net',
          highlight:
            'Find easy-to-learn recipes mainly Indian regional, eggless baking as well as some vegetarian friendly global cuisine. Provides a range of tried and tested recipes which are guaranteed to be delicious.',
          youtubeUrl: 'https://www.youtube.com/c/Raksanand',
          facebookUrl: 'https://www.facebook.com/rakskitchen/',
          twitterUrl: 'https://twitter.com/rakskitchen'
        }
      ],
      featuredCategories: featuredCategoriesWithCount
    }
  }
}

export default HomePage
