import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AlertMessage, Button, Loading } from "../../components";
import adminService from "../../services/admin.services";

export default function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    setLoading(true);
    adminService
      .getUserInfo(userId)
      .then((user) => {
        setUser(user);
        setNewRole(user.role.toLowerCase());
      })
      .catch((reason) => {
        console.log(reason);
        setMessage(reason.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  const navigate = useNavigate();

  const handleDeleteBtnClick = async () => {
    try {
      setLoading(true);
      const res = await adminService.deleteUser(user._id);
      if (res) {
        setLoading(false);
        navigate("/admin");
      }
    } catch (error) {
      setMessage(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleUpdate = async () => {
    try {
      console.log(newRole);
      setLoading(true);
      const res = await adminService.updateUserRole(userId, { role: newRole });
      if (res) {
        setUser(res);
        setMessage("Role updated successfully!");
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return user ? (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header">User Data</div>

        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Username:</strong> {user.username}
            </li>
            <li className="list-group-item">
              <strong>Email:</strong> {user.email}
            </li>
            <li className="list-group-item">
              <strong>ID:</strong> {user._id}
            </li>
            <li className="list-group-item">
              <strong>Role:</strong> {user?.role || "user"}
            </li>
          </ul>
          <Button
            className="btn-danger"
            onClick={handleDeleteBtnClick}
            disabled={loading}
          >
            Delete
          </Button>
          <div className="card shadow-sm mt-4">
            <div className="card-header">Manage Role</div>
            <div className="card-body d-flex gap-3 align-items-center">
              <select
                className="form-select"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
              </select>
              <Button
                className="btn-primary"
                onClick={handleRoleUpdate}
                disabled={loading}
              >
                Save Role
              </Button>
            </div>
          </div>
        </div>
      </div>
      {message && <AlertMessage autoHide={false} text={message} />}
    </div>
  ) : (
    <Loading />
  );
}
