import Link from "next/link";

type EditorialLinkProps = {
  href: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLAnchorElement>;

export default function EditorialLink({
  href,
  children,
  className = "",
  ...props
}: EditorialLinkProps) {
  return (
    <Link
      href={href}
      className={`editorial-link typo-meta ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
