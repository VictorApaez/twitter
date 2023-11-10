import React from "react";
import { PostActionButtonsProps } from "@/typeDefs/feedTypes";

export const PostActionButtons: React.FC<PostActionButtonsProps> = ({
  handleCommentInputFocus,
}) => {
  const actions = [
    { name: "Like", iconId: "thumbs-up", handler: () => {} },
    {
      name: "Comment",
      iconId: "message-circle",
      handler: handleCommentInputFocus,
    },
    { name: "Share", iconId: "share", handler: () => {} },
  ];
  return (
    <div className=" flex justify-between border-t p-2">
      {actions.map((action, i) => (
        <div
          key={i}
          className="flex w-full mx-2 justify-center px-2 py-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
        >
          {/* <Icon id={action.iconId}/> */}
          <button onClick={action.handler}>{action.name}</button>
        </div>
      ))}
    </div>
  );
};
