import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button, Loading } from "../../components/";
import adminService from "../../services/admin.services";
import DeleteUsrCmp from "../../components/admin/DeleteUserCmp";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setLoading(true);
      adminService.getAllPosts().then(setPosts);
      adminService.getAllUsers().then(setUsers);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUserDelete = async (userId) => {
    try {
      setLoading(true);
      const res = await adminService.deleteUser(userId);
      if (res) {
        // setUsers((currentUsers) => {
        //   return currentUsers.users.filter((user) => user._id != userId);
        // });

        // Oh man it is object not an array
        setUsers((currentUsers) => ({
          ...currentUsers,
          users: currentUsers.users.filter((user) => user._id !== userId),
        }));
      }
    } catch (error) {
      setMessage(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  // console.log(posts);
  const handlePostDelete = async (postId) => {
    // console.log(postId);
    try {
      setLoading(true);
      const res = await adminService.deletePost(postId);
      if (res) {
        setPosts((currentPost) =>
          currentPost.filter((post) => post._id !== postId)
        );
      }
    } catch (error) {
      setMessage(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      <div className="row">
        {/* Users Section */}
        <div className="col-md-6">
          <h4>All Users</h4>
          {users.users && users.users.length > 0 ? (
            <ul className="list-group">
              {users.users.map((user) => (
                <li
                  key={user._id}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span>{user.username}</span>
                  <div className="d-flex justify-content-between gap-2">
                    <Link
                      to={`/admin/user/${user._id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      View
                    </Link>
                    <DeleteUsrCmp
                      onClick={handleUserDelete}
                      id={user._id}
                      disabled={loading}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No users found.</p>
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
                  className="list-group-item d-flex justify-content-between"
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
                      className="btn-danger"
                      onClick={() => handlePostDelete(post._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
