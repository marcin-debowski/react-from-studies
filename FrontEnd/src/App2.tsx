import { useEffect, useState } from "react";
import "./App.scss";
import PostForm from "./TaskForm/PostForm.tsx";
import PostList from "./TaskList/PostList";
// import useALLPost from "./hooks/useAllPost";

export interface Post {
  id: number;
  author: string;
  body: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:8080/posts");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const fetchedPosts = data.posts;
      if (Array.isArray(fetchedPosts)) {
        setPosts(fetchedPosts);
      } else {
        throw new Error("Fetched posts data is not an array");
      }
    } catch (error) {
      console.error("failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async (postName: string) => {
    const newPost: Omit<Post, "id"> = {
      author: postName,
      body: "tu cos jest",
    };
    try {
      const response = await fetch("http://localhost:8080/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseJson = await response.json();
      const createdPost: Post = responseJson.post;
      setPosts((prevPosts) => [createdPost, ...prevPosts]);
    } catch (error) {
      console.error("Failed to add post:", error);
    }
  };

  //   const allPostsCounter = useALLPosts(posts);

  const deletePost = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/posts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Failed to delete posts:", error);
    }
  };
  return (
    <>
      <div className="App">
        <h1>To-Do List</h1>
        <PostForm onAddPost={addPost} />
        <PostList key={posts.length} onDeletePost={deletePost} posts={posts} />
      </div>
    </>
  );
};

export default App;
