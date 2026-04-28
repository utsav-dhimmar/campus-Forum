import Button from "../Button";

export default function DeleteUsrCmp({ onClick, id, disabled }) {
  return (
    <Button
      className="btn-danger"
      onClick={() => onClick(id)}
      disabled={disabled}
    >
      Delete
    </Button>
  );
}
