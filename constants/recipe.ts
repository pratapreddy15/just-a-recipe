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

export const RECIPE_CATEGORIES_TAGS = [
  'World Recipes',
  'Pizza Recipes',
  'Continental Breakfast Recipes',
  'Pasta Recipes',
  'Continental Food Recipes',
  'Continental Party Appetizer & Starter Recipes',
  'Thai Recipes,Malaysian & East Asian Recipes',
  'Mexican Recipes',
  'Soup Recipes',
  'Homemade Jams, Sauce & Pesto Recipes',
  'Sri Lankan Recipes',
  'Naan Recipes',
  'Burger Recipes',
  'Easy Pasta Recipes',
  'Soups',
  'MUFFINS',
  'Bread and Bun recipes',
  'World Cuisines',
  'Mediterranean Cuisine',
  'American Recipes',
  'Thai Recipes',
  'Italian Recipes',
  'Breakfast Recipes (Indian Breakfast Ideas)',
  'Breakfast Menu',
  'Tiffin Sambar Recipes',
  'Breakfast Recipes',
  'Main Course Recipes',
  'Lunch menus',
  'Lunch planner',
  'Rice Recipes',
  'Pulao Recipes',
  'Millet Recipes',
  '60+ Rice Recipes',
  'South Indian Vegetarian Recipes',
  'Poriyal Recipes (South Indian Sabzi)',
  'North Indian Vegetarian Recipes',
  'Sabzi Recipes',
  'Beetroot Recipes',
  'Carrot Recipes',
  'Poriyal Recipes',
  'Kootu Recipes',
  'Potato Recipes',
  'Peas Recipes',
  'Cauliflower Recipes',
  'Cabbage Recipes',
  'Brinjal Recipes',
  'Palak Recipes (Spinach Recipes)',
  'Mushroom Recipes',
  'Chickpeas Recipes',
  'Okra Recipes',
  'Capsicum Recipes',
  'Vegetable Recipes',
  'Indian Side Dish Recipes',
  'Starters',
  'Indian Raita Recipes',
  'Indian Curry Recipes',
  'Dry Curries',
  'Kuzhambu & Other gravies',
  'Curry Recipes',
  'Indian Bread Recipes',
  'Thepla Recipes',
  'Cheela Recipes (Chilla)',
  'Roti',
  'Indian Breads',
  'Salad Recipes',
  'Indian Salad Recipes',
  'Salad',
  'Cake Recipes',
  'Eggless Cakes',
  'Chocolate Cake Mix Recipes',
  'Strawberry Cake Mix Recipes',
  'Vanilla Cake Mix Recipes',
  'Lunch',
  'Dinner',
  'Snack',
  'Diabetic',
  'Diabetes',
  'Indian Non Veg Recipes',
  'Eggetarian',
  'VARUVALS',
  'Indian Homemade Masala Powder & Chutney Powder Recipes',
  'Indian Chutney Recipes',
  'Chutney Recipes',
  'Thogayals',
  'PODI/POWDERS',
  'Snack Recipes',
  'Indian Snack Recipes',
  'Snacks',
  'Murukku Recipes',
  'Bread Snacks',
  'Snacks Recipes',
  'Evening Snacks',
  'Pakora Recipes',
  'Gluten Free Recipes',
  'Drink Recipes',
  'Indian Drink Recipes',
  'Smoothie & Juice Recipes',
  'Cocktail Recipes',
  'Drinks',
  'Beverages',
  'Juices',
  'Milkshake Recipes',
  'Smoothie',
  'Dessert Recipes',
  'Dal Recipes',
  'Rasam Recipes',
  'Sambar Recipes',
  'Dal (Lentils) & Legumes',
  'Paratha Recipes',
  'Parathas',
  'Sweet Recipes (Indian Mithai / Indian Dessert)',
  'Sweets',
  'PAYASAM / KHEERS',
  'Halwa Recipes',
  'Ladoo Recipes',
  'Jamun Recipes',
  'Sweets Recipes',
  'Halwa',
  'Traditional Indian Homemade Pickle Recipes',
  'PICKLES',
  'Breakfast & Dinner Ideas',
  'Dosa Recipes',
  'Paneer recipes',
  'Biryani Recipes',
  'Gokulashtami Recipes',
  'Festival Recipes',
  'Ganesh chaturthi recipes',
  'Pongal Recipes',
  'RAMA NAVAMI',
  'INDIAN DIWALI SWEET RECIPES',
  'Diwali Snacks',
  'TRADITIONAL DIWALI RECIPES',
  'Navratri & Fasting Recipes',
  'Chaat Items',
  'Street Food Recipes',
  'Bread Recipes',
  'Dry Fruit',
  'Baking Mix Recipes',
  'Cookie Mix Recipes',
  'Healthy Homemade Bread Recipes',
  'Sandwich Recipes',
  'Cookie & Biscuit Recipes',
  'Frankie Roll Recipes - Wrap Recipes',
  'Chocolate, Coffee & Tea Drink Recipes',
  'Energy Bar Recipes',
  'Baby & Toddler',
  '10 Months Baby & Toddler Recipes',
  '4 to 6 Months Baby Recipes',
  '6 to 9 Months Baby Recipes',
  'Mango Recipes',
  'Easy Bread Recipes',
  'Kids recipes',
  'Indian Oats Recipes',
  'Side Dish For Chapati',
  'Side Dish For Idli Dosa',
  'Cookies',
  'Desserts',
  'Popsicle Recipes',
  'Summer special',
  'Ice cream',
  'Sorbet',
  'Granita recipes',
  'DIY & Collections',
  'Low Fat Recipes',
  'Condiments',
  'Instant Pot',
  'Loaf',
  'Curd',
  'Yogurt',
  'Homemade Paste'
]
