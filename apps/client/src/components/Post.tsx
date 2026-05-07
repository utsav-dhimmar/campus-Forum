import postService from "@/services/post.services";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Post() {
	const { postID } = useParams<{ postID: string }>();
	const [postData, setPostData] = useState<string | null>("");

	useEffect(() => {
		const fetchData = async () => {
			const data = await postService.getAPost(postID as string);
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
