import { useState } from "react";
import { Button, ConfirmModal } from "../../components";

interface DeleteUsrCmpProps {
  onClick: (id: string) => void;
  id: string;
  disabled?: boolean;
}

export default function DeleteUsrCmp({ onClick, id, disabled }: DeleteUsrCmpProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button className="btn-error btn-sm" onClick={() => setIsModalOpen(true)} disabled={disabled}>
        Delete
      </Button>

      <ConfirmModal
        id={`delete_user_${id}`}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          onClick(id);
          setIsModalOpen(false);
        }}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        isLoading={disabled}
      />
    </>
  );
}
