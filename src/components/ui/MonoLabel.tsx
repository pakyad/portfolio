type MonoLabelProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>;

export default function MonoLabel({ children, className = "", ...props }: MonoLabelProps) {
  return (
    <span className={`typo-meta ${className}`} {...props}>
      {children}
    </span>
  );
}
