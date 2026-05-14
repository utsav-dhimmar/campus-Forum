import Button from "../Button";

interface DeleteUsrCmpProps {
  onClick: (id: string) => void;
  id: string;
  disabled?: boolean;
}

export default function DeleteUsrCmp({ onClick, id, disabled }: DeleteUsrCmpProps) {
  return (
    <Button className="btn-error btn-sm" onClick={() => onClick(id)} disabled={disabled}>
      Delete
    </Button>
  );
}
