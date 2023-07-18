import { useNavigate } from "react-router-dom";
import useForm from "../util/useForm";
const CreateBlog = () => {
  const [formValues, handleChange] = useForm({
    title: "",
    body: "",
    author: "김코딩",
  });

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    /* 등록 버튼을 누르면 게시물이 등록이 되며 home으로 리다이렉트 되어야 합니다. */
    /* 작성한 내용과 useNavigate를 이용하여 handleSubmit의 로직을 작성해보세요. */
    console.log(e.type);
    fetch("http://localhost:3001/blogs/", {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify({ ...formValues, likes: 0 }),
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>제목</label>
        <input
          type="text"
          required
          name="title"
          value={formValues.title}
          onChange={(e) => handleChange(e)}
          placeholder="제목을 입력해주세요."
        />
        <label>내용</label>
        <textarea
          required
          name="body"
          value={formValues.body}
          onChange={(e) => handleChange(e)}
          placeholder="내용을 입력해주세요."
        ></textarea>
        <label>작성자</label>
        <select
          name="author"
          value={formValues.author}
          onChange={(e) => handleChange(e)}
        >
          <option value="김코딩">김코딩</option>
          <option value="박해커">박해커</option>
        </select>
        <button>등록</button>
      </form>
    </div>
  );
};

export default CreateBlog;
