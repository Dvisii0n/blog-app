import App from "./App"
import NotFound from "./components/404"
import PostList from "./components/PostsList"
import Post from "./components/Post"
import Signup from "./components/Signup"

export const routes = [{
    path: "/",
    element: <App/>,
    errorElement: <NotFound />,
    children: [
      {index:true, element: <PostList/>},
      {path:'post/:postId', element: <Post/>},
      {path: 'signup', element: <Signup/>}
    ]
}] 
