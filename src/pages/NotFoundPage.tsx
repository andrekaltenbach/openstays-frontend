export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <a href="/" className="text-blue-500 hover:underline">
        Go back to Home
      </a>
    </div>
  );
}
