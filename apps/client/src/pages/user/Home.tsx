import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { AlertMessage, CardComponents, Loading } from "@/components";
import postService from "@/services/post.services";
import type { IPostWithAuthor } from "@repo/shared";
import { useAuthStore } from "@/store/useAuthStore";

export default function HomePage() {
  const [posts, setPosts] = useState<IPostWithAuthor[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPost, setTotalPost] = useState(0);

  const { data } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await postService.getAllPost();
        setPosts(res);
      } catch (error: any) {
        console.log(error);
        setMessage(error.message || "Something went wrong");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    if (
      data?.role &&
      (data?.role === "MODERATOR" ||
        data?.role === "USER" ||
        data?.role === "ADMIN")
    ) {
      fetchData();
    }
  }, [data]);

  useEffect(() => {
    setTotalPost(posts.length);
  }, [posts]);

  useEffect(() => {
    if (data?.role === "ADMIN") {
      navigate("/admin");
    }
  }, [data, navigate]);

  if (!data) {
    return <Navigate to={"/no-logged-in"} replace />;
  }

  return (
    <div className="container">
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
    </div>
  );
}
