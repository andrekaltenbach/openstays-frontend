import { useEffect, useState } from 'react';
import type { Post } from '../types/index'; // Adjust the import path as necessary
import axios from 'axios';
import {
  ToiletPaperIcon,
  WifiHighIcon,
  WifiSlashIcon,
  CookingPotIcon,
  WashingMachineIcon,
  BathtubIcon,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import CreatePostCard from '../components/CreatePostCard';

export default function PostListPage() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'; // Adjust the server URL as necessary

  const fetchPosts = async () => {
    try {
      const response = await axios.get<Post[]>(`${API_URL}/api/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!posts) {
    return <p className="text-gray-500">Loading posts...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div>
        <CreatePostCard fetchPosts={fetchPosts} />
      </div>
      {posts ? (
        posts
          .map((post) => (
            <Link to={`/posts/${post.id}`} key={post.id}>
              <div key={post.id} className="card">
                <div className="flex flex-col sm:flex-row gap-6">
                  <img
                    src={post.imageUrl ? post.imageUrl : '../public/image-na.jpg'}
                    alt={post.title}
                    className="w-full sm:w-48 h-48 object-cover mb-2 bg-amber-300"
                  />
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p className="text-gray-600 pb-3">{post.location}</p>
                    {post.permanentOffer ? (
                      <p className="text-green-500">Permanent Offer</p>
                    ) : (
                      post.fromDate &&
                      post.untilDate && (
                        <p className="text-gray-500">
                          Offer valid <br /> from: {new Date(post.fromDate).toLocaleDateString()}{' '}
                          <br /> until: {new Date(post.untilDate).toLocaleDateString()}
                        </p>
                      )
                    )}
                    <p className="text-gray-500">Max Nights: {post.maxNumberOfNights}</p>
                    <div className="flex gap-2">
                      <p className="text-gray-500">
                        {post.hasFacilities && <ToiletPaperIcon size={24} weight="duotone" />}
                      </p>
                      <p className="text-gray-500">
                        {post.hasWifi ? (
                          <WifiHighIcon size={24} weight="light" />
                        ) : (
                          <WifiSlashIcon size={24} weight="light" />
                        )}
                      </p>
                      <p className="text-gray-500">
                        {post.hasKitchen && <CookingPotIcon size={24} weight="duotone" />}
                      </p>
                      <p className="text-gray-500">
                        {post.hasWashingMachine && (
                          <WashingMachineIcon size={24} weight="duotone" />
                        )}
                      </p>
                      <p className="text-gray-500">
                        {post.hasShower && <BathtubIcon size={24} weight="duotone" />}
                      </p>
                    </div>
                    <p className="text-gray-500">
                      Rating: {post.rating} / 5 ({post.ratingCount} reviews)
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  Posted by {post.userName} on {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))
          .reverse()
      ) : (
        <p className="text-gray-500">Loading posts...</p>
      )}
    </div>
  );
}
