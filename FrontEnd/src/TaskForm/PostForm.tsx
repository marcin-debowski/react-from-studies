import React, { useState, useRef, useEffect } from "react";

interface PostFormProps {
  onAddPost: (post: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onAddPost }) => {
  const [post, setPost] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (post.trim()) {
      onAddPost(post);
      setPost("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={post}
        onChange={(e) => setPost(e.target.value)}
        placeholder="Add a new post"
      />
      <button type="submit">Add post</button>
    </form>
  );
};

export default PostForm;
