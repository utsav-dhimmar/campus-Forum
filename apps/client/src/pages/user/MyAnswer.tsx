import { useEffect, useState } from "react";
import { Loading, Button } from "../../components";
import { Link, Navigate } from "react-router";
import answerService from "../../services/answer.services";
import type { IMyAnswerResponse } from "@repo/shared";
import { useAuthStore } from "@/store/useAuthStore";

export default function MyAnswer() {
  const [answers, setAnswers] = useState<IMyAnswerResponse[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPost, setTotalPost] = useState(0);

  const { data } = useAuthStore();

  const handleClick = async (answerId: string) => {
    try {
      const res = await answerService.deleteAnswer(answerId);
      if (res) {
        setAnswers((currentAns) => {
          return currentAns.filter((ans) => ans._id !== answerId);
        });
      }
    } catch (error: any) {
      setMessage(error.message);
      console.error(error);
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
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          <p className="text-center mt-2">
            Total{" "}
            <span className="rounded-2 p-1 badge text-bg-primary">
              {totalPost}
            </span>{" "}
            {totalPost === 1 ? "answer" : "answers"} found
          </p>
          {message && <div className="alert alert-danger">{message}</div>}
          {answers.map((answer) => (
            <div key={answer._id} className="mt-2">
              <div className="card bg-light border-secondary">
                <div className="card-body">
                  <p className="card-text">{answer.body}</p>
                  <div className="p-2 d-flex gap-2">
                    <Link to={`/posts/${answer.post._id}`}>
                      <Button className="btn btn-primary">
                        Check Question / answers
                      </Button>
                    </Link>
                    <Button
                      className="btn btn-danger"
                      onClick={() => handleClick(answer._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
