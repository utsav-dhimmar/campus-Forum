import { useState, type SubmitEvent } from "react";
import { Button } from "@/components";
import postService from "@/services/post.services";
import { useNavigate } from "react-router";

export default function RaiseQuery() {
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    postService
      .createPost({ body })
      .then((data) => {
        navigate(`/posts/${data._id}`);
      })
      .catch((reason: any) => {
        setMessage(reason.message);
      });
  };

  return (
    <div className="flex justify-center py-6">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl border border-base-300 overflow-hidden">
        <div className="bg-primary text-primary-content p-8">
          <h2 className="text-3xl font-black tracking-tight">Raise a New Query</h2>
          <p className="opacity-90 text-sm mt-2 font-medium">
            Describe your issue clearly to get the best help from the community.
          </p>
        </div>

        <div className="card-body p-8">
          {message && (
            <div className="alert alert-error shadow-md mb-8 py-4">
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
              <span className="font-medium text-sm">{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="form-control w-full flex flex-col">
              <label htmlFor="query" className="label px-0 py-1">
                <span className="label-text font-bold text-primary uppercase tracking-wider text-xs">
                  Your Detailed Question
                </span>
              </label>
              <textarea
                className="textarea textarea-primary textarea-bordered h-64 text-lg leading-relaxed focus:ring-2 focus:ring-primary/20 w-full"
                name="query"
                id="query"
                placeholder="What's on your mind?..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              ></textarea>
              <label className="label px-0 mt-1">
                <span className="label-text-alt opacity-50 italic">
                  Minimum 10 characters recommended.
                </span>
              </label>
            </div>

            <div className="card-actions pt-2">
              <Button type="submit" className="btn-primary btn-lg w-full font-bold shadow-lg">
                Post to Forum
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
