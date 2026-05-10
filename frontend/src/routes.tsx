import App from "./App"
import ServerError from "./components/500"
import PostList from "./components/PostsList"
import Post from "./components/Post"
import Signup from "./components/Signup"

export const routes = [{
    path: "/",
    element: <App/>,
    errorElement: <ServerError />,
    children: [
      {index:true, element: <PostList/>},
      {path:'post/:postId', element: <Post/>},
      {path: 'signup', element: <Signup/>}
    ]
}] 
