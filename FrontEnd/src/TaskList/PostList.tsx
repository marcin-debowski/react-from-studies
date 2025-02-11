import React, { useRef } from "react";
import { Post } from "../App2";
import "./TaskList.scss";
import { motion, AnimatePresence, useScroll } from "framer-motion";

interface PostListProps {
  posts: Post[];
  onDeletePost: (id: number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onDeletePost }) => {
  const { scrollYProgress } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div>
      <div className="scroll-container">
        <motion.div
          className="scroll-progress scroll-progress-active"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
      <div ref={containerRef}>
        <ul className="task-list">
          <AnimatePresence>
            {posts.map((post, index) => (
              <motion.li
                key={post.id}
                layout
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span> {post.author}</span>
                <span> {post.body}</span>
                <div>
                  <button
                    onClick={() => onDeletePost(post.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
};

export default PostList;
