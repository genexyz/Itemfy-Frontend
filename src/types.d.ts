export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  user: string;
  reviews: string[];
}

export interface SingleReview {
  _id: string;
  rating: number;
  comment: string;
  product: string;
}

export interface CompleteReview {
  _id: string;
  rating: number;
  comment: string;
  product: {
    _id: string;
    title: string;
    description: string;
    price: number;
  };
}
