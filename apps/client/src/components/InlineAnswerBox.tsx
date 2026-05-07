import answerService from "@/services/answer.services";
import { useState } from "react";
import AlertMessage from "./AlertMessage";

type InlineAnswerBoxProps = {
  postId: string;
  onAnswerSubmit: () => void;
};

export default function InlineAnswerBox({
  postId,
  onAnswerSubmit,
}: InlineAnswerBoxProps) {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (content.trim().length < 10) {
      setValidationError("Comment must be at least 10 characters long.");
      return;
    }

    setLoading(true);
    setMessage("");
    setValidationError("");

    try {
      // @ts-ignore
      const res = await answerService.postAnswer(postId, {
        body: content,
      });
      setMessage("");
      setContent("");
      onAnswerSubmit();
    } catch (error) {
      setMessage(
        (error instanceof Error && error.message) || "Failed to post answer.",
      );
      // alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
  ) => {
    setContent(e.target.value);

    if (validationError) {
      setValidationError("");
    }
  };

  // if (redirect) {
  //   return <Navigate to={`/posts/${postId}?refetch=true`} />;
  // }

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <textarea
            className={`form-control ${
              validationError ? "border-danger" : "border-primary"
            }`}
            rows={3}
            placeholder="Write your answer..."
            value={content}
            onChange={handleContentChange}
          ></textarea>
          {validationError && (
            <AlertMessage text={validationError} autoHide={true} />
          )}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={loading || content.trim().length < 10}
          >
            {loading ? "Posting..." : "Post Answer"}
          </button>
          {message && <small className="text-muted ms-3">{message}</small>}
        </div>
      </form>
    </div>
  );
}
