import { useEffect, useState } from "react";
import { Navigate } from "react-router";
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
      (data?.role === "MODERATOR" || data?.role === "USER" || data?.role === "ADMIN")
    ) {
      fetchData();
    }
  }, [data]);

  useEffect(() => {
    setTotalPost(posts.length);
  }, [posts]);

  if (!data) {
    return <Navigate to={"/no-logged-in"} replace />;
  }

  if (data.role === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <div className="badge badge-primary badge-outline badge-lg p-4 gap-2">
              Total <span className="font-bold">{totalPost}</span>{" "}
              {totalPost === 1 ? "post" : "posts"} found
            </div>
          </div>

          <div className="grid gap-4">
            {posts.map((post) => (
              <CardComponents key={post._id} postBody={post} />
            ))}
          </div>

          {message && (
            <div className="mt-4">
              <AlertMessage autoHide={false} text={message} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
