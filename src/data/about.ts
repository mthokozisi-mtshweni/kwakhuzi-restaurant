import { photo } from './site';

// Replace draft text with management-approved history and team information.
export const aboutSections = [
  {
    id: 'story', eyebrow: 'OUR STORY', before: 'The ', highlight: 'Kwa’Khuzi', after: ' Story',
    image: photo('20.42.22 (3)'), alt: 'Kwa’Khuzi dining space with woven chairs beneath a wooden ceiling',
    paragraphs: ['Kwa’Khuzi is a place for traditional flavours and shared meals in KwaMhlanga, near Solomon Mahlangu Stadium.', 'From a familiar favourite to a platter shared with friends, the table is where the Kwa’Khuzi experience begins.'],
    note: 'Draft story · Management’s founding story, the meaning behind the name and the business history are still to be added.',
  },
  {
    id: 'heritage', eyebrow: 'OUR FOOD & CULTURAL HERITAGE', before: 'Authentic ', highlight: 'Local Flavours', after: '',
    image: photo('20.42.17'), alt: 'Actual Kwa’Khuzi sharing platters of grilled meat and chips',
    paragraphs: ['Our menu brings together traditional South African meals, chicken combos and platters to share, alongside dagwood, wraps and sides.', 'Explore favourites such as mogodu and beef, with traditional meals served with a choice of pap, steamed bread or rice, plus two vegetables of the day.'],
  },
  {
    id: 'team', eyebrow: 'OUR TEAM', before: 'Meet the People Behind ', highlight: 'Kwa’Khuzi', after: '',
    image: photo('20.42.22 (2)'), alt: 'The restaurant’s actual lounge and dining space, used temporarily in place of a team portrait',
    caption: 'Our venue · Approved team portrait to follow',
    paragraphs: ['Behind every meal are the people who prepare the food, welcome guests and keep the restaurant experience moving.', 'This space will introduce the Kwa’Khuzi team once approved staff information and portraits are available.'],
    note: 'Draft introduction · Team profiles and an approved staff photograph are pending.',
  },
  {
    id: 'experience', eyebrow: 'THE KWA’KHUZI EXPERIENCE', before: 'A Place to Dine, Relax ', highlight: 'and Connect', after: '',
    image: photo('20.42.23'), alt: 'Outdoor courtyard tables and covered seating at Kwa’Khuzi',
    paragraphs: ['From traditional meals to moments shared with family and friends, Kwa’Khuzi brings people together in a welcoming setting.', 'Take a look around the courtyard, outdoor seating and dining areas, and find a place at the table.'],
  },
];

// Proposed positioning, not an approved statement of company policy.
export const aboutValues = [
  { title: 'Our Vision', text: 'To celebrate traditional food and offer a place for people to gather in KwaMhlanga.' },
  { title: 'Our Values', text: 'Care for food, hospitality and the cultural heritage that connects people around a table.' },
  { title: 'Our Promise', text: 'To aim for a welcoming visit, generous meals and time well shared.' },
];
