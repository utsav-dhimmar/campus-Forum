import Button from "../Button";

interface DeleteUsrCmpProps {
  onClick: (id: string) => void;
  id: string;
  disabled?: boolean;
}

export default function DeleteUsrCmp({ onClick, id, disabled }: DeleteUsrCmpProps) {
  return (
    <Button className="btn-danger" onClick={() => onClick(id)} disabled={disabled}>
      Delete
    </Button>
  );
}
