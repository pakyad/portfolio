import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="not-found-code">404</p>
      <h1 className="not-found-title">Nothing here.</h1>
      <p className="not-found-desc">This page doesn&rsquo;t exist or has moved.</p>
      <Link href="/" className="not-found-link">&#8592; Back home</Link>
    </main>
  );
}
