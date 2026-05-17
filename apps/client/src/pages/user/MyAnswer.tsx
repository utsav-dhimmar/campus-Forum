import { useEffect, useState } from "react";
import { Loading, Button, ConfirmModal } from "../../components";
import { Link, Navigate } from "react-router";
import answerService from "../../services/answer.services";
import type { IMyAnswerResponse } from "@repo/shared";
import { useAuthStore } from "@/store/useAuthStore";

export default function MyAnswer() {
  const [answers, setAnswers] = useState<IMyAnswerResponse[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPost, setTotalPost] = useState(0);
  const [answerToDelete, setAnswerToDelete] = useState<string | null>(null);

  const { data } = useAuthStore();

  const handleClick = async () => {
    if (!answerToDelete) return;
    try {
      const res = await answerService.deleteAnswer(answerToDelete);
      if (res) {
        setAnswers((currentAns) => {
          return currentAns.filter((ans) => ans._id !== answerToDelete);
        });
      }
    } catch (error: any) {
      setMessage(error.message);
      console.error(error);
    } finally {
      setAnswerToDelete(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await answerService.getMyAnswers();
        setAnswers(res);
      } catch (error: any) {
        console.log(error);
        setMessage(error.message);
        setAnswers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setTotalPost(answers.length);
  }, [answers]);

  if (!data) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <div className="mx-auto px-4 py-8 max-w-4xl">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <div className="badge badge-primary badge-outline badge-lg p-4 gap-2">
              Total <span className="font-bold">{totalPost}</span>{" "}
              {totalPost === 1 ? "answer" : "answers"} found
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
            {answers.map((answer) => (
              <div key={answer._id} className="card bg-base-100 shadow-xl border border-base-200">
                <div className="card-body">
                  <p className="text-lg leading-relaxed">{answer.body}</p>
                  <div className="card-actions justify-end mt-4 items-center gap-4">
                    <Link to={`/posts/${answer.post._id}`}>
                      <Button className="btn-primary btn-sm">View Post</Button>
                    </Link>
                    <Button
                      className="btn-error btn-sm btn-outline"
                      onClick={() => setAnswerToDelete(answer._id)}
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
        id="delete_my_answer_modal"
        isOpen={answerToDelete !== null}
        onClose={() => setAnswerToDelete(null)}
        onConfirm={handleClick}
        title="Delete Answer"
        message="Are you sure you want to delete this answer? This action cannot be undone."
      />
    </div>
  );
}
