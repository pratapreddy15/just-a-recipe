export enum RECIPE_CATEGORIES {
  BREAKFAST = 'Breakfast',
  SNACKS = 'Snacks',
  RICE = 'Rice',
  CURRIES = 'Curries',
  PANEER = 'Paneer',
  VEGETABLES = 'Vegetables',
  LENTILS = 'Lentils',
  INDIAN_SWEETS = 'Indian Sweets',
  INDIAN_STREET_FOOD = 'Indian Street Food',
  EGGLESS_CAKES = 'Eggless Cakes',
  WORLD_CUISINE = 'World Cuisine',
  DESSERTS = 'Desserts'
}

export const RECIPE_CATEGORIES_IMAGE_GALLERY: { [key: string]: Array<{ imageSource: string; imageTitle: string }> } = {
  appetizers: [
    {
      imageSource: './images/categories/appetizers/cauliflower-manchurian-recipe.jpeg',
      imageTitle: 'Cauliflower Manchurian Recipe'
    },
    {
      imageSource: './images/categories/appetizers/grilled-paneer-tikka.jpeg',
      imageTitle: 'Grilled Paneer Tikka'
    },
    {
      imageSource: './images/categories/appetizers/mushroom-manchurian-dry.jpeg',
      imageTitle: 'Mushroom Manchurian Dry'
    }
  ],
  breakfast: [
    {
      imageSource: './images/categories/breakfast/appam-recipe.jpeg',
      imageTitle: 'Appam Recipe'
    },
    {
      imageSource: './images/categories/breakfast/idli-recipe.jpeg',
      imageTitle: 'Idli Recipe'
    },
    {
      imageSource: './images/categories/breakfast/upma-recipe.jpeg',
      imageTitle: 'Upma Recipe'
    }
  ],
  curries: [
    {
      imageSource: './images/categories/curries/malai-kofta.jpeg',
      imageTitle: 'Malai Kofta'
    },
    {
      imageSource: './images/categories/curries/palak-paneer.jpeg',
      imageTitle: 'Palak Paneer'
    },
    {
      imageSource: './images/categories/curries/paneer-butter-masala.jpeg',
      imageTitle: 'Paneer Butter Masala'
    }
  ],
  desserts: [
    {
      imageSource: './images/categories/desserts/fruit-custart.jpeg',
      imageTitle: 'Fruit Custard'
    },
    {
      imageSource: './images/categories/desserts/mango-ice-cream.jpeg',
      imageTitle: 'Mango Ice Cream'
    },
    {
      imageSource: './images/categories/desserts/mango-mousse.jpeg',
      imageTitle: 'Mango Mousse'
    }
  ],
  eggless_cakes: [
    {
      imageSource: './images/categories/eggless_cakes/eggless-chocolate-cake.jpeg',
      imageTitle: 'Eggless Chocolate Cake'
    },
    {
      imageSource: './images/categories/eggless_cakes/eggless-strawberry-cream-cake.jpeg',
      imageTitle: 'Eggless Strawberry Cream Cake'
    },
    {
      imageSource: './images/categories/eggless_cakes/mango-cheese-cake.jpeg',
      imageTitle: 'Mango Cheese Cake'
    }
  ],
  indian_street_foods: [
    {
      imageSource: './images/categories/indian_street_food/pani-puri.jpeg',
      imageTitle: 'Pani Puri'
    },
    {
      imageSource: './images/categories/indian_street_food/pav-bhaji.jpeg',
      imageTitle: 'Pav Bhaji'
    },
    {
      imageSource: './images/categories/indian_street_food/papdi-chaat.jpeg',
      imageTitle: 'Papdi Chaat'
    }
  ],
  indian_sweets: [
    {
      imageSource: './images/categories/indian_sweets/gulab-jamun.jpeg',
      imageTitle: 'Gulab Jamun'
    },
    {
      imageSource: './images/categories/indian_sweets/jalebi.jpeg',
      imageTitle: 'Jalebi'
    },
    {
      imageSource: './images/categories/indian_sweets/kaju-katli.jpeg',
      imageTitle: 'Kaju Katli'
    }
  ],
  lentils: [
    {
      imageSource: './images/categories/lentils/punjabi-lobia-masala-recipe.jpeg',
      imageTitle: 'Punjabi Lobia Masala Recipe'
    },
    {
      imageSource: './images/categories/lentils/restaurant-style-dal-tadka.jpeg',
      imageTitle: 'Restaurant Style Dal Tadka'
    },
    {
      imageSource: './images/categories/lentils/varan-bhaat-recipe.jpeg',
      imageTitle: 'Varan Bhaat Recipe'
    }
  ],
  rice: [
    {
      imageSource: './images/categories/rice/bhaja-muger-khichuri.jpeg',
      imageTitle: 'Bhaja Muger Khichuri'
    },
    {
      imageSource: './images/categories/rice/biryani-recipe.jpeg',
      imageTitle: 'Biryani Recipe'
    },
    {
      imageSource: './images/categories/rice/jeera-rice.jpeg',
      imageTitle: 'Jeera Rice'
    }
  ],
  snacks: [
    {
      imageSource: './images/categories/snacks/bengali-peas-kachori.jpeg',
      imageTitle: 'Bengali Peas Kachori'
    },
    {
      imageSource: './images/categories/snacks/khaman-recipe.jpeg',
      imageTitle: 'Khaman Recipe'
    },
    {
      imageSource: './images/categories/snacks/Samosa.jpeg',
      imageTitle: 'Samosa'
    }
  ],
  vegetables: [
    {
      imageSource: './images/categories/vegetables/bharwan-shimla-mirch-recipe.jpeg',
      imageTitle: 'Bharwan Shimla Mirch Recipe'
    },
    {
      imageSource: './images/categories/vegetables/bhendi-masala.jpeg',
      imageTitle: 'Bhendi Masala'
    },
    {
      imageSource: './images/categories/vegetables/sambar.jpeg',
      imageTitle: 'Sambar'
    }
  ],
  world_cuisine: [
    {
      imageSource: './images/categories/world_cuisine/burger-recipe.jpeg',
      imageTitle: 'Burger Recipe'
    },
    {
      imageSource: './images/categories/world_cuisine/eggless-chocolate-cake.jpeg',
      imageTitle: 'Burger Recipe'
    },
    {
      imageSource: './images/categories/world_cuisine/veg-momos-recipe.jpeg',
      imageTitle: 'Veg Momos Recipe'
    }
  ]
}
