import { useEffect, useState } from 'react';
import { PlusIcon } from '@phosphor-icons/react';
import type { ReviewsCardProps, Review } from '../types/index';
import axios from 'axios';
import CreateReview from './CreateReview';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function ReviewsCard({ post }: ReviewsCardProps) {
  const [reviewStatus, setReviewStatus] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[] | null>(null);

  const fetchReviews = async () => {
    if (post?.id) {
      console.log('Fetching reviews for postId:', post.id);
      try {
        const response = await axios.get<Review[]>(`${API_URL}/api/posts/${post.id}/reviews`);
        const data = response.data;
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    } else {
      console.error('Post ID is not available');
    }
  };

  useEffect(() => {
    console.log('ReviewsCard mounted with post:', post);
    fetchReviews();
  }, [post]);

  return (
    <div className="bg-gray-100 mx-auto p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold my-4">Reviews</h2>
        <button>
          <PlusIcon
            size={32}
            className="cursor-pointer"
            onClick={() => {
              setReviewStatus(true);
            }}
          />
        </button>
      </div>
      {reviewStatus && (
        <div className="bg-white p-4 rounded shadow-md mb-4">
          <h3 className="text-xl font-semibold mb-2">Add a Review</h3>
          <CreateReview
            postId={post.id}
            setReviewStatus={setReviewStatus}
            fetchReviews={fetchReviews}
          />
        </div>
      )}
      {reviews ? (
        reviews.map((review) => (
          <div key={review.id} className="review-card mx-auto p-4 mb-4">
            <p className="text-gray-700 font-bold">{review.title}</p>
            <p className="text-gray-600">{review.text}</p>
            <p className="text-gray-500">Rating: {review.rating}</p>
            <p className="mt-2 text-sm text-gray-400">
              Review by {review.userName} on {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reviews available.</p>
      )}{' '}
    </div>
  );
}
