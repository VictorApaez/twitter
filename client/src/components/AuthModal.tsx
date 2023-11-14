import React from "react";
import { ModalProps } from "@/typeDefs/feedTypes";

export const AuthModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  console.log("Auth modal");

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-40"
      onClick={handleBackdropClick}
    >
      <div className="bg-gradient-to-br from-blue-400 to-blue-500  p-10 rounded-lg shadow-xl z-50 relative max-w-sm">
        <h2 className="text-xl font-bold text-slate-100">
          You must be signed in to perform this action.
        </h2>
        <button
          onClick={onClose}
          className="text-3xl text-slate-100   absolute top-1 right-3 "
        >
          &times;
        </button>
        <div className="mt-12 flex justify-center">
          <div className="place-items-center">
            <a
              href="/api/auth/login"
              className="text-slate-100 border border-slate-100 py-2 px-4 rounded-sm hover:bg-slate-100 hover:text-blue-500 hover:border-transparent transition duration-300 ease-in-out"
            >
              Login
            </a>

            <span className="text-white mr-4 ml-4">or</span>
            <a
              href="/api/auth/login"
              className="text-slate-100 border border-slate-100 py-2 px-4 rounded-sm hover:bg-slate-100 hover:text-blue-500 hover:border-transparent transition duration-300 ease-in-out"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
