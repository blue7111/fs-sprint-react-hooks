import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../util/useFetch";
const BlogDetails = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    blogs: blog,
    isPending,
    error,
  } = useFetch(`http://localhost:3001/blogs/${id}`);
  const [isLike, setIsLike] = useState(false);

  const handleDeleteClick = () => {
    /* delete 버튼을 누르면 다시 home으로 리다이렉트 되어야 합니다. */
    /* useNavigate()를 이용하여 handleDeleteClick 로직을 작성해주세요. */
    fetch(`http://localhost:3001/blogs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        navigate("/");
        window.location.reload();
      })
      .catch((err) => console.log(err));
    console.log("delete!");
  };

  const handleLikeClick = () => {
    /* 하트를 누르면 home에서 새로고침을 했을 때 숫자가 올라가야 합니다. */
    /* isLike와 blog.likes를 이용하여 handleLikeClick의 로직을 작성해주세요. */
    let like;
    if (isLike === false) {
      like = blog.likes + 1;
    } else {
      like = blog.likes - 1;
    }
    fetch(`http://localhost:3001/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: blog.id,
        title: blog.title,
        body: blog.body,
        author: blog.author,
        likes: like,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        navigate(`/blogs/${blog.id}`);
      })
      .catch((err) => console.log(err));
    setIsLike(!isLike);
    console.log("like!");
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleLikeClick}>
            {/* isLike에 의해 조건부 렌더링으로 빨간 하트(❤️)와 하얀 하트(🤍)가 번갈아 보여야 합니다. */}
            {isLike ? "❤️" : "🤍"}
          </button>
          <button onClick={handleDeleteClick}>delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
