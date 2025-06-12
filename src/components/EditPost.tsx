import axios from 'axios';
import type { PostProps } from '../types/index';
import PostForm from './PostForm';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export default function EditPost({ post, setPost, fetchPost, setFormStatus }: PostProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const toISODate = (dateStr: string) => (dateStr ? new Date(dateStr).toISOString() : '');
      const { id, createdAt, updatedAt, rating, ratingCount, userId, ...editableFields } = post;
      editableFields.fromDate = toISODate(post.fromDate);
      editableFields.untilDate = toISODate(post.untilDate);
      console.log('Sending to backend:', editableFields);
      const response = await axios.put(`${API_URL}/api/posts/${post.id}`, editableFields);
      console.log('Post updated successfully:', response.data);
      toast.success('Post updated successfully');

      fetchPost();
      setFormStatus(false);
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Error updating post');
    }
  };
  if (!post) {
    return <div>Loading...</div>;
  }
  if (!post.id) {
    return <div className="text-red-500">Post not found.</div>;
  }

  return (
    <PostForm
      post={post}
      setPost={setPost}
      setFormStatus={setFormStatus}
      handleSubmit={handleSubmit}
      mode="edit"
    />
  );
}
