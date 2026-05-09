import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button, Loading } from "../../components/";
import adminService, { type IGetAllUsersResponse } from "../../services/admin.services";
import DeleteUsrCmp from "../../components/admin/DeleteUserCmp";
import type { IPost } from "@repo/shared";

export default function Dashboard() {
  const [users, setUsers] = useState<IGetAllUsersResponse>({ users: [], totalUsers: [] });
  const [posts, setPosts] = useState<IPost[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

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

  const handlePostDelete = async (postId: string) => {
    try {
      setLoading(true);
      const res = await adminService.deletePost(postId);
      if (res) {
        setPosts((currentPost) => currentPost.filter((post) => post._id !== postId));
      }
    } catch (error: any) {
      setMessage(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      {message && <div className="alert alert-danger">{message}</div>}

      <div className="row">
        {/* Users Section */}
        <div className="col-md-6">
          <h4>All Users</h4>
          {users.users && users.users.length > 0 ? (
            <ul className="list-group">
              {users.users.map((user) => (
                <li
                  key={user._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>{user.username}</span>
                  <div className="d-flex justify-content-between gap-2">
                    <Link to={`/admin/user/${user._id}`} className="btn btn-sm btn-outline-primary">
                      View
                    </Link>
                    <DeleteUsrCmp onClick={handleUserDelete} id={user._id} disabled={loading} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            !loading && <p className="text-muted">No users found.</p>
          )}
          {loading && <Loading />}
        </div>

        {/* Posts Section */}
        <div className="col-md-6">
          <h4>All Posts</h4>
          {posts && posts.length > 0 ? (
            <ul className="list-group">
              {posts.map((post) => (
                <li
                  key={post._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>{post.body}</span>
                  <div className="d-flex justify-content-between gap-2">
                    <Link
                      to={`/admin/post/${post._id}`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      View
                    </Link>
                    <Button
                      className="btn-danger btn-sm"
                      onClick={() => handlePostDelete(post._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            !loading && <p className="text-muted">No posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
