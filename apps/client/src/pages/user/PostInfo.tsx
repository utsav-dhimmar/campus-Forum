import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, InlineAnswerBox, Loading } from "../../components";
import { useAuth } from "../../context/User.context";
import answerService from "../../services/answer.services";
import postService from "../../services/post.services";
import type { IPostDetails } from "@repo/shared";

interface PostState extends IPostDetails {
  question: string;
}

export default function PostInfo() {
  const { postId } = useParams<{ postId: string }>();
  const { data: userData } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [post, setPost] = useState<PostState | null>(null);
  const navigate = useNavigate();

  const fetchPost = useCallback(async () => {
    if (!postId) return;
    try {
      const data = await postService.getAPost(postId);
      setPost({
        ...data,
        question: data.body,
      });
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handlePostDelete = async () => {
    if (!postId) return;
    try {
      setLoading(true);
      const res = await postService.deleteAPost(postId);
      if (res) {
        setMessage("Post deleted successfully.");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error: any) {
      setMessage(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerDelete = async (answerId: string) => {
    try {
      setLoading(true);
      await answerService.deleteAnswer(answerId);
      fetchPost();
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!post) {
    return (
      <div className="container my-4">
        <div className="alert alert-danger">{message || "Could not load the post."}</div>
      </div>
    );
  }

  const canDeletePost =
    userData &&
    (userData._id === post.authorId || userData.role === "MODERATOR" || userData.role === "ADMIN");

  return (
    <div className="container my-4">
      {message && <div className="alert alert-danger">{message}</div>}

      <div className="card shadow-sm border-primary">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Question</h5>
          {canDeletePost && (
            <Button className="btn-sm btn-danger" onClick={handlePostDelete} disabled={loading}>
              Delete Post
            </Button>
          )}
        </div>
        <div className="card-body bg-white">
          <p className="fs-5">{post.question}</p>
          <p className="text-muted mb-1">
            <strong>Author:</strong> {post.authorInfo.username}
          </p>
          <p className="text-muted">
            <strong>Total Answers:</strong> {post.totalAnswer}
          </p>
        </div>
      </div>
      {postId && <InlineAnswerBox postId={postId} onAnswerSubmit={fetchPost} />}
      <div className="mt-4">
        <h5 className="text-primary">Answers</h5>
        {post.answers.length > 0 ? (
          post.answers.map((data, index) => {
            const canDeleteAnswer =
              userData &&
              (userData._id === data.authorId ||
                userData.role === "MODERATOR" ||
                userData.role === "ADMIN");
            const isDeletedByMod = data.isDeleted;

            return (
              <div key={index} className="card mb-3 border-light shadow-sm">
                <div className="card-body">
                  <p className="mb-1">{data.content}</p>
                  <small className="text-muted">— {data.authorInfo?.username}</small>
                  {canDeleteAnswer && !isDeletedByMod && (
                    <Button
                      className="btn-sm btn-outline-danger m-2"
                      onClick={() => handleAnswerDelete(data._id)}
                      disabled={loading}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-muted">No answers yet.</p>
        )}
      </div>
    </div>
  );
}
