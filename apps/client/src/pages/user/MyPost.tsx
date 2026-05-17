import { useEffect, useState } from "react";
import postService from "../../services/post.services";
import { Loading, Button, ConfirmModal } from "../../components";
import { Link, useNavigate } from "react-router";
import type { IPost } from "@repo/shared";

export default function MyPost() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPost, setTotalPost] = useState(0);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const handleClick = async () => {
    if (!postToDelete) return;
    try {
      const res = await postService.deleteAPost(postToDelete);
      if (res) {
        setPosts((currentPost) => {
          return currentPost.filter((post) => post._id !== postToDelete);
        });
      }
    } catch (error: any) {
      console.log(error);
      setMessage(error.message);
    } finally {
      setPostToDelete(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await postService.getMyPost();
        setPosts(res);
      } catch (error: any) {
        console.log(error);
        setMessage(error.message);
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
    <div className="mx-auto px-4 py-8 max-w-4xl">
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

          {message && (
            <div className="alert alert-error shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{message}</span>
            </div>
          )}

          <div className="grid gap-6">
            {posts.map((post) => (
              <div key={post._id} className="card bg-base-100 shadow-xl border border-base-200">
                <div className="card-body">
                  <p className="text-lg leading-relaxed">{post.body}</p>
                  <div className="card-actions justify-end mt-4 items-center gap-4">
                    <Link to={`/posts/${post._id}`}>
                      <Button className="btn-primary btn-sm">Check answers</Button>
                    </Link>

                    <Button
                      className="btn-error btn-sm btn-outline"
                      onClick={() => setPostToDelete(post._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <ConfirmModal
        id="delete_my_post_modal"
        isOpen={postToDelete !== null}
        onClose={() => setPostToDelete(null)}
        onConfirm={handleClick}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
      />
    </div>
  );
}
