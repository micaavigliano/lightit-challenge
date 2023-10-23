import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { Close } from "@mui/icons-material";
import { useFocusTrap } from "../hook/useFocusTrap";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, title }) => {
  const modalRef = useFocusTrap();

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape" && onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      const interactiveElements = modalRef.current?.querySelectorAll(
        "input, select, textarea, a, [tabindex]"
      );

      if (interactiveElements) {
        const firstInteractiveElement = interactiveElements[0];
        if (firstInteractiveElement instanceof HTMLElement) {
          firstInteractiveElement.focus();
        }
      }
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <dialog
      className="fixed top-0 left-0 w-full h-full flex align-center justify-center bg-background-modal"
      ref={modalRef as unknown as React.RefObject<HTMLDialogElement>}
    >
      <div
        className="text-center max-[920px]:w-3/4 w-2/4 h-2/4 bg-white m-auto p-auto shadow-md flex flex-col rounded-lg p-4"
        onKeyUp={onKeyDown}
      >
        <div className="flex flex-row justify-between bg-slate-300 p-4">
          <h2 className="text-xl font-medium">{title}</h2>
          <button onClick={onClose} className="text-black">
            <Close />
          </button>
        </div>
        {children}
      </div>
    </dialog>,
    document.getElementById("root") as HTMLElement
  );
};

export default Modal;
