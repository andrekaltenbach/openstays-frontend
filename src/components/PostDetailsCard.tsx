import axios from 'axios';
import type { Post, PostDetailsCardProps } from '../types';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import EditPost from './EditPost'; // Adjust the import path as necessary
import {
  ToiletPaperIcon,
  WifiHighIcon,
  WifiSlashIcon,
  CookingPotIcon,
  WashingMachineIcon,
  BathtubIcon,
  PencilSimpleLineIcon,
  TrashIcon,
} from '@phosphor-icons/react';

const API_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'; // Adjust the server URL as necessary

export default function PostDetailsCard({ postId }: PostDetailsCardProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [editStatus, setEditStatus] = useState<boolean>(false);
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
  }, [postId]);

  const deletePost = async () => {
    if (postId) {
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
  console.log('editStatus', editStatus);
  return (
    <div>
      {!post ? (
        <p className="text-gray-500">Loading post details...</p>
      ) : editStatus ? (
        <EditPost
          post={post}
          setPost={setPost}
          fetchPost={fetchPost}
          setEditStatus={setEditStatus}
        />
      ) : (
        <>
          <div className="card mx-auto p-4">
            <div className="flex flex-col gap-6">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover mb-2 bg-amber-300"
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
                      From: {post.fromDate} Until: {post.untilDate}
                    </p>
                  )
                )}
                <p className="text-gray-600">Max Nights: {post.maxNumberOfNights}</p>
                <div className="flex flex-wrap gap-2">
                  <p className="text-gray-600">
                    {post.hasFacilities && <ToiletPaperIcon size={24} weight="duotone" />}
                  </p>
                  <p className="text-gray-600">
                    {post.hasWifi ? (
                      <WifiHighIcon size={24} weight="light" />
                    ) : (
                      <WifiSlashIcon size={24} weight="light" />
                    )}
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
                <button onClick={() => setEditStatus(true)}>
                  <PencilSimpleLineIcon size={24} weight="duotone" className="text-gray-500" />
                </button>
                <button
                  onClick={() => {
                    deletePost();
                  }}
                >
                  <TrashIcon size={24} weight="duotone" className="text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
