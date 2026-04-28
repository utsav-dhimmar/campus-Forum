/**
 *
 * @param {import("react").ButtonHTMLAttributes<HTMLButtonElement>} props
 * @returns
 */
export default function Button(props) {
  const { children, className = "btn-primary", ...rest } = props;
  return (
    <button type="button" className={`btn ${className}`} {...rest}>
      {children}
    </button>
  );
}
