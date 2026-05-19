import { Navigate } from "react-router";
import { AlertMessage, CardComponents, Loading } from "@/components";
import { useAuthStore } from "@/store/useAuthStore";
import { useAllPosts } from "@/hooks/usePosts";

export default function HomePage() {
  const { data } = useAuthStore();
  const { data: posts, isLoading: loading, error } = useAllPosts();
  const totalPost = posts?.length;

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
            {posts && posts.map((post) => <CardComponents key={post._id} postBody={post} />)}
          </div>

          {error?.message && (
            <div className="mt-4">
              <AlertMessage autoHide={false} text={error.message} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
