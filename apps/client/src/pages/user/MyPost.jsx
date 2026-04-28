import { useEffect, useState } from "react";
import postService from "../../services/post.services";
import { Loading, Button } from "../../components";
import { useAuth } from "../../context/User.context";
import { Link, useNavigate } from "react-router";

export default function MyPost() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPost, setTotalPost] = useState(0);

  const handleClick = async (postId) => {
    try {
      const res = await postService.deleteAPost(postId);
      if (res) {
        setPosts((currentPost) => {
          return currentPost.filter((post) => post._id !== postId);
        });
      }
    } catch (error) {
      console.log(error);
      setMessage(error.message);
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await postService.getMyPost();
        setPosts(res);
      } catch (error) {
        console.log(error);
        setMessage(error.message);
        // alert(error.message);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  useEffect(() => {
    setTotalPost(posts.length);
  }, [posts]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <p className="text-center mt-2">
            Total{" "}
            <span className="rounded-2 p-1 badge text-bg-primary">
              {totalPost}
            </span>{" "}
            {totalPost === 1 ? "post" : "posts"} found
          </p>
          {message && <div className="alert alert-danger">{message}</div>}
          {posts.map((post) => (
            <div key={post._id} className="mt-2">
              {/* <CardComponents key={post._id} postBody={post} /> */}
              <div className="card bg-light border-secondary">
                <div className="card-body">
                  <p className="card-text">{post.body}</p>
                  <div className="p-2  d-flex gap-2">
                    <Link to={`/posts/${post._id}`}>
                      <Button className="btn btn-primary">Check answers</Button>
                    </Link>

                    <Button
                      className="btn btn-danger"
                      onClick={() => handleClick(post._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
