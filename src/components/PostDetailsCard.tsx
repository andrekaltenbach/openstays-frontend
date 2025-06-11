import axios from 'axios';
import type { Post, PostDetailsCardProps, Review } from '../types';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import EditPost from './EditPost'; // Adjust the import path as necessary
import {
  ToiletPaperIcon,
  WifiHighIcon,
  CookingPotIcon,
  WashingMachineIcon,
  BathtubIcon,
  PencilSimpleLineIcon,
  TrashIcon,
  TentIcon,
  VanIcon,
  BedIcon,
} from '@phosphor-icons/react';
import ReviewsCard from './ReviewsCard';

const API_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'; // Adjust the server URL as necessary

export default function PostDetailsCard({ postId }: PostDetailsCardProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [formStatus, setFormStatus] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchPost = async () => {
    if (postId) {
      try {
        const post = await axios.get<Post>(`${API_URL}/api/posts/${postId}`);
        console.log('Post data:', post.data);
        setPost(post.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId, reviews]);

  const deletePost = async () => {
    if (postId) {
      let reviewsArr: Review[] = [];

      try {
        const response = await axios.get(`${API_URL}/api/posts/${postId}/reviews`);
        reviewsArr = response.data;
        setReviews(reviewsArr);
        console.log('Reviews data:', response.data);
      } catch (error) {
        console.error('Error getting reviews:', error);
      }
      try {
        console.log('try Deleting reviews for postId:', postId);
        if (Array.isArray(reviewsArr)) {
          console.log(reviewsArr);
          for (const review of reviewsArr) {
            await axios.delete(`${API_URL}/api/posts/${postId}/reviews/${review.id}`);
          }
          console.log('Reviews deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting reviews:', error);
      }
      try {
        await axios.delete(`${API_URL}/api/posts/${postId}`);
        console.log('Post deleted successfully');
        setPost(null);
        navigate('/');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (!postId) {
    return <p className="text-gray-500">Loading ...</p>;
  }
  console.log('editStatus', formStatus);
  return (
    <div>
      {!post ? (
        <p className="text-gray-500">Loading post details...</p>
      ) : formStatus ? (
        <EditPost
          post={post}
          setPost={setPost}
          fetchPost={fetchPost}
          setFormStatus={setFormStatus}
        />
      ) : (
        <>
          <div className="card mx-auto p-4">
            <div className="flex flex-col gap-6">
              <img
                src={post.imageUrl ? post.imageUrl : '../public/image-na.jpg'}
                alt={post.title}
                className="w-full h-74 object-cover mb-2 bg-amber-300"
              />
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-600 pb-3">{post.location}</p>
                <p className="pb-3">{post.text}</p>
                {post.permanentOffer ? (
                  <p className="text-green-500">Permanent Offer</p>
                ) : (
                  post.fromDate &&
                  post.untilDate && (
                    <p className="text-gray-600">
                      Offer valid <br /> from: {new Date(post.fromDate).toLocaleDateString()} <br />{' '}
                      until: {new Date(post.untilDate).toLocaleDateString()}
                    </p>
                  )
                )}
                <p className="text-gray-600">Max Nights: {post.maxNumberOfNights}</p>
                <p className="text-gray-600">Max Guests: {post.maxNumberOfPeople}</p>
                <div className="flex flex-wrap gap-2">
                  <p className="text-gray-600">
                    {post.hasFacilities && <ToiletPaperIcon size={24} weight="duotone" />}
                  </p>
                  <p className="text-gray-600">
                    {post.hasWifi && <WifiHighIcon size={24} weight="light" />}
                  </p>
                  <p className="text-gray-600">
                    {post.hasKitchen && <CookingPotIcon size={24} weight="duotone" />}
                  </p>
                  <p className="text-gray-600">
                    {post.hasWashingMachine && <WashingMachineIcon size={24} weight="duotone" />}
                  </p>
                  <p className="text-gray-600">
                    {post.hasShower && <BathtubIcon size={24} weight="duotone" />}
                  </p>
                  <p className="text-gray-600">
                    {post.isTent && <TentIcon size={24} weight="duotone" />}
                  </p>
                  <p className="text-gray-600">
                    {post.isCaravan && <VanIcon size={24} weight="duotone" />}
                  </p>
                  <p className="text-gray-600">
                    {post.isBed && <BedIcon size={24} weight="duotone" />}
                  </p>
                </div>
                <p className="text-gray-600">
                  Rating: {post.rating} / 5 ({post.ratingCount} reviews)
                </p>
              </div>
            </div>
            <div className="flex flex-col -space-y-2">
              <p className="mt-2 text-sm text-gray-400">
                Posted by {post.userName} on {new Date(post.createdAt).toLocaleDateString()}
              </p>
              {post.updatedAt != post.createdAt && (
                <p className="mt-2 text-sm text-gray-400">
                  (edited on: {new Date(post.updatedAt).toLocaleDateString()})
                </p>
              )}
            </div>
            <div className="flex justify-between items-center mt-4">
              <Link to={'/'}>
                <button className="btn btn-primary">Back</button>
              </Link>

              <div className="flex justify-end gap-4 mt-4">
                <button onClick={() => setFormStatus(true)}>
                  <PencilSimpleLineIcon
                    size={24}
                    weight="duotone"
                    className="text-gray-500 cursor-pointer"
                  />
                </button>
                <button
                  onClick={() => {
                    deletePost();
                  }}
                >
                  <TrashIcon size={24} weight="duotone" className="text-gray-500 cursor-pointer" />
                </button>
              </div>
            </div>
            <div className="mt-8">
              <ReviewsCard post={post} />
              {/* <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold my-4">Reviews</h2>
                <button onClick={() => setReviewStatus(true)}>
                  <PlusIcon size={32} className="cursor-pointer" />
                </button>
              </div>
              {post && post.reviews && post.reviews.length > 0 ? (
                post.reviews.map((review) => (
                  <div key={review.id} className="card mx-auto p-4 mb-4">
                    <p className="text-gray-600">{review.text}</p>
                    <p className="text-gray-500">Rating: {review.rating} / 5</p>
                    <p className="mt-2 text-sm text-gray-400">
                      Review by {review.userName} on{' '}
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No reviews available.</p>
              )} */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
