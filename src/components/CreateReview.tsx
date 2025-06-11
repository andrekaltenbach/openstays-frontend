import type { CreateReviewProps } from '../types';
import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function CreateReview({ postId, setReviewStatus, fetchReviews }: CreateReviewProps) {
  const [review, setReview] = useState({
    title: '',
    text: '',
    rating: 0,
    userName: '',
    postId: postId,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!review.title || !review.text || review.rating <= 0 || !review.userName) {
      console.error('Please fill in all fields correctly.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/posts/${postId}/reviews`, review);
      console.log('Review created successfully:', response.data);
      fetchReviews();
      setReviewStatus(false);
      setReview({
        title: '',
        text: '',
        rating: 0,
        userName: '',
        postId: postId,
      });
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  return (
    <div className="card mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Create Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="text-gray-700 mb-2" htmlFor="title">
            Review Title
          </label>
          <input
            type="text"
            id="title"
            value={review.title}
            onChange={(e) => setReview({ ...review, title: e.target.value })}
            placeholder="Write your review here..."
          />
        </div>
        <div className="form-control">
          <label className="text-gray-700 mb-2" htmlFor="text">
            Review Text
          </label>
          <textarea
            id="text"
            rows={4}
            cols={50}
            value={review.text}
            onChange={(e) => setReview({ ...review, text: e.target.value })}
            placeholder="Write your review here..."
          />
        </div>
        <div className="form-control">
          <label className="text-gray-700 mb-2" htmlFor="rating">
            Review Rating
          </label>
          <input
            type="number"
            step={0.1}
            min={0}
            max={5}
            id="rating"
            value={review.rating}
            onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}
            placeholder="Write your review here..."
          />
        </div>
        <div className="form-control">
          <label className="text-gray-700 mb-2" htmlFor="userName">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            value={review.userName}
            onChange={(e) => setReview({ ...review, userName: e.target.value })}
            placeholder="Write your review here..."
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Save Review
        </button>
      </form>
    </div>
  );
}
