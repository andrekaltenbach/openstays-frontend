import axios from 'axios';
import type { EditPostProps } from '../types/index'; // Adjust the import path as necessary

const API_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'; // Adjust the server URL as necessary

export default function EditPost({ post, setPost, fetchPost, setFormStatus }: EditPostProps) {
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
      fetchPost();
      setFormStatus(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error updating post:', error.response?.data || error.message);
      } else {
        console.error('Error updating post:', error);
      }
    }
  };
  if (!post) {
    return <div>Loading...</div>;
  }
  if (!post.id) {
    return <div className="text-red-500">Post not found.</div>;
  }

  return (
    <div className="card mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
        <div className="form-control">
          <label className="text-gray-700" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>
        <div className="form-control">
          <label className="text-gray-700 mb-2" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={post.location}
            onChange={(e) => setPost({ ...post, location: e.target.value })}
          />
        </div>
        <div className="form-control">
          <label className="text-gray-700 mb-2" htmlFor="fromDate">
            From Date
          </label>
          <input
            type="date"
            id="fromDate"
            value={post.fromDate ? post.fromDate.slice(0, 10) : ''}
            onChange={(e) => setPost({ ...post, fromDate: e.target.value })}
            required={true}
          />
        </div>
        <div className="form-control">
          <label className="text-gray-700 mb-2" htmlFor="untilDate">
            Until Date
          </label>
          <input
            type="date"
            id="untilDate"
            value={post.untilDate ? post.untilDate.slice(0, 10) : ''}
            onChange={(e) => setPost({ ...post, untilDate: e.target.value })}
            required={true}
          />
        </div>
        <div className="form-control">
          <label className="text-gray-700 mb-2" htmlFor="permanentOffer">
            Permanent Offer
          </label>
          <select
            id="permanentOffer"
            value={post.permanentOffer ? 'true' : 'false'}
            onChange={(e) => setPost({ ...post, permanentOffer: e.target.value === 'true' })}
            required={true}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="form-control">
          <label className="text-gray-700 mb-2" htmlFor="maxNumberOfNights">
            Max Number of Nights
          </label>
          <input
            type="number"
            id="maxNumberOfNights"
            value={post.maxNumberOfNights}
            onChange={(e) => setPost({ ...post, maxNumberOfNights: Number(e.target.value) })}
          />
        </div>
        <div className="form-control">
          <label className="text-gray-700 mb-2" htmlFor="maxNumberOfPeople">
            Max Number of People
          </label>
          <input
            type="number"
            id="maxNumberOfPeople"
            value={post.maxNumberOfPeople}
            onChange={(e) => setPost({ ...post, maxNumberOfPeople: Number(e.target.value) })}
          />
        </div>
        <div className="form-control">
          <label className="text-gray-700 mb-2" htmlFor="hasFacilities">
            Has Facilities
          </label>
          <select
            id="hasFacilities"
            value={post.hasFacilities ? 'true' : 'false'}
            onChange={(e) => setPost({ ...post, hasFacilities: e.target.value === 'true' })}
            required={true}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="form-control">
          <label className="text-gray-700 mb-2" htmlFor="hasWifi">
            Has Wifi
          </label>
          <select
            id="hasWifi"
            value={post.hasWifi ? 'true' : 'false'}
            onChange={(e) => setPost({ ...post, hasWifi: e.target.value === 'true' })}
            required={true}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="form-control">
          <label className="text-gray-700 mb-2" htmlFor="hasKitchen">
            Has Kitchen
          </label>
          <select
            id="hasKitchen"
            value={post.hasKitchen ? 'true' : 'false'}
            onChange={(e) => setPost({ ...post, hasKitchen: e.target.value === 'true' })}
            required={true}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="form-control">
          <label className="text-gray-700 mb-2" htmlFor="hasWashingMachine">
            Has Washing Machine
          </label>
          <select
            id="hasWashingMachine"
            value={post.hasWashingMachine ? 'true' : 'false'}
            onChange={(e) => setPost({ ...post, hasWashingMachine: e.target.value === 'true' })}
            required={true}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="form-control">
          <label className="text-gray-700 mb-2" htmlFor="hasShower">
            Has Shower
          </label>
          <select
            id="hasShower"
            value={post.hasShower ? 'true' : 'false'}
            onChange={(e) => setPost({ ...post, hasShower: e.target.value === 'true' })}
            required={true}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="form-control">
          <label className="text-gray-700 mb-2" htmlFor="isTent">
            Is Tent
          </label>
          <select
            id="isTent"
            value={post.isTent ? 'true' : 'false'}
            onChange={(e) => setPost({ ...post, isTent: e.target.value === 'true' })}
            required={true}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="form-control">
          <label className="text-gray-700 mb-2" htmlFor="isCaravan">
            Is Caravan
          </label>
          <select
            id="isCaravan"
            value={post.isCaravan ? 'true' : 'false'}
            onChange={(e) => setPost({ ...post, isCaravan: e.target.value === 'true' })}
            required={true}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="form-control">
          <label className="text-gray-700 mb-2" htmlFor="isBed">
            Is Bed
          </label>
          <select
            id="isBed"
            value={post.isBed ? 'true' : 'false'}
            onChange={(e) => setPost({ ...post, isBed: e.target.value === 'true' })}
            required={true}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="form-control">
          <label className="text-gray-700 mb-2" htmlFor="text">
            Description
          </label>
          <textarea
            id="text"
            value={post.text}
            onChange={(e) => setPost({ ...post, text: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="form-control">
          <label className="text-gray-700 mb-2" htmlFor="imageUrl">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            value={post.imageUrl}
            onChange={(e) => setPost({ ...post, imageUrl: e.target.value || '' })}
          />
        </div>
        <div className="form-control">
          <label className="text-gray-700 mb-2" htmlFor="userName">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            value={post.userName}
            onChange={(e) => setPost({ ...post, userName: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-secondary ml-5">
          Save Changes
        </button>
      </form>
    </div>
  );
}
