import { useEffect, useState } from "react";
import { Loading, CardComponents, Button } from "../../components";
import { useAuth } from "../../context/User.context";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import answerService from "../../services/answer.services";

export default function MyAnswer() {
  const [answers, setAnswers] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPost, setTotalPost] = useState(0);

  const { data } = useAuth();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  // console.log(useLocation());
  const handleClick = async (answerId) => {
    console.log(answerId);
    try {
      const res = await answerService.deleteAnswer(answerId);
      console.log(answers);
      if (res) {
        setAnswers((currentAns) => {
          return currentAns.filter((ans) => ans._id !== answerId);
        });
      }
    } catch (error) {
      setMessage(error.message);
      console.error(error);
      // alert(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await answerService.getMyAnswers();
        setAnswers(res);
      } catch (error) {
        console.log(error);
        setAnswers(error.message);
        // alert(error.message);
        setPosts([]);
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
    console.log("NO data found");
    return <Navigate to={"/no-logged-in"} replace />;
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <p className="text-center mt-2">
            Total{" "}
            <span className="rounded-2 p-1 badge text-bg-primary">
              {totalPost}
            </span>{" "}
            {totalPost === 1 ? "post" : "posts"} found
          </p>
          {message && <div className="alert alert-danger">{message}</div>}
          {answers.map((post) => (
            <div key={post._id} className="mt-2">
              <div className="card bg-light border-secondary">
                <div className="card-body">
                  <p className="card-text">{post.body}</p>
                  <div className="p-2 d-flex gap-2">
                    <Link to={`/posts/${post.post._id}`}>
                      <Button className="btn btn-primary">
                        Check Question / answers
                      </Button>
                    </Link>
                    <Button
                      className="btn btn-danger"
                      onClick={() => handleClick(post._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
              {/* <CardComponents key={post._id} postBody={post} /> */}
            </div>
          ))}
        </>
      )}
    </>
  );
}
