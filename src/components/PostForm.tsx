import type { Post } from '../types';

type PostFormProps = {
  post: Post;
  setPost: (post: Post) => void;
  setFormStatus: (status: boolean) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  mode: 'create' | 'edit';
};

export default function PostForm({ post, setPost, setFormStatus, handleSubmit }: PostFormProps) {
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
        <div className="text-center flex flex-col gap-5 sm:flex-row mt-8">
          <button type="submit" className="btn btn-primary-fill">
            Save Changes
          </button>
          <button
            onClick={() => {
              setFormStatus(false);
            }}
            className="btn btn-secondary sm:ml-5"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
