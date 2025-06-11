import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PostListPage from './pages/PostListPage';
import PostDetailsPage from './pages/PostDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh_-_130px)]">
        <Routes>
          <Route path="/" element={<PostListPage />} />
          <Route path="/posts/:postId" element={<PostDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
