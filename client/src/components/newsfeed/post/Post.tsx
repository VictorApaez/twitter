"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, memo } from "react";
import { PostProps } from "../../../typeDefs/feedTypes";
import { EngagementMetrics } from "./EngagementMetrics";
import { PostActionButtons } from "./PostActionButtons";
import { PostComments } from "../comment/PostComments";

const Post: React.FC<PostProps> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleCommentInputFocus = () => {
    commentInputRef.current?.focus();
  };
  console.log("POST");

  return (
    <div key={post.id} className="mb-8 bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between">
        <div>
          <h3 className="text-md font-bold mb-2">{post.author}</h3>
          <p className="mb-4 text-sm">{post.content}</p>
        </div>
        <span className="text-sm text-gray-500 block mb-4">
          {post.timestamp}
        </span>
      </div>

      {/* Likes and comments count */}
      <EngagementMetrics post={post} onCommentsClick={toggleComments} />

      {/* Action Buttons: Like, comment, share */}
      <PostActionButtons
        handleCommentInputFocus={handleCommentInputFocus}
        showComments={toggleComments}
      />

      {/* All post comments */}

      <PostComments
        comments={post.comments}
        showComments={showComments}
        commentInputRef={commentInputRef}
      />
    </div>
  );
};

export default memo(Post);
