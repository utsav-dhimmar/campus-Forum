/**
 *
 * @param {{
 *  label?:string
 *  divClassName?:string
 *  inputClassName?:string
 * }
 * & import("react").InputHTMLAttributes<HTMLInputElement>} props
 */
export default function Input(props) {
  const {
    label,
    type = "text",
    divClassName = "",
    inputClassName = "",
    ...rest
  } = props;

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
