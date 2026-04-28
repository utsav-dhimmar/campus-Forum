import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { AlertMessage, CardComponents, Loading } from "../../components";
import { useAuth } from "../../context/User.context";
import postService from "../../services/post.services";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPost, setTotalPost] = useState(0);

  const { data } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await postService.getAllPost();
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

    if (data?.role && (data?.role === "MODERATOR" || data?.role === "USER")) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    setTotalPost(posts.length);
  }, [posts]);
  const navigate = useNavigate();
  useEffect(() => {
    if (data?.role === "admin") {
      navigate("/admin");
    }
  }, [data]);

  // console.log(data);

  if (!data) {
    return <Navigate to={"/no-logged-in"} replace />;
  }

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

          {posts.map((post) => (
            <div key={post._id} className="mt-2">
              <CardComponents key={post._id} postBody={post} />
            </div>
          ))}
          {message && <AlertMessage autoHide={false} text={message} />}
        </>
      )}
    </>
  );
}
