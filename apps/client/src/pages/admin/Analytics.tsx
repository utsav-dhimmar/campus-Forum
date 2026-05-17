import { useEffect, useState, type FormEvent } from "react";
import adminService, { type IAnalyticsResponse } from "../../services/admin.services";
import { AlertMessage } from "../../components";
import { Link, useSearchParams } from "react-router";

export default function Analytics() {
  const START_DATE = "2025-01-01";
  const END_DATE = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(START_DATE);
  const [endDate, setEndDate] = useState(END_DATE);
  const [data, setData] = useState<IAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [, setSearchParams] = useSearchParams(`startDate=${START_DATE}&endDate=${END_DATE}`);

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
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">Analytics Dashboard</h2>

      <form
        className="bg-base-100 p-6 rounded-xl shadow-md border border-base-200 grid md:grid-cols-3 gap-6 mb-10 items-end"
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          fetchData();
        }}
      >
        <div className="form-control w-full flex flex-col">
          <label className="label px-0">
            <span className="label-text font-bold">Start Date</span>
          </label>
          <input
            type="date"
            className="input input-bordered input-primary w-full"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-control w-full flex flex-col">
          <label className="label px-0">
            <span className="label-text font-bold">End Date</span>
          </label>
          <input
            type="date"
            className="input input-bordered input-primary w-full"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg w-full">
          Refresh Data
        </button>
      </form>

      {loading && (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {message && <AlertMessage text={message} autoHide={false} />}

      {!loading && data && (
        <div className="space-y-10">
          <div className="alert alert-info shadow-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current flex-shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>
                <strong>Active Date Range:</strong> {data.dateRange.start} → {data.dateRange.end}
              </span>
            </div>
          </div>

          <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-base-100 border border-base-200">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title text-sm uppercase tracking-wider font-bold">New Users</div>
              <div className="stat-value text-primary">
                {data.users?.newUsers[0]?.totalUsers || 0}
              </div>
              <div className="stat-desc">Since {data.dateRange.start}</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title text-sm uppercase tracking-wider font-bold">New Posts</div>
              <div className="stat-value text-secondary">{data.posts?.newPost}</div>
              <div className="stat-desc">Increased activity</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title text-sm uppercase tracking-wider font-bold">
                New Answers
              </div>
              <div className="stat-value text-accent">{data.answer?.newAnswer}</div>
              <div className="stat-desc">Community engagement</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body p-0">
                <div className="bg-primary text-primary-content p-4 font-bold rounded-t-xl">
                  New Users List
                </div>
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.users?.newUsers[0]?.users.map((u: any) => (
                        <tr key={u._id}>
                          <td className="font-medium">{u.username}</td>
                          <td className="text-sm opacity-70">{u.email}</td>
                          <td>
                            <Link
                              to={`/admin/user/${u._id}`}
                              className="btn btn-ghost btn-xs text-primary"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body p-0">
                <div className="bg-secondary text-secondary-content p-4 font-bold rounded-t-xl">
                  Top Engaging Posts
                </div>
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>Post Content</th>
                        <th className="text-center">Answers</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.topPostData?.topPost.map((post: any) => (
                        <tr key={post._id}>
                          <td className="max-w-xs truncate">{post.body}</td>
                          <td className="text-center">
                            <div className="badge badge-secondary">{post.answerCount}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
