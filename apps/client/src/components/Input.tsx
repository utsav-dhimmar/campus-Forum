type InputProps = {
  label: string;
  type: React.InputHTMLAttributes<HTMLInputElement>["type"];
  divClassName?: string;
  inputClassName?: string;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default function Input(props: InputProps) {
  const { label, type = "text", divClassName = "", inputClassName = "", ...rest } = props;

  return (
    <div className={`form-control w-full flex flex-col ${divClassName}`}>
      <label htmlFor={label} className="label px-0">
        <span className="label-text font-medium">{label}</span>
      </label>
      <input
        id={label}
        type={type}
        className={`input input-bordered w-full ${inputClassName}`}
        placeholder={`Enter ${label}`}
        {...rest}
      />
    </div>
  );
}
