export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center py-4 bg-gray-50">
      <h1 className="text-4xl font-bold text-lime-800 mb-4">About OpenStay</h1>
      <p className="text-gray-700 mb-4">
        OpenStay is a platform that connects travelers with hosts offering unique accommodations.
      </p>
      <p className="text-gray-700 mb-4">
        Our mission is to provide a seamless and enjoyable experience for both guests and hosts.
      </p>
      <a href="/" className="text-blue-500 hover:underline">
        Go back to Home
      </a>
    </div>
  );
}
