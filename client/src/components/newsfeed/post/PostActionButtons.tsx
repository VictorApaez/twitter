import React from "react";
import { PostActionButtonsProps } from "@/typeDefs/feedTypes";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useAuthModal } from "@/hooks/useAuthModal";

export const PostActionButtons: React.FC<PostActionButtonsProps> = ({
  handleCommentInputFocus,
  showComments,
}) => {
  const { user } = useUser();
  const { isModalOpen, toggleModal } = useAuthModal();

  const handleLike = () => {
    if (user) {
      console.log("user active");
    } else {
      toggleModal();
    }
  };

  const handleCommentPress = () => {
    if (user) {
      handleCommentInputFocus();
      showComments();
      console.log("user active");
    } else {
      toggleModal();
    }
  };

  const actions = [
    { name: "Like", iconId: "thumbs-up", handler: () => handleLike() },
    {
      name: "Comment",
      iconId: "message-circle",
      handler: () => handleCommentPress(),
    },
    { name: "Share", iconId: "share", handler: () => {} },
  ];
  return (
    <div className=" flex justify-between border-t p-2">
      {actions.map((action, i) => (
        <div
          key={i}
          className="flex w-full mx-2 justify-center px-2 py-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={action.handler}
        >
          {/* <Icon id={action.iconId}/> */}
          <button>{action.name}</button>
        </div>
      ))}
    </div>
  );
};
