import { useEffect, useState } from "react";
import authService from "../../services/auth.services";
import { Loading } from "../../components";

export default function AboutMe() {
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await authService.getUserInfo();
        setUserData(res);
      } catch (error) {
        setMessage(error.message || "Could not fetch user information.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h1 className="text-center mb-4">About Me</h1>

          {loading && <Loading />}

          {message && !loading && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}

          {!loading && !message && Object.keys(userData).length > 0 && (
            <div className="card shadow-sm">
              <div className="card-header">User Profile</div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Username:</strong> {userData.username}
                  </li>
                  <li className="list-group-item">
                    <strong>Email:</strong> {userData.email}
                  </li>
                  <li className="list-group-item">
                    <strong>ID:</strong> {userData._id}
                  </li>
                  <li className="list-group-item">
                    <strong>Role:</strong> {userData?.role || "user"}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
