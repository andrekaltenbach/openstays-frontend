import { useParams } from 'react-router-dom';
import PostDetailsCard from '../components/PostDetailsCard';

export default function PostDetailsPage() {
  const { postId } = useParams<{ postId: string }>();
  return (
    <div className="container mx-auto p-4">{postId && <PostDetailsCard postId={postId} />}</div>
  );
}
