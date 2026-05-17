import answerService from "@/services/answer.services";
import { useState } from "react";

type InlineAnswerBoxProps = {
  postId: string;
  onAnswerSubmit: () => void;
};

export default function InlineAnswerBox({ postId, onAnswerSubmit }: InlineAnswerBoxProps) {
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
      await answerService.postAnswer(postId, {
        body: content,
      });
      setMessage("");
      setContent("");
      onAnswerSubmit();
    } catch (error) {
      setMessage((error instanceof Error && error.message) || "Failed to post answer.");
      // alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>) => {
    setContent(e.target.value);

    if (validationError) {
      setValidationError("");
    }
  };

  // if (redirect) {
  //   return <Navigate to={`/posts/${postId}?refetch=true`} />;
  // }

  return (
    <div className="mt-6 bg-base-100 p-4 rounded-lg shadow-sm border border-base-200">
      <form onSubmit={handleSubmit}>
        <div className="form-control w-full mb-4 flex flex-col">
          <label className="label px-0">
            <span className="label-text font-semibold">Your Answer</span>
          </label>
          <textarea
            className={`textarea textarea-bordered h-24 w-full ${validationError ? "textarea-error" : "textarea-primary"}`}
            placeholder="Write your answer clearly..."
            value={content}
            onChange={handleContentChange}
          ></textarea>
          {validationError && (
            <label className="label px-0">
              <span className="label-text-alt text-error">{validationError}</span>
            </label>
          )}
        </div>
        <div className="flex justify-between items-center gap-4">
          <button
            type="submit"
            className={`btn btn-primary btn-sm ${loading ? "btn-disabled" : ""}`}
            disabled={loading || content.trim().length < 10}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Posting...
              </>
            ) : (
              "Post Answer"
            )}
          </button>
          {message && <span className="text-sm opacity-60 italic">{message}</span>}
        </div>
      </form>
    </div>
  );
}
