import React from "react";
import { CreateCommentProps } from "@/typeDefs/feedTypes";

export const CreateComment: React.FC<CreateCommentProps> = ({
  commentInputRef,
}) => {
  return (
    <div className="">
      <textarea
        ref={commentInputRef}
        placeholder="Leave a comment..."
        className="w-full p-2 border rounded-lg resize-none"
        rows={2}
      />
    </div>
  );
};
