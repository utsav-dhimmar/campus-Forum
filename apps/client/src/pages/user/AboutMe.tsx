import { useEffect, useState } from "react";
import authService from "@/services/auth.services";
import { Loading } from "@/components";
import type { IUser } from "@repo/shared";

export default function AboutMe() {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await authService.getUserInfo();
        setUserData(res);
      } catch (error) {
        setMessage(
          (error instanceof Error && error.message) || "Could not fetch user information.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-primary">About Me</h1>

      {loading && <Loading />}

      {message && !loading && (
        <div className="alert alert-error shadow-lg mb-6">
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

      {!loading && !message && userData && Object.keys(userData).length > 0 && (
        <div className="card bg-base-100 shadow-2xl border border-base-200 overflow-hidden">
          <div className="bg-primary text-primary-content p-4 font-bold text-center uppercase tracking-widest text-sm">
            User Profile
          </div>
          <div className="card-body p-0">
            <div className="divide-y divide-base-200">
              <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="text-sm font-bold opacity-60 uppercase tracking-wider">
                  Username
                </span>
                <span className="text-xl font-medium">{userData.username}</span>
              </div>
              <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="text-sm font-bold opacity-60 uppercase tracking-wider">Email</span>
                <span className="text-xl font-medium">{userData.email}</span>
              </div>
              <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="text-sm font-bold opacity-60 uppercase tracking-wider">
                  User ID
                </span>
                <span className="text-mono text-sm opacity-80">{userData._id}</span>
              </div>
              <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="text-sm font-bold opacity-60 uppercase tracking-wider">Role</span>
                <span className="badge badge-secondary badge-lg font-bold p-4">
                  {userData?.role || "user"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
