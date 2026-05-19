import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, InlineAnswerBox, Loading, ConfirmModal } from "../../components";

import type { IPostDetails } from "@repo/shared";
import { useAuthStore } from "@/store/useAuthStore";
import { usePost } from "@/hooks/usePosts";
import { useDeletePost } from "@/hooks/mutations/usePost";
import { useDeleteAnswer } from "@/hooks/mutations/useAnswer";

interface PostState extends IPostDetails {
  question: string;
}

export default function PostInfo() {
  const navigate = useNavigate();
  const { data: userData } = useAuthStore();

  const { postId } = useParams<{ postId: string }>();
  const { data: post, isLoading: loading, error, refetch } = usePost(postId as string);
  const {
    isPending: isDeletePostPending,
    isSuccess: isDeletePostSuccess,
    error: deletePostError,
    mutate: deletePostMutate,
  } = useDeletePost();
  const {
    isPending: isDeleteAnserPending,
    isSuccess: isDeleteAnswerSuccess,
    error: deleteAnswerError,
    mutate: deleteAnswerMutate,
  } = useDeleteAnswer();

  const [isPostDeleteModalOpen, setIsPostDeleteModalOpen] = useState(false);
  const [answerToDelete, setAnswerToDelete] = useState<string | null>(null);

  const handlePostDelete = () => {
    if (!postId) return;
    deletePostMutate(postId);
  };

  const handleAnswerDelete = async () => {
    if (!answerToDelete) return;

    deleteAnswerMutate(answerToDelete);
  };

  useEffect(() => {
    if (isDeletePostSuccess) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isDeletePostSuccess, navigate]);

  if (loading) {
    return <Loading />;
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
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
            <span>{error?.message || "Could not load the post."}</span>
          </div>
        </div>
      </div>
    );
  }

  const canDeletePost =
    userData &&
    (userData._id === post.authorId || userData.role === "MODERATOR" || userData.role === "ADMIN");

  return (
    <div className=" mx-auto px-4 py-8 max-w-4xl">
      {error && (
        <div className="alert alert-error shadow-lg mb-6">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
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
            <span>{error.message}</span>
          </div>
        </div>
      )}

      <div className="card bg-base-100 shadow-xl border border-primary/20 overflow-hidden">
        <div className="bg-primary text-primary-content p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Question</h2>
          {canDeletePost && (
            <Button
              className="btn-error btn-xs"
              onClick={handlePostDelete}
              disabled={isDeletePostPending}
            >
              Delete Post
            </Button>
          )}
        </div>
        <div className="card-body bg-base-100">
          <p className="text-2xl font-semibold mb-4 text-base-content">{post.question}</p>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="badge badge-outline gap-2 p-3">
              <span className="opacity-60 text-xs uppercase tracking-wider">Author</span>
              <span className="font-bold">{post.authorInfo.username}</span>
            </div>
            <div className="badge badge-primary gap-2 p-3">
              <span className="opacity-80 text-xs uppercase tracking-wider">Answers</span>
              <span className="font-bold">{post.totalAnswer}</span>
            </div>
          </div>
        </div>
      </div>

      {postId && (
        <div className="mt-8">
          <InlineAnswerBox postId={postId} onAnswerSubmit={refetch} />
        </div>
      )}

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          Answers
          <div className="badge badge-secondary">{post.answers.length}</div>
        </h3>

        <div className="space-y-4">
          {post.answers.length > 0 ? (
            post.answers.map((data, index) => {
              const canDeleteAnswer =
                userData &&
                (userData._id === data.authorId ||
                  userData.role === "MODERATOR" ||
                  userData.role === "ADMIN");
              const isDeletedByMod = data.isDeleted;

              return (
                <div key={index} className="card bg-base-200 shadow-sm border border-base-300">
                  <div className="card-body p-6">
                    <p className="text-lg leading-relaxed text-base-content">{data.content}</p>
                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center gap-2">
                        <div className="avatar placeholder">
                          <div className="bg-neutral text-neutral-content rounded-full w-8">
                            <span className="text-xs">
                              {data.authorInfo?.username?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <span className="text-sm font-medium opacity-70">
                          {data.authorInfo?.username}
                        </span>
                      </div>

                      {canDeleteAnswer && !isDeletedByMod && (
                        <Button
                          className="btn-ghost btn-error btn-xs"
                          onClick={() => setAnswerToDelete(data._id)}
                          disabled={isDeleteAnserPending}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center p-12 bg-base-200 rounded-xl border border-dashed border-base-300">
              <p className="text-xl opacity-50">No answers yet. Be the first to answer!</p>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        id="delete_post_modal_info"
        isOpen={isPostDeleteModalOpen}
        onClose={() => setIsPostDeleteModalOpen(false)}
        onConfirm={handlePostDelete}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
      />

      <ConfirmModal
        id="delete_answer_modal_info"
        isOpen={answerToDelete !== null}
        onClose={() => setAnswerToDelete(null)}
        onConfirm={handleAnswerDelete}
        title="Delete Answer"
        message="Are you sure you want to delete this answer? This action cannot be undone."
      />
    </div>
  );
}
