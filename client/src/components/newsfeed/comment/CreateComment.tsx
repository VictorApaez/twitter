import React from "react";
import { CreateCommentProps } from "@/typeDefs/feedTypes";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useUser } from "@auth0/nextjs-auth0/client";

export const CreateComment: React.FC<CreateCommentProps> = ({
  commentInputRef,
}) => {
  const { toggleModal } = useAuthModal();
  const { user } = useUser();

  const handleCreateCommentFocus = () => {
    if (!user) toggleModal();
  };
  return (
    <div className="">
      <textarea
        ref={commentInputRef}
        placeholder="Leave a comment..."
        className="w-full p-3 border rounded-full resize-none"
        rows={1}
        onClick={handleCreateCommentFocus}
      />
    </div>
  );
};
