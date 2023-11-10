import React from "react";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
      <div className="bg-white p-4 rounded-lg shadow-xl z-50">
        <header className="flex justify-between items-center">
          <h2 className="text-xl font-bold">You must be signed in!</h2>
          <button onClick={onClose} className="text-3xl text-red-400 p-2">
            &times;
          </button>
        </header>
        <div className="mt-4">
          <a href="/api/auth/login" className="text-blue-600 hover:underline">
            Login
          </a>
          <a
            href="/api/auth/signup"
            className="ml-4 text-blue-600 hover:underline"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};
