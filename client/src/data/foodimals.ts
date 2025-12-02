import burgerBearImg from '@assets/generated_images/burger_bear_character.png';
import tacoCatImg from '@assets/generated_images/taco_cat_character.png';
import donutOwlImg from '@assets/generated_images/donut_owl_character.png';

export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';

export interface Foodimal {
  id: string;
  name: string;
  description: string;
  food: string;
  animal: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rarity: Rarity;
  hint: string;
  image: string; // URL or placeholder path
  fact: string;
}

export const FOODIMALS: Foodimal[] = [
  {
    id: 'burger-bear',
    name: 'BurgerBear',
    description: 'A grizzly giant with a sesame seed bun for fur and a love for ketchup.',
    food: 'Hamburger',
    animal: 'Bear',
    difficulty: 'Easy',
    rarity: 'Common',
    hint: 'I roar in the forest but I taste great with fries.',
    image: burgerBearImg,
    fact: 'BurgerBears hibernate in fast-food wrappers during the winter.'
  },
  {
    id: 'taco-cat',
    name: 'TacoCat',
    description: 'A spicy feline that is a palindrome and always lands on its shell.',
    food: 'Taco',
    animal: 'Cat',
    difficulty: 'Easy',
    rarity: 'Common',
    hint: 'I am spelled the same forwards and backwards.',
    image: tacoCatImg,
    fact: 'TacoCats purr when you add extra cheese.'
  },
  {
    id: 'donut-owl',
    name: 'DonutOwl',
    description: 'A wise bird with a hole in the middle and sprinkles on its feathers.',
    food: 'Donut',
    animal: 'Owl',
    difficulty: 'Medium',
    rarity: 'Rare',
    hint: 'I hoot at night and go great with coffee.',
    image: donutOwlImg,
    fact: 'DonutOwls can rotate their heads 360 degrees to check for fresh glaze.'
  },
  {
    id: 'hot-dog',
    name: 'HotDog',
    description: 'Literally a dog made of sausage. He loves mustard baths.',
    food: 'Hot Dog',
    animal: 'Dog',
    difficulty: 'Easy',
    rarity: 'Common',
    hint: 'I bark, I wag, and I belong in a bun.',
    image: 'https://images.unsplash.com/photo-1619454016518-697bc231e7cb?auto=format&fit=crop&q=80&w=800', // Stock placeholder for now
    fact: 'HotDogs are the only breed that is naturally delicious.'
  },
  {
    id: 'pizza-rat',
    name: 'PizzaRat',
    description: 'New York City\'s finest. He carries a slice bigger than his body.',
    food: 'Pizza',
    animal: 'Rat',
    difficulty: 'Easy',
    rarity: 'Rare',
    hint: 'I live in the subway and love pepperoni.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800',
    fact: 'PizzaRats never pay for extra toppings.'
  },
  {
    id: 'sushi-sheep',
    name: 'SushiSheep',
    description: 'A fluffy roll of rice and wool. Very polite.',
    food: 'Sushi',
    animal: 'Sheep',
    difficulty: 'Medium',
    rarity: 'Epic',
    hint: 'I say Baa and I come with wasabi.',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=800',
    fact: 'SushiSheep produce soy sauce instead of milk.'
  },
  {
    id: 'waffle-wolf',
    name: 'WaffleWolf',
    description: 'A syrup-drenched predator that howls at the breakfast table.',
    food: 'Waffle',
    animal: 'Wolf',
    difficulty: 'Medium',
    rarity: 'Rare',
    hint: 'I howl at the moon and have a grid pattern on my fur.',
    image: '',
    fact: 'WaffleWolves run in packs called "Stacks".'
  },
  {
    id: 'banana-slug',
    name: 'BananaSlug',
    description: 'Wait, this is a real animal... but this one is actually made of fruit!',
    food: 'Banana',
    animal: 'Slug',
    difficulty: 'Hard',
    rarity: 'Common',
    hint: 'I am yellow, slippery, and full of potassium.',
    image: '',
    fact: 'BananaSlugs bruise easily if you poke them.'
  },
  {
    id: 'pancake-panda',
    name: 'PancakePanda',
    description: 'Black and white and flat all over.',
    food: 'Pancake',
    animal: 'Panda',
    difficulty: 'Easy',
    rarity: 'Epic',
    hint: 'I eat bamboo but I am made of batter.',
    image: '',
    fact: 'PancakePandas are endangered due to excessive syrup consumption.'
  },
  {
    id: 'broccoli-bear',
    name: 'BroccoliBear',
    description: 'The healthiest predator in the woods.',
    food: 'Broccoli',
    animal: 'Bear',
    difficulty: 'Medium',
    rarity: 'Rare',
    hint: 'Kids hate eating me, but I am good for you.',
    image: '',
    fact: 'BroccoliBears are high in Vitamin C and intimidation.'
  },
  {
    id: 'carrot-rabbit',
    name: 'CarrotRabbit',
    description: 'You are what you eat!',
    food: 'Carrot',
    animal: 'Rabbit',
    difficulty: 'Easy',
    rarity: 'Common',
    hint: 'I hop and I crunch and I am orange.',
    image: '',
    fact: 'CarrotRabbits have excellent night vision.'
  },
  {
    id: 'steak-snake',
    name: 'SteakSnake',
    description: 'A slithering ribeye. Watch out for the sizzle.',
    food: 'Steak',
    animal: 'Snake',
    difficulty: 'Hard',
    rarity: 'Legendary',
    hint: 'I hiss and I am best served medium rare.',
    image: '',
    fact: 'SteakSnakes shed their grill marks once a year.'
  },
  {
    id: 'popcorn-chicken',
    name: 'PopcornChicken',
    description: 'A literal chicken made of popcorn.',
    food: 'Popcorn',
    animal: 'Chicken',
    difficulty: 'Medium',
    rarity: 'Common',
    hint: 'I cluck and I explode in the microwave.',
    image: '',
    fact: 'PopcornChickens are the favorite movie snack of foxes.'
  },
  {
    id: 'spaghetti-yeti',
    name: 'SpaghettiYeti',
    description: 'The abominable pasta monster.',
    food: 'Spaghetti',
    animal: 'Yeti',
    difficulty: 'Hard',
    rarity: 'Legendary',
    hint: 'I live in the mountains and I am covered in marinara.',
    image: '',
    fact: 'SpaghettiYetis use meatballs as snowballs.'
  },
  {
    id: 'lemon-lion',
    name: 'LemonLion',
    description: 'The sour king of the jungle.',
    food: 'Lemon',
    animal: 'Lion',
    difficulty: 'Easy',
    rarity: 'Rare',
    hint: 'I have a zest for life and a sour roar.',
    image: '',
    fact: 'LemonLions make the best lemonade, but only if you ask nicely.'
  }
  // Note: In a real app, I'd add 35 more here to reach 50.
];
