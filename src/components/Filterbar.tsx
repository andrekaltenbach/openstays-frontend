import { useState } from 'react';
import type { FilterbarProps } from '../types';
import { MapPinAreaIcon, TentIcon, VanIcon, BedIcon } from '@phosphor-icons/react';

export default function Filterbar({ posts, fetchPosts }: FilterbarProps) {
  const [location, setLocation] = useState('');
  const [isTent, setIsTent] = useState(false);
  const [isCaravan, setIsCaravan] = useState(false);
  const [isBed, setIsBed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchPosts({ location, isTent, isCaravan, isBed });
  };

  return (
    <div className="card p-4 mb-4 flex items-center gap-4">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              <MapPinAreaIcon size={24} weight="duotone" />
            </label>
            <select
              id="location"
              name="location"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:border-lime-500 focus:ring-lime-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {posts.map((post) => (
                <option key={post.id} value={post.location}>
                  {post.location}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="isTent" className="block text-sm font-medium text-gray-700">
              <TentIcon size={24} weight="duotone" />
            </label>
            <input
              type="checkbox"
              id="isTent"
              checked={isTent}
              onChange={(e) => setIsTent(e.target.checked)}
            />
            <label htmlFor="isCaravan" className="block text-sm font-medium text-gray-700">
              <VanIcon size={24} weight="duotone" />
            </label>
            <input
              type="checkbox"
              id="isCaravan"
              checked={isCaravan}
              onChange={(e) => setIsCaravan(e.target.checked)}
            />
            <label htmlFor="isBed" className="block text-sm font-medium text-gray-700">
              <BedIcon size={24} weight="duotone" />
            </label>
            <input
              type="checkbox"
              id="isBed"
              checked={isBed}
              onChange={(e) => setIsBed(e.target.checked)}
            />
          </div>

          <button type="submit" className="font-bold text-lime-800 hover:underline">
            Filter
          </button>
        </div>
      </form>
    </div>
  );
}
