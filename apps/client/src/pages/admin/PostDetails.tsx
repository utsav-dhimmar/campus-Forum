import { useParams } from "react-router";
import { useEffect, useState } from "react";
import adminService from "../../services/admin.services";
import { Button, Loading, AlertMessage } from "../../components";
import type { IPostDetails } from "@repo/shared";

export default function PostDetails() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<IPostDetails | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (postId) {
      adminService
        .getPostById(postId)
        .then(setPost)
        .catch((err) => setMessage(err.message));
    }
  }, [postId]);

  const handleAnswerDelete = async (answerId: string) => {
    try {
      setLoading(true);
      const res = await adminService.deleteAnswer(answerId);
      if (res && post) {
        setPost((currentPost) => {
          if (!currentPost) return null;
          return {
            ...currentPost,
            answers: currentPost.answers.filter((answer) => answer._id !== answerId),
          };
        });
      }
    } catch (error: any) {
      setMessage(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return post ? (
    <div className="p-6 space-y-8">
      <div className="flex items-center gap-4">
        <Link to="/admin" className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>
        <h3 className="text-3xl font-bold">Post Details</h3>
      </div>

      {message && <AlertMessage text={message} autoHide={true} />}

      <div className="card bg-base-100 shadow-xl border border-primary/20 overflow-hidden">
        <div className="bg-primary text-primary-content p-4 font-bold">Question Content</div>
        <div className="card-body">
          <p className="text-2xl font-medium mb-6">{post.body}</p>
          <div className="flex flex-wrap gap-4">
            <div className="badge badge-outline gap-2 p-3">
              <span className="opacity-60 text-xs uppercase font-bold">Author</span>
              <span className="font-bold">{post.authorInfo.username}</span>
            </div>
            <div className="badge badge-secondary gap-2 p-3">
              <span className="opacity-80 text-xs uppercase font-bold">Total Answers</span>
              <span className="font-bold">{post.totalAnswer}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-xl font-bold text-primary flex items-center gap-2">
          Answers Management
          <div className="badge badge-outline">{post.answers.length}</div>
        </h4>

        <div className="grid gap-4">
          {post.answers.length > 0 ? (
            post.answers.map((data, index) => (
              <div key={index} className="card bg-base-200 shadow-sm border border-base-300">
                <div className="card-body flex-row justify-between items-center gap-4">
                  <div className="flex-1">
                    <p className="text-lg mb-2">{data.content}</p>
                    <span className="text-sm opacity-60 font-medium">
                      — {data.authorInfo?.username}
                    </span>
                  </div>
                  <Button
                    className="btn-error btn-sm btn-outline"
                    onClick={() => handleAnswerDelete(data._id)}
                    disabled={loading}
                  >
                    Delete Answer
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-base-200 rounded-xl border border-dashed border-base-300 opacity-50">
              No answers yet for this post.
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="p-20">
      <Loading />
    </div>
  );
}
