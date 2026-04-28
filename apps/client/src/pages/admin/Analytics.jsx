import { useEffect, useState } from "react";
import adminService from "../../services/admin.services";
import { AlertMessage } from "../../components";
import { Link, useSearchParams } from "react-router";

export default function Analytics() {
  const START_DATE = "2025-01-01";
  const END_DATE = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(START_DATE);
  const [endDate, setEndDate] = useState(END_DATE);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  let [searchParams, setSearchParams] = useSearchParams(
    `startDate=${START_DATE}&endDate=${END_DATE}`
  );

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await adminService.getAnalytics({
        startDate,
        endDate,
      });
      if (res) {
        setData(res);
        setSearchParams({ startDate, endDate });
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="mb-4"> Analytics Dashboard</h2>

      <form
        className="row g-3 mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          fetchData();
        }}
      >
        <div className="col-md-4">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">End Date</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="col-md-4 d-flex align-items-end">
          <button type="submit" className="btn btn-primary w-100">
            Refresh
          </button>
        </div>
      </form>

      {loading && (
        <div className="d-flex justify-content-center align-items-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {message && <AlertMessage text={message} />}

      {!loading && data && (
        <>
          <div className="alert alert-info">
            <strong>Date Range:</strong> {data.dateRange.start} →{" "}
            {data.dateRange.end}
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                  New Users ({data.users?.newUsers[0]?.totalUsers || 0})
                </div>
                <div className="card-body p-0">
                  <table className="table table-striped mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.users?.newUsers[0]?.users.map((u, idx) => (
                        <tr key={u._id}>
                          <td>{idx + 1}</td>
                          <td>{u.username}</td>
                          <td>{u.email}</td>
                          <Link to={`/admin/user/${u._id}`}>Show Data</Link>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                  Activity
                </div>
                <div className="card-body">
                  <p className="mb-2">
                    <strong>New Posts:</strong> {data.posts?.newPost}
                  </p>
                  <p className="mb-0">
                    <strong>New Answers:</strong> {data.answer?.newAnswer}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm mt-4">
            <div className="card-header bg-warning">
              Top Posts ({data.topPostData?.topPost.length || 0})
            </div>
            <ul className="list-group list-group-flush">
              {data.topPostData?.topPost.map((post, idx) => (
                <li key={post._id} className="list-group-item">
                  <div className="fw-bold">
                    {idx + 1}. {post.body}
                  </div>
                  <small className="text-muted">
                    Answers: {post.answerCount}
                  </small>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
