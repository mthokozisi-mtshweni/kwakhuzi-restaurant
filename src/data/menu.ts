import { photo } from './site';
export type MenuItem = { id: string; name: string; category: string; price: number; description?: string; image?: string; imageAlt?: string; imageCaption?: string; subcategory?: string };
export const categories = [
 {name:'Traditional Meals', image:photo('20.42.20 (2)'), line:'Rich in tradition. Full of flavour.'},
 {name:'Chicken Combos', image:photo('20.42.17'), line:'Something for every appetite.'},
 {name:'Chips & More', image:photo('20.42.20 (3)'), line:'The favourites on the side.'},
 {name:'Dagwood & Wraps', image:photo('20.42.21'), line:'A generous bite of goodness.'},
 {name:'Platters to Share', image:photo('20.42.17'), line:'Good food tastes better together.'},
 {name:'Drinks', image:photo('20.42.20'), line:'A little refreshment.'},
 {name:'Desserts', image:photo('20.42.21 (1)'), line:'End on a sweet note.'},
];
const groups: [string, [string, number][]][] = [
 ['Traditional Meals', [['Mogodu',70],['Ox Liver',70],['Beef Trotters',80],['Beef (Stew or Braai)',90],['Ox Tongue',120],['Chicken Hard Body',130],['Mathunjana, Mawutwana & Ngingila',130],['Bhabhalazi Mix',80]]],
 ['Chicken Combos',[['Full Chicken',180],['Half Chicken',100],['Quarter Chicken',70],['Chicken Wings (4)',80],['Crumbed Chicken Strips',60]]],
 ['Chips & More',[['Cheesy Chips',60],['Loaded Chips',80]]],
 ['Dagwood & Wraps',[['Dagwood',90],['Chicken Wrap',80],['Beef Wrap',90]]],
 ['Platters to Share',[['Platter for 2',260],['Braai Platter for 2',330]]],
 ['Weekly Specials',[['Mogodu Monday',70],['Braai Mix Friday',100],['Goat',130]]],
 ['Extras',[['Chips',30],['Chopped Chillies',5],['Starch',15],['Green Salad',40],['Veggies',15]]],
 ['Desserts',[['Peppermint Crisp Tart',50],['Peach or Mango Dream',50]]],
 ['Drinks',[['Cold Drinks (330ml)',20],['Liquifruit (300ml)',25],['Appletizer (330ml)',30],['Grapetizer (330ml)',30],['Tonic Water (200ml)',18],['Pink Tonic (200ml)',18],['Lemonade (200ml)',18],['Dry Lemon (200ml)',18],['Soda Water (200ml)',15],['Still Water (500ml)',15],['Sparkling Water (500ml)',30]]],
];
const descriptions: Record<string,string> = {
 'Platter for 2':'Chicken wings, chicken strips, meatballs, pork ribs and chips.',
 'Braai Platter for 2':'Chicken wings, meatballs, beef sausage and beef steak. Served with chips or two sides of the day.',
 'Cheesy Chips':'Cheese sauce, jalapeños and jalapeño sauce.',
 'Loaded Chips':'Bacon, cheese sauce, jalapeños and jalapeño sauce.',
 'Dagwood':'Beef patties, cheese, pickled onions, tomato, lettuce, egg and Khuzi mayo. Served with chips.',
 'Peppermint Crisp Tart':'Biscuits, caramel, whipped cream and Peppermint Crisp chocolate.',
 'Peach or Mango Dream':'Vanilla sponge, peach or mango pieces and whipped cream.',
};
// Business-supplied menu artwork. Category fallbacks are explicitly labelled as illustrations.
type DishImage = { image: string; imageAlt: string; imageCaption: string };
const artwork = (file: string, alt: string, caption = 'Menu illustration'): DishImage => ({
 image: `/images/menu/${file}.webp`, imageAlt: alt, imageCaption: caption,
});
const categoryImages: Record<string, DishImage> = {
 'Traditional Meals': artwork('mogodu', 'Illustration of a traditional meal with pap and greens', 'Traditional meals ? category illustration'),
 'Chicken Combos': artwork('chicken-chips', 'Illustration of grilled chicken with chips and salad', 'Chicken combos ? category illustration'),
 'Platters to Share': artwork('mixed-grill', 'Illustration of a mixed grilled-meat sharing platter', 'Sharing platters ? category illustration'),
 'Dagwood & Wraps': artwork('burger-wrap', 'Illustration of a burger, wrap and chips', 'Dagwood & wraps ? category illustration'),
 'Chips & More': artwork('loaded-chips', 'Illustration of loaded cheesy jalape?o chips', 'Chips & more ? category illustration'),
 'Weekly Specials': artwork('barbecue-platter', 'Illustration of a barbecue platter with pap', 'Weekly specials ? category illustration'),
 'Extras': artwork('loaded-chips', 'Illustration of loaded chips from the sides selection', 'Sides ? category illustration'),
 'Desserts': artwork('desserts', 'Illustration of mint chocolate tart and peach cream dessert', 'Desserts ? category illustration'),
 'Drinks': artwork('drinks', 'Illustration of chilled bottled drinks, beer and wine', 'Drinks ? category illustration'),
};
const dishImages: Record<string, DishImage> = {
 'Mogodu': artwork('mogodu', 'Mogodu menu illustration with pap and greens'),
 'Mogodu Monday': artwork('mogodu', 'Mogodu special menu illustration with pap and greens'),
 'Beef (Stew or Braai)': artwork('grilled-beef', 'Braai beef menu illustration with pap and vegetables'),
 'Chicken Hard Body': artwork('traditional-chicken', 'Traditional chicken menu illustration with pap and vegetables'),
 'Full Chicken': artwork('chicken-chips', 'Grilled chicken menu illustration with chips and salad'),
 'Platter for 2': artwork('mixed-grill', 'Sharing platter menu illustration'),
 'Braai Platter for 2': artwork('barbecue-platter', 'Braai platter menu illustration with grilled meats and pap'),
 'Braai Mix Friday': artwork('barbecue-platter', 'Braai mix special menu illustration'),
 'Loaded Chips': artwork('loaded-chips', 'Loaded cheesy jalape?o chips menu illustration'),
};
const drinkSubcategory = (name: string) => (name.startsWith('Still Water') || name.startsWith('Sparkling Water')) ? 'Water'
 : ['Cold Drinks', 'Liquifruit', 'Appletizer', 'Grapetizer'].some(prefix => name.startsWith(prefix)) ? 'Soft drinks' : 'Mixers';
export const menu: MenuItem[] = groups.flatMap(([category,items]) => items.map(([name,price],i)=>({
 id:`${category}-${i}`, name, price, category,
 description:descriptions[name] ?? (category==='Traditional Meals'?'Served with your choice of pap, steamed bread or rice, plus two vegetables of the day.':undefined),
 ...(dishImages[name] || categoryImages[category]),
 subcategory: category === 'Drinks' ? drinkSubcategory(name) : undefined,
})));
export const menuCategories = ['All', 'Traditional Meals', 'Chicken Combos', 'Platters to Share', 'Dagwood & Wraps', 'Chips & More', 'Weekly Specials', 'Extras', 'Desserts', 'Drinks'];
