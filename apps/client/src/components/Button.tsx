type ButtonProps = {
  children: React.ReactNode;
  className: string;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default function Button(props: ButtonProps) {
  const { children, className = "btn-primary", ...rest } = props;
  return (
    <button type={rest.type || "button"} className={`btn ${className}`} {...rest}>
      {children}
    </button>
  );
}
