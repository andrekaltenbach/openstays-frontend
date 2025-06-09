import React, { useState } from 'react';
import axios from 'axios';
import type { EditPostProps } from '../types/index'; // Adjust the import path as necessary

export default function EditPost({ post, setPost, fetchPost, setEditStatus }: EditPostProps) {
  return (
    <div className="card mx-auto p-4">
      <form>
        <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
        <div className="mb-4">
          <label className="text-gray-700" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 mb-2" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={post.location}
            onChange={(e) => setPost({ ...post, location: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {/* Add more fields as necessary */}
        <button
          type="button"
          onClick={() => {
            fetchPost();
            setEditStatus(false);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
