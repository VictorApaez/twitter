import React from "react";
import { CommentProps } from "../../../typeDefs/feedTypes";
import { Replies } from "./Replies";

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div key={comment.id} className="mb-3">
      <div className="p-4 bg-gray-100 rounded-lg flex justify-between items-start">
        <div>
          <h5 className="text-sm font-bold mb-2">{comment.author}</h5>
          <p className="text-sm">{comment.content}</p>
        </div>
        <span className="text-xs text-gray-500">{comment.timestamp}</span>
      </div>

      <div className="mt-1 mb-2 pl-3 flex items-center">
        <button className="text-xs">Like</button>
        <span className="border-l h-4 mx-2 border-gray-200"></span>
        <button className="text-xs">Reply</button>
      </div>

      {/* Replies Section */}
      <Replies replies={comment.replies} />
    </div>
  );
};
