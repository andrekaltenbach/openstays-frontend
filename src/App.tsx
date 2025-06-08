import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PostListPage from "./pages/PostListPage";

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PostListPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
