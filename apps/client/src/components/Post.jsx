import { useEffect, useState } from "react";
import postService from "../services/post.services";
import { useParams } from "react-router";

export default function Post() {
  const { postID } = useParams();
  const [postData, setPostData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await postService.getAPost(postID);
      setPostData(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="border border-secondary p-4 rounded">
        {postData && (
          <div>
            <div>
              <p className="d-flex justify-content-between">
                <span>{postData.body}</span>
                <span> from User </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// function LoginForm() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (username === "utsav" && password === "utsav@123") {
//       setMessage("Loggin successfully");
//     } else {
//       setMessage("Invalid credentials");
//     }
//   };

//   return (
//     <form action="" onSubmit={handleSubmit}>
//       <div>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </div>
//       <div>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <div>
//         <input type="submit" />
//       </div>
//       <div>{message && <p>{message}</p>}</div>
//     </form>
//   );
// }
