import { useEffect, useState } from 'react';
import type { Post, PostFilters } from '../types/index'; // Adjust the import path as necessary
import axios from 'axios';
import {
  ToiletPaperIcon,
  WifiHighIcon,
  CookingPotIcon,
  WashingMachineIcon,
  BathtubIcon,
  TentIcon,
  VanIcon,
  BedIcon,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import CreatePostCard from '../components/CreatePostCard';
import Filterbar from '../components/Filterbar';

export default function PostListPage() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const fetchPosts = async (filters?: PostFilters) => {
    try {
      const response = await axios.get<Post[]>(`${API_URL}/api/posts`, { params: filters });
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
      <div>{posts && <Filterbar posts={posts} fetchPosts={fetchPosts} />}</div>
      {posts ? (
        posts
          .map((post) => (
            <Link to={`/posts/${post.id}`} key={post.id}>
              <div key={post.id} className="card">
                <div className="flex flex-col sm:flex-row gap-6">
                  <img
                    src={post.imageUrl ? post.imageUrl : '/image-na.jpg'}
                    alt={post.title}
                    className="w-full sm:w-48 md:w-80 h-48 object-cover mb-2"
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
                    <p className="text-gray-500">
                      Rating: {post.rating.toFixed(1)} / 5 ({post.ratingCount}{' '}
                      {post.ratingCount === 1 ? 'review' : 'reviews'})
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
