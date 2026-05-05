import { useNavigate } from "react-router";
import type { PostData } from "../types/PostTypes";
import { formatDate } from "../utils";

function PostCard({ postData }: { postData: PostData }) {
	const navigate = useNavigate();
	return (
		<div className="post-card">
			<p className="post-p created-at">{formatDate(postData.createdAt)}</p>
			<p className="post-p author">By: {postData.author.username}</p>
			<p className="post-p title">{postData.title}</p>
			<p className="post-p description">{postData.description}</p>
			<button
				onClick={() => navigate(`post/${postData.id}`)}
				className="post-btn read"
			>
				Read
			</button>
		</div>
	);
}

function PostCardFeatured({ postData }: { postData: PostData }) {
	const navigate = useNavigate();
	return (
		<div className="post-card featured">
			<img
				className="post-img-featured"
				src={postData.imageURL}
				alt="featured post image"
			/>
			<p className="post-p created-at">
				<span className="post-sp-featured">FEATURED</span>
				{formatDate(postData.createdAt)}
			</p>
			<p className="post-p author">By: {postData.author.username}</p>
			<p className="post-p title">{postData.title}</p>
			<p className="post-p description">{postData.description}</p>
			<button
				onClick={() => navigate(`post/${postData.id}`)}
				className="post-btn read"
			>
				Read
			</button>
		</div>
	);
}

export { PostCard, PostCardFeatured };
