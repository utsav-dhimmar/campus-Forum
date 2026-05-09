type InputProps = {
  label: string;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  divClassName?: string;
  inputClassName?: string;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default function Input(props: InputProps) {
  const { label, type = "text", divClassName = "", inputClassName = "", ...rest } = props;

  return (
    <div className={`mb-3 ${divClassName}`}>
      <label htmlFor={label} className="form-label">
        {label}
      </label>
      <input
        id={label}
        type={type}
        className={`form-control ${inputClassName}`}
        placeholder={`Enter ${label}`}
        {...rest}
      />
    </div>
  );
}
