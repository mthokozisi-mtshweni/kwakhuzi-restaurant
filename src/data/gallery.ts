import { photo } from './site';
export type GalleryImage = {src:string; alt:string; category:string};
export const galleryCategories = ['All', 'The Venue', 'Food & Drinks', 'Events', 'Atmosphere'];
const entries: [string,string,string][] = [
 ['20.42.17','Kwa’Khuzi meat platters with chips','Food'],['20.42.22 (3)','Open dining area with woven chairs','Interior'],['20.42.20 (2)','Traditional meal with rice and vegetables','Food'],['20.42.23 (2)','Kwa’Khuzi entrance in the afternoon','Exterior'],['20.42.20','Refreshments at the restaurant','Drinks'],['20.42.21','Wrap with chips','Food'],['20.42.24','Restaurant tables and bar','Interior'],['20.42.21 (1)','Layered dessert cups','Food'],['20.42.18','Outdoor fire pit','Atmosphere'],['20.42.19','Outdoor seating under the blue sky','Atmosphere'],['20.42.15','Covered restaurant seating','Interior'],['20.42.14','Official restaurant signage','Exterior'],['20.42.15 (2)','Restaurant bar','Interior'],['20.42.19 (1)','Individual dessert portions','Food'],['20.42.19 (2)','Bottles chilled for the table','Drinks'],['20.42.20 (1)','Overhead view of the venue','Exterior'],['20.42.20 (3)','Grilled meat and chips','Food'],['20.42.21 (2)','Toasted dagwood with chips','Food'],['20.42.22 (2)','Dining room and wooden ceiling','Interior'],['20.42.23 (1)','Restaurant building at sunset','Exterior'],['20.42.23 (3)','Outdoor courtyard','Exterior'],['20.42.23','Sunlit outdoor seating','Atmosphere'],['20.42.24 (1)','Indoor restaurant seating','Interior'],['20.42.24 (2)','Restaurant courtyard and building','Exterior'],['20.42.25 (1)','Restaurant entrance and covered seating','Exterior'],['20.42.25 (2)','Entrance from the courtyard','Exterior'],['20.42.25 (3)','View toward the road','Exterior'],['20.42.25','Venue surroundings','Exterior'],['20.42.26 (1)','Approach to the venue','Exterior'],['20.42.26 (2)','Outdoor venue at dusk','Exterior'],['20.42.26','View of the restaurant from outside','Exterior'],['20.42.27','Bar and roof details','Interior'],
];
// One source collection serves the homepage preview and complete gallery.
const previewOrder = ['20.42.23 (2)', '20.42.20 (2)', '20.42.23', '20.42.27', '20.42.20 (1)', '20.42.17', '20.42.22 (2)', '20.42.20'];
export const gallery: GalleryImage[] = [...entries]
 .sort((a, b) => {
   const rank = (name: string) => previewOrder.includes(name) ? previewOrder.indexOf(name) : previewOrder.length;
   return rank(a[0]) - rank(b[0]);
 })
 .map(([name, alt, category]) => ({
   src: photo(name), alt,
   category: category === 'Food' || category === 'Drinks' ? 'Food & Drinks'
     : category === 'Atmosphere' ? 'Atmosphere' : 'The Venue',
 }));
