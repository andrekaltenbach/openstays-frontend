import { useState } from 'react';
import axios from 'axios';
import PostForm from './PostForm';
import type { Post } from '../types/index';
const API_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

export default function CreatePostCard({ fetchPosts }: { fetchPosts: () => void }) {
  const [formStatus, setFormStatus] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({
    id: '',
    title: '',
    location: '',
    fromDate: '',
    untilDate: '',
    permanentOffer: false,
    maxNumberOfNights: 0,
    maxNumberOfPeople: 0,
    hasFacilities: false,
    hasWifi: false,
    hasKitchen: false,
    hasWashingMachine: false,
    hasShower: false,
    isTent: false,
    isCaravan: false,
    isBed: false,
    text: '',
    rating: 0,
    ratingCount: 0,
    imageUrl: '',
    createdAt: '',
    updatedAt: '',
    userName: '',
    userId: '',
    reviews: [],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id, createdAt, updatedAt, rating, ratingCount, userId, reviews, ...newPostData } = post;

    newPostData.fromDate = newPostData.fromDate ? new Date(newPostData.fromDate).toISOString() : '';
    newPostData.untilDate = newPostData.untilDate
      ? new Date(newPostData.untilDate).toISOString()
      : '';

    try {
      await axios.post(`${API_URL}/api/posts`, newPostData);
      setFormStatus(false);
      fetchPosts();
      setPost({
        id: '',
        title: '',
        location: '',
        fromDate: '',
        untilDate: '',
        permanentOffer: false,
        maxNumberOfNights: 0,
        maxNumberOfPeople: 0,
        hasFacilities: false,
        hasWifi: false,
        hasKitchen: false,
        hasWashingMachine: false,
        hasShower: false,
        isTent: false,
        isCaravan: false,
        isBed: false,
        text: '',
        rating: 0,
        ratingCount: 0,
        imageUrl: '',
        createdAt: '',
        updatedAt: '',
        userName: '',
        userId: '',
        reviews: [],
      });
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="card mx-auto p-4">
      {formStatus ? (
        <PostForm
          post={post}
          setPost={setPost}
          setFormStatus={setFormStatus}
          handleSubmit={handleSubmit}
          mode="create"
        />
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-center">Add a new post</h2>
          <button onClick={() => setFormStatus(true)} className="btn btn-primary mt-4">
            Add New Post
          </button>
        </>
      )}
    </div>
  );
}
