export type Product = {
  id: string;
  name: string;
  brand: string;
  description: string;
  longDescription: string;
  price: number;
  image: {
    id: string;
    url: string;
    alt: string;
    hint: string;
  };
  reviews: {
    rating: number;
    text: string;
    author: string;
  }[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type ShippingAddress = {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type Order = {
  id: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  total: number;
  createdAt: Date;
  status: 'pending' | 'paid' | 'shipped';
};
