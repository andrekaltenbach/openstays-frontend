import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PostListPage from "./pages/PostListPage";
import PostDetailsPage from "./pages/PostDetailsPage";

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PostListPage />} />
        <Route path="/posts/:postId" element={<PostDetailsPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
