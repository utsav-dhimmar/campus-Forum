import { useState } from "react";
import { Button } from "../../components";
import postService from "../../services/post.services";
import { useNavigate } from "react-router";

export default function RaiseQuery() {
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    postService
      .createPost({ body })
      .then((data) => {
        // navigate to created post page
        navigate(`/posts/${data._id}`);
      })
      .catch((reason) => {
        setMessage(reason.message);
        // alert(error.message);
      });
  };

  return (
    <div className="container my-5">
      <div className="card shadow-sm border-primary">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Raise a New Query</h5>
        </div>
        <div className="card-body bg-white">
          {message && <div className="alert alert-danger">{message}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="query"
                className="form-label fw-bold text-primary"
              >
                Your Question
              </label>
              <textarea
                className="form-control border-primary"
                name="query"
                id="query"
                rows="5"
                placeholder="Type your question here..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <Button type="submit" className="btn btn-primary">
                Ask
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
