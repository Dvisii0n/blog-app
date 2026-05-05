import { useEffect, useState } from "react";
import { PostCard, PostCardFeatured } from "./PostCard";
import type { PostData } from "../types/PostTypes";

function PostList() {
	const [posts, setPosts] = useState<Array<PostData>>([]);
	const [loading, setLoading] = useState<Boolean>(true);
	const apiURL = import.meta.env.VITE_API_URL;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${apiURL}/posts`);
				const result = await response.json();
				setPosts(result);
			} catch (error) {
				throw error;
			} finally {
				setLoading(false)
			}
		};
		fetchData();
	}, [apiURL]);

	return (
		<main className="posts-list">
			<section className="posts-list-top">
				<h2 className="posts-top-h2">Latest Posts</h2>
				<p className="posts-top-p description">
					Random ass blog posts written by AI, made this to learn about REST
				</p>
			</section>
			{loading ? (
				<div className="loading">loading...</div>
			) : (
				<>
					<PostCardFeatured key={posts[0].id} postData={posts[0]} />
					<section className="posts-list-grid">
						{posts
							.filter((post) => post.id !== posts[0].id)
							.map((postData) => (
								<PostCard key={postData.id} postData={postData} />
							))}
					</section>
				</>
			)}
		</main>
	);
}

export default PostList;
