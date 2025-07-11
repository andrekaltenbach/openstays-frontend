import axios from 'axios';
import type { Post, PostDetailsCardProps, Review } from '../types';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import EditPost from './EditPost';
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
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

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
        toast.error('Error fetching post');
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
        console.log('get Reviews data:', response.data);
      } catch (error) {
        console.error('Error getting reviews:', error);
        toast.error('Error getting reviews data');
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
        toast.success('Post deleted successfully');

        setPost(null);
        navigate('/');
      } catch (error) {
        console.error('Error deleting post:', error);
        toast.error('Error deleting post');
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
          <div className="card mx-auto">
            <div className="flex flex-col gap-6">
              <img
                src={post.imageUrl ? post.imageUrl : '../public/image-na.jpg'}
                alt={post.title}
                className="w-full h-74 object-cover mb-2 rounded-t-lg"
              />
              <div className="flex flex-col gap-2 px-4">
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
                  {post.hasFacilities && (
                    <p className="text-gray-600">
                      <ToiletPaperIcon size={24} weight="duotone" />
                    </p>
                  )}
                  {post.hasWifi && (
                    <p className="text-gray-600">
                      <WifiHighIcon size={24} weight="light" />
                    </p>
                  )}
                  {post.hasKitchen && (
                    <p className="text-gray-600">
                      <CookingPotIcon size={24} weight="duotone" />
                    </p>
                  )}
                  {post.hasWashingMachine && (
                    <p className="text-gray-600">
                      <WashingMachineIcon size={24} weight="duotone" />
                    </p>
                  )}
                  {post.hasShower && (
                    <p className="text-gray-600">
                      <BathtubIcon size={24} weight="duotone" />
                    </p>
                  )}
                  {post.isTent && (
                    <p className="text-gray-600">
                      <TentIcon size={24} weight="duotone" />
                    </p>
                  )}
                  {post.isCaravan && (
                    <p className="text-gray-600">
                      <VanIcon size={24} weight="duotone" />
                    </p>
                  )}
                  {post.isBed && (
                    <p className="text-gray-600">
                      <BedIcon size={24} weight="duotone" />
                    </p>
                  )}
                </div>
                <p className="text-gray-600">
                  Rating: {post.rating.toFixed(1)} / 5 ({post.ratingCount}{' '}
                  {post.ratingCount === 1 ? 'review' : 'reviews'})
                </p>
              </div>
            </div>
            <div className="flex flex-col -space-y-2 px-4">
              <p className="mt-2 text-sm text-gray-400">
                Posted by {post.userName} on {new Date(post.createdAt).toLocaleDateString()}
              </p>
              {post.updatedAt != post.createdAt && (
                <p className="mt-2 text-sm text-gray-400">
                  (edited on: {new Date(post.updatedAt).toLocaleDateString()})
                </p>
              )}
            </div>
            <div className="flex justify-between items-center mt-4 px-4">
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
              <ReviewsCard post={post} fetchPost={fetchPost} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
