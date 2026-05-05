import { useParams } from "react-router";
import type { PostData } from "../types/PostTypes";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { formatDate } from "../utils";

function Post() {
	const params = useParams();
	const [postData, setPostData] = useState<PostData | null>(null);
	const [loading, setLoading] = useState<Boolean>(true);
	const apiURL: string = import.meta.env.VITE_API_URL;

	useEffect(() => {
		async function fetchPost() {
			try {
				const response = await fetch(`${apiURL}/posts/${params.postId}`);
				const result: PostData = await response.json();
				const cleanBody: string = DOMPurify.sanitize(result.body, {
					USE_PROFILES: { html: true },
				});
				setPostData({ ...result, body: cleanBody });
			} catch (error) {
				throw error;
			} finally {
				setLoading(false);
			}
		}
		fetchPost();
	}, [apiURL]);

	return (
		<main className="post">
			{loading ? (
				<div className="loading">loading</div>
			) : (
				<>
					<div className="post-body">
						<img className="post-body-img" src={postData?.imageURL} alt="" />

                        <h1>{postData?.title}</h1>
                        <p>{postData?.description}</p>
						<div className="post-info-wrapper">
							<p className="post-p author">Written By: {postData?.author.username}</p>
							<p className="post-p created-at">
								Posted on {formatDate(postData?.createdAt as string)}
							</p>
						</div>

						{parse(postData?.body as string)}
					</div>
				</>
			)}
		</main>
	);
}

export default Post;
