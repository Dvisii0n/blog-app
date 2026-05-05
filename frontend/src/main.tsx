import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.tsx";
import PostList from "./components/PostsList.tsx";
import Post from "./components/Post.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {index:true, Component:PostList},
      {path:'post/:postId', Component: Post}
    ]
  }
])

createRoot(document.getElementById("root")!).render(
	<StrictMode>
   <RouterProvider router={router}>
    </RouterProvider> 
	</StrictMode>,
);
