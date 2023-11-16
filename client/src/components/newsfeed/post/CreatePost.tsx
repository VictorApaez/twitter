import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useAuthModal } from "@/hooks/useAuthModal";
type PostModalProps = {
  isPostModalOpen: boolean;
  onPostModalClose: () => void;
};

export const CreatePost: React.FC<PostModalProps> = ({
  isPostModalOpen,
  onPostModalClose,
}) => {
  const { user } = useUser();
  const { isModalOpen, toggleModal } = useAuthModal();

  const handleCreatePost = () => {
    if (user) {
      onPostModalClose();
    } else {
      toggleModal();
    }
  };

  return (
    <div className="mb-10 bg-white p-6 rounded-xl shadow-lg">
      <textarea
        onClick={handleCreatePost}
        placeholder="What's on your mind?"
        className="w-full p-3 border rounded-full resize-none hover:bg-gray-100 transition-all cursor-pointer"
        rows={1}
      />
    </div>
  );
};
