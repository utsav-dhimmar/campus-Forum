import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AlertMessage, Button, Loading } from "../../components";
import adminService from "../../services/admin.services";
import type { IUser } from "@repo/shared";

export default function UserDetails() {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    if (userId) {
      setLoading(true);
      adminService
        .getUserInfo(userId)
        .then((userData) => {
          setUser(userData);
          setNewRole(userData.role.toLowerCase());
        })
        .catch((reason: any) => {
          console.log(reason);
          setMessage(reason.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userId]);

  const navigate = useNavigate();

  const handleDeleteBtnClick = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await adminService.deleteUser(user._id);
      if (res) {
        setLoading(false);
        navigate("/admin");
      }
    } catch (error: any) {
      setMessage(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleUpdate = async () => {
    if (!userId) return;
    try {
      console.log(newRole);
      setLoading(true);
      const res = await adminService.updateUserRole(userId, { role: newRole });
      if (res) {
        setUser(res);
        setMessage("Role updated successfully!");
      }
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return user ? (
    <div className="p-6 space-y-8">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate("/admin")} className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <h3 className="text-3xl font-bold">User Management</h3>
      </div>

      {message && <AlertMessage autoHide={false} text={message} />}

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
          <div className="bg-primary text-primary-content p-4 font-bold uppercase tracking-widest text-xs">
            Personal Information
          </div>
          <div className="card-body p-0">
            <div className="divide-y divide-base-200">
              <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="text-sm font-bold opacity-60 uppercase tracking-wider">
                  Username
                </span>
                <span className="text-xl font-medium">{user.username}</span>
              </div>
              <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="text-sm font-bold opacity-60 uppercase tracking-wider">
                  Email Address
                </span>
                <span className="text-xl font-medium">{user.email}</span>
              </div>
              <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="text-sm font-bold opacity-60 uppercase tracking-wider">
                  Account ID
                </span>
                <span className="text-mono text-sm opacity-80">{user._id}</span>
              </div>
              <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="text-sm font-bold opacity-60 uppercase tracking-wider">
                  Current Role
                </span>
                <span className="badge badge-secondary badge-lg font-bold p-4 uppercase">
                  {user?.role || "user"}
                </span>
              </div>
            </div>
          </div>
          <div className="p-6 bg-base-200 border-t border-base-300">
            <Button className="btn-error w-full" onClick={handleDeleteBtnClick} disabled={loading}>
              Delete User Account
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body">
              <h3 className="card-title text-xl mb-6">Modify Access Permissions</h3>
              <div className="form-control w-full flex flex-col">
                <label className="label px-0">
                  <span className="label-text font-bold">Assign New Role</span>
                </label>
                <div className="flex gap-4">
                  <select
                    className="select select-primary select-bordered flex-1"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                  >
                    <option value="user">Standard User</option>
                    <option value="moderator">System Moderator</option>
                  </select>
                  <Button
                    className="btn-primary px-8"
                    onClick={handleRoleUpdate}
                    disabled={loading}
                  >
                    Update
                  </Button>
                </div>
                <label className="label">
                  <span className="label-text-alt opacity-60">
                    Permissions take effect on next login.
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-warning/10 border border-warning/20 p-6 rounded-2xl text-warning-content text-sm italic">
            <p>
              <strong>Security Note:</strong> Deleting a user account is permanent and will remove
              all associated data including posts and answers.
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="p-20">
      <Loading />
    </div>
  );
}
