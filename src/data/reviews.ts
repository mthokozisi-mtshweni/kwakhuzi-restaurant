export type Review = {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  text: string;
  date?: string; // ISO date, only when supplied.
  verified?: boolean; // Set only when guest verification is substantiated.
  sample?: boolean;
};

// Add only authentic testimonials approved for publication.
export const reviews: Review[] = [];

// Configure only after the source, rating and review count are confirmed.
export const reviewSummary: { rating: number | null; count: number | null; source: string | null } = {
  rating: null,
  count: null,
  source: null,
};

// Preview-only examples. These are excluded from production rendering.
export const sampleReviews: Review[] = [
  { id: 'sample-1', name: 'Sample Guest 01', rating: 5, text: 'An example of a guest sharing what they enjoyed about a traditional meal and time around the table.', sample: true },
  { id: 'sample-2', name: 'Sample Guest 02', rating: 5, text: 'A sample review about gathering with friends, sharing a platter and enjoying an afternoon together.', sample: true },
  { id: 'sample-3', name: 'Sample Guest 03', rating: 4, text: 'An illustrative space for feedback about the atmosphere, service and overall dining experience.', sample: true },
  { id: 'sample-4', name: 'Sample Guest 04', rating: 5, text: 'An example of a family describing a favourite dish and the memories made during their visit.', sample: true },
  { id: 'sample-5', name: 'Sample Guest 05', rating: 4, text: 'A sample testimonial about spending time in the courtyard and catching up over a meal.', sample: true },
  { id: 'sample-6', name: 'Sample Guest 06', rating: 5, text: 'An illustrative review about a return visit and discovering another favourite on the menu.', sample: true },
];
