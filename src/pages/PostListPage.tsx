import { useEffect, useState } from "react";
import type{ Post } from "../types/index"; // Adjust the import path as necessary
import axios from "axios";

export default function PostListPage() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const API_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"; // Adjust the server URL as necessary

  useEffect(() => {
    axios.get<Post[]>(`${API_URL}/api/posts`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
    }, []);

  if (!posts) {
    return <p className="text-gray-500">Loading posts...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      { posts ? (
        posts.map((post) => (
          <div key={post.id} className="card">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.location}</p>
            <p className="text-gray-500">From: {post.fromDate} Until: {post.untilDate}</p>
            <p className="text-gray-500">Rating: {post.rating} ({post.ratingCount} reviews)</p>
            <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover mb-2" />
            <p>{post.text}</p>
            <p className="mt-2 text-sm text-gray-400">Posted by {post.userName} on {new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        ))
        ) : (
          <p className="text-gray-500">Loading posts...</p>
        )}
      
    </div>
  );
}