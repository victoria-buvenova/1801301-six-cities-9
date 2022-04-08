export type Location = {
  latitude: number
  longitude: number
  zoom: number
}

export type City = {
  location: Location
  name: string
}
export type Host = {
  avatarUrl: string
  id: number
  isPro: boolean
  name: string
}

export type Offer = {
  bedrooms: number
  city: City
  description: string
  goods: string[]
  host: Host
  id: number
  images: string[]
  isFavorite: boolean
  isPremium: boolean
  location: Location
  maxAdults: number
  previewImage: string
  price: number
  rating: number
  title: string
  type: string
};

export type Props = {
  offers: Offer[];
};

export type OffersListProps = {
  offers: Offer[];
  active: number | undefined;
  setActive: (active: number | undefined) => void;
};

export type Review = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: Host
};

export type ReviewsListProps = {
  reviews: Review[];
};
