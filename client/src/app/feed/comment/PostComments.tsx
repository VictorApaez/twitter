import React from "react";
import { PostCommentsProps } from "../../../typeDefs/feedTypes";
import { CreateComment } from "./CreateComment";
import { Comment } from "./Comment";
import { AnimatePresence, motion } from "framer-motion";

export const PostComments: React.FC<PostCommentsProps> = ({
  comments,
  showComments,
  commentInputRef,
}) => {
  const variants = {
    hidden: {
      opacity: 0,
      height: 0,
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.5, when: "beforeChildren" },
    },
  };
  return (
    <div>
      {/* Comment Input */}
      <CreateComment commentInputRef={commentInputRef} />

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {comments.map((comment, i) => (
              <Comment comment={comment} key={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
