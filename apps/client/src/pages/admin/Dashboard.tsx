import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button, Loading, ConfirmModal } from "../../components/";
import adminService, { type IGetAllUsersResponse } from "../../services/admin.services";
import DeleteUsrCmp from "../../components/admin/DeleteUserCmp";
import type { IPost } from "@repo/shared";

export default function Dashboard() {
  const [users, setUsers] = useState<IGetAllUsersResponse>({ users: [], totalUsers: [] });
  const [posts, setPosts] = useState<IPost[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const postsData = await adminService.getAllPosts();
        setPosts(postsData);
        const usersData = await adminService.getAllUsers();
        setUsers(usersData);
      } catch (error: any) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUserDelete = async (userId: string) => {
    try {
      setLoading(true);
      const res = await adminService.deleteUser(userId);
      if (res) {
        setUsers((currentUsers) => ({
          ...currentUsers,
          users: currentUsers.users.filter((user) => user._id !== userId),
        }));
      }
    } catch (error: any) {
      setMessage(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostDelete = async () => {
    if (!postToDelete) return;
    try {
      setLoading(true);
      const res = await adminService.deletePost(postToDelete);
      if (res) {
        setPosts((currentPost) => currentPost.filter((post) => post._id !== postToDelete));
      }
    } catch (error: any) {
      setMessage(error.message);
      console.log(error);
    } finally {
      setLoading(false);
      setPostToDelete(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-primary">Admin Dashboard</h2>
        <div className="stats shadow bg-base-100 border border-base-200">
          <div className="stat">
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-primary">{users.users.length}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Posts</div>
            <div className="stat-value text-secondary">{posts.length}</div>
          </div>
        </div>
      </div>

      {message && (
        <div className="alert alert-error shadow-lg mb-8">
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

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Users Section */}
        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <h3 className="card-title text-xl mb-4">User Management</h3>
            {loading ? (
              <Loading />
            ) : users.users && users.users.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.users.map((user) => (
                      <tr key={user._id}>
                        <td className="font-medium">{user.username}</td>
                        <td className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link
                              to={`/admin/user/${user._id}`}
                              className="btn btn-xs btn-outline btn-primary"
                            >
                              View
                            </Link>
                            <DeleteUsrCmp
                              onClick={handleUserDelete}
                              id={user._id}
                              disabled={loading}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center py-8 opacity-50">No users found.</p>
            )}
          </div>
        </div>

        {/* Posts Section */}
        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <h3 className="card-title text-xl mb-4">Post Management</h3>
            {loading ? (
              <Loading />
            ) : posts && posts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Content</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post._id}>
                        <td className="max-w-xs truncate">{post.body}</td>
                        <td className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link
                              to={`/admin/post/${post._id}`}
                              className="btn btn-xs btn-outline btn-secondary"
                            >
                              View
                            </Link>
                            <Button
                              className="btn-error btn-xs btn-outline"
                              onClick={() => setPostToDelete(post._id)}
                              disabled={loading}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center py-8 opacity-50">No posts found.</p>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        id="delete_post_modal"
        isOpen={postToDelete !== null}
        onClose={() => setPostToDelete(null)}
        onConfirm={handlePostDelete}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        isLoading={loading}
      />
    </div>
  );
}
