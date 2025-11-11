import type {Product} from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Scent of Serenity',
    brand: 'Aura Fragrances',
    description: 'A calming blend of lavender and chamomile.',
    longDescription:
      'Experience tranquility with Scent of Serenity. This elegant perfume combines the soothing notes of fresh lavender with the gentle sweetness of chamomile flowers, resting on a warm base of sandalwood. Perfect for daily wear or moments of quiet reflection.',
    price: 59.99,
    image: {
      id: 'perfume-1',
      url: 'https://picsum.photos/seed/p1/400/400',
      alt: 'Scent of Serenity perfume bottle',
      hint: 'perfume bottle',
    },
    reviews: [
      {
        rating: 5,
        text: 'Absolutely divine! So calming and lasts all day.',
        author: 'Julia M.',
      },
      {
        rating: 4,
        text: 'A beautiful, clean scent. I wish it was a little stronger.',
        author: 'Alex R.',
      },
    ],
  },
  {
    id: '2',
    name: 'Midnight Bloom',
    brand: 'Nocturne Elixirs',
    description: 'A mysterious mix of jasmine and black orchid.',
    longDescription:
      'Embrace the night with Midnight Bloom. A seductive and mysterious fragrance featuring a heart of night-blooming jasmine and rare black orchid, with intriguing top notes of plum and a base of dark chocolate and amber. Ideal for evening occasions.',
    price: 75.5,
    image: {
      id: 'perfume-2',
      url: 'https://picsum.photos/seed/p2/400/400',
      alt: 'Midnight Bloom perfume bottle',
      hint: 'perfume bottle',
    },
    reviews: [
      {
        rating: 5,
        text: "This is my new signature scent. It's so unique and sexy.",
        author: 'Chloe T.',
      },
      {
        rating: 5,
        text: 'I get compliments every time I wear this. Worth every penny.',
        author: 'Samuel B.',
      },
    ],
  },
  {
    id: '3',
    name: 'Golden Hour',
    brand: 'Solstice Scents',
    description: 'A warm, radiant scent with notes of citrus and vanilla.',
    longDescription:
      "Capture the magic of sunset with Golden Hour. This radiant perfume glows with bright top notes of bergamot and mandarin, a heart of warm neroli, and a creamy base of vanilla and musk. It's like sunshine in a bottle.",
    price: 68.0,
    image: {
      id: 'perfume-3',
      url: 'https://picsum.photos/seed/p3/400/400',
      alt: 'Golden Hour perfume bottle',
      hint: 'perfume bottle',
    },
    reviews: [
      {
        rating: 4,
        text: 'Lovely and warm, perfect for summer evenings.',
        author: 'Isabella P.',
      },
      {
        rating: 4,
        text: "A very pleasant citrusy vanilla. It's nice, but not very long-lasting on me.",
        author: 'David L.',
      },
    ],
  },
  {
    id: '4',
    name: 'Ocean Breeze',
    brand: 'Aqua Aromas',
    description: 'A fresh, aquatic fragrance with hints of sea salt.',
    longDescription:
      'Feel the refreshing spray of the ocean. Ocean Breeze is a crisp and invigorating fragrance that combines notes of sea salt, coastal sage, and a touch of driftwood. It\'s a clean, unisex scent that evokes a walk on a windswept beach.',
    price: 55.0,
    image: {
      id: 'perfume-4',
      url: 'https://picsum.photos/seed/p4/400/400',
      alt: 'Ocean Breeze perfume bottle',
      hint: 'perfume bottle',
    },
    reviews: [
      {
        rating: 5,
        text: "The perfect fresh scent! It's not overpowering at all.",
        author: 'Emily K.',
      },
      {rating: 3, text: 'Smells great but fades very quickly.', author: 'Mark F.'},
    ],
  },
];
