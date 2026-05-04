import type { PostData } from "../types/PostTypes"
import { formatDate } from "../utils"

function PostCard({postData} : {postData:PostData }) {


    return <div  className="post-card">
        <p className="post-p created-at">{formatDate(postData.createdAt)}</p>
        <p className="post-p author">Author: {postData.author.username}</p>
        <p className="post-p title">{postData.title}</p>
        <p className="post-p description">{postData.description}</p>
        <button className="post-btn read">Read</button>
    </div>

}

export default PostCard