import postService from "@/services/post.services";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { IPostDetails } from "@repo/shared";

export default function Post() {
  const { postID } = useParams<{ postID: string }>();
  const [postData, setPostData] = useState<IPostDetails | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (postID) {
        const data = await postService.getAPost(postID);
        setPostData(data);
      }
    };
    fetchData();
  }, [postID]);

  return (
    <div className="bg-base-200 p-6 rounded-xl shadow-inner mb-6 border border-base-300">
      {postData ? (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xl font-medium flex-1">{postData.body}</p>
          <div className="badge badge-outline badge-lg p-4">
            <span className="opacity-70 mr-2 text-xs uppercase tracking-wider">Posted by</span>
            <span className="font-bold text-primary">{postData.authorInfo.username}</span>
          </div>
        </div>
      ) : (
        <div className="flex justify-center p-4">
          <span className="loading loading-spinner loading-md text-primary"></span>
        </div>
      )}
    </div>
  );
}
