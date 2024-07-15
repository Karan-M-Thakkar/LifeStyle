import { useRef, useEffect } from "react";

export default function Modal({ open, onClose, children }) {
  const modalRef = useRef();

  useEffect(() => {
    if (open) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }, [open]);
  return (
    <dialog
      ref={modalRef}
      onClose={onClose}
      className="min-w-60 max-w-4xl p-6 rounded-lg flex flex-col gap-8"
    >
      {children}
    </dialog>
  );
}
