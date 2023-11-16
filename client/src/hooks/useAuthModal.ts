import { useContext } from "react";
import { ModalContext, ModalContextType } from "../context/AuthModalProvider";

export const useAuthModal = (): ModalContextType => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
