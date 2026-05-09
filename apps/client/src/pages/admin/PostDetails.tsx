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
    <div className="container mt-4">
      <h3>Post Details</h3>
      {message && <AlertMessage text={message} autoHide={true} />}
      <div className="card shadow-sm border-primary">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Question</h5>
        </div>
        <div className="card-body bg-white">
          <p className="fs-5">{post.body}</p>
          <p className="text-muted mb-1">
            <strong>Author:</strong> {post.authorInfo.username}
          </p>
          <p className="text-muted">
            <strong>Total Answers:</strong> {post.totalAnswer}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h5 className="text-primary">Answers</h5>
        {post.answers.length > 0 ? (
          post.answers.map((data, index) => (
            <div key={index} className="card mb-3 border-light shadow-sm">
              <div className="card-body">
                <p className="mb-1">{data.content}</p>
                <small className="text-muted">— {data.authorInfo?.username}</small>
                <div className="mt-2">
                  <Button
                    className="btn-danger btn-sm"
                    onClick={() => handleAnswerDelete(data._id)}
                    disabled={loading}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No answers yet.</p>
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
}
