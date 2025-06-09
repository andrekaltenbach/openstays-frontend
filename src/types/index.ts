export type Post = {
  id: string;
  title: string;
  location: string;
  fromDate: string;
  untilDate: string;
  permanentOffer: boolean;
  maxNumberOfNights: number;
  hasFacilities: boolean;
  hasWifi: boolean;
  hasKitchen: boolean;
  hasWashingMachine: boolean;
  hasShower: boolean;
  text: string;
  rating: number;
  ratingCount: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
  userId: string;
  reviews: Reviews[];
};

export type Reviews = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  text: string;
  rating: number;
  userName: string;
  userId: string;
  postId: string;
  post: Post;
};

export type PostDetailsCardProps = {
  postId?: string;
};
