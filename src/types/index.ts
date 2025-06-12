export type Post = {
  id: string;
  title: string;
  location: string;
  fromDate: string;
  untilDate: string;
  permanentOffer: boolean;
  maxNumberOfNights: number;
  maxNumberOfPeople: number;
  hasFacilities: boolean;
  hasWifi: boolean;
  hasKitchen: boolean;
  hasWashingMachine: boolean;
  hasShower: boolean;
  isTent: boolean;
  isCaravan: boolean;
  isBed: boolean;
  text: string;
  rating: number;
  ratingCount: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
  userId: string;
  reviews: Review[];
};

export type Review = {
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

export type PostProps = {
  post: Post;
  setPost: (post: Post) => void;
  setFormStatus: (status: boolean) => void;
  fetchPost: () => Promise<void>;
};

export type ReviewsCardProps = {
  post: Post;
  fetchPost: () => void;
};

export type CreateReviewProps = {
  postId: string;
  setReviewStatus: (status: boolean) => void;
  fetchReviews: () => void;
  fetchPost: () => void;
};

export type FilterbarProps = {
  posts: Post[];
  fetchPosts: (filters?: PostFilters) => Promise<void>;
};

export type PostFilters = {
  location?: string;
  isTent?: boolean;
  isCaravan?: boolean;
  isBed?: boolean;
};
