import React, { useRef, useEffect } from "react";
import Button from "./Button";

interface ConfirmModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export default function ConfirmModal({
  id,
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
}: ConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <dialog id={id} ref={dialogRef} className="modal" onClose={onClose}>
      <div className="modal-box">
        <h3 className="font-bold text-lg text-error">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            <Button className="btn-ghost" onClick={handleClose} disabled={isLoading}>
              {cancelText}
            </Button>
            <Button
              className="btn-error"
              onClick={(e) => {
                e.preventDefault();
                onConfirm();
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Deleting...
                </>
              ) : (
                confirmText
              )}
            </Button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleClose} disabled={isLoading}>
          close
        </button>
      </form>
    </dialog>
  );
}
