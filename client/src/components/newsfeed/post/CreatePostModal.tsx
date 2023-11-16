import React from "react";
import { ModalProps } from "@/typeDefs/feedTypes";
import { useUser } from "@auth0/nextjs-auth0/client";
import Icon from "@/components/Icon";

export const CreatePostModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const { user } = useUser();
  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-40"
      onClick={handleBackdropClick}
    >
      <div className=" bg-white p-6 rounded-lg shadow-xl z-50 relative w-2/3 max-w-2xl">
        <div className="flex flex-col space-y-4 relative">
          <button className="ml-auto absolute top-0 right-0">
            <Icon id="close-icon" onClick={onClose} />
          </button>
          <div>
            <p className="text-lg font-semibold text-red text-slate-700">
              {user?.nickname?.toUpperCase()}
            </p>
            <p className="text-sm text-gray-500">Post to Anyone</p>
          </div>
          <textarea
            className="form-textarea mt-1 block w-full  focus:outline-none resize-none"
            rows={8}
            placeholder="What do you want to talk about?"
          />

          <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 w-20 place-self-end">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
