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
    <>
      <div className="border border-secondary p-4 rounded">
        {postData && (
          <div>
            <div>
              <p className="d-flex justify-content-between">
                <span>{postData.body}</span>
                <span> from {postData.authorInfo.username} </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
