import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import type { PostData } from "../types/PostTypes";

function PostList() {
	const apiURL: string = "http://localhost:3000/api/v1";
	const [posts, setPosts] = useState<Array<PostData>>([]);

	useEffect(() => {
		async function fetchPosts() {
			try {
				const response = await fetch(`${apiURL}/posts`);
				const result = await response.json();
				setPosts(result);
			} catch (error) {
				throw error;
			}
		}
		try {
			fetchPosts();
		} catch (error) {
			throw error;
		}
	}, [apiURL]);

	console.log(posts);

	return (
		<main className="posts-list">
			<section className="posts-list-grid">
				{posts.map((postData) => (
					<PostCard key={postData.id} postData={postData} />
				))}
			</section>
		</main>
	);
}

export default PostList;
