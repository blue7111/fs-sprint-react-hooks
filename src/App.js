import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState, Suspense, lazy } from "react";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import Loading from "./component/Loading";
import useFetch from "./util/useFetch";
/* react.lazy()와 suspense를 사용해 App 컴포넌트를 리팩토링 해보세요. */
const Home = lazy(() => import("./Home"));
const CreateBlog = lazy(() => import("./blogComponent/CreateBlog"));
const BlogDetails = lazy(() => import("./blogComponent/BlogDetail"));
const NotFound = lazy(() => import("./component/NotFound"));

function App() {
  const { blogs, isPending, error } = useFetch("http://localhost:3001/blogs");
  return (
    <BrowserRouter>
      {error && <div>{error}</div>}
      <div className="app">
        <Navbar />
        <div className="content">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route
                exact
                path="/"
                element={<Home blogs={blogs} isPending={isPending} />}
              />
              <Route path="/create" element={<CreateBlog />} />
              <Route path="/blogs/:id" element={<BlogDetails />} />
              <Route path="/blogs/:id" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
