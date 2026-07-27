import Image from "next/image";

type ScreenshotFrameProps = {
  src: string;
  alt: string;
  caption: string;
  title?: string;
  className?: string;
  priority?: boolean;
};

export default function ScreenshotFrame({ src, alt, caption, title, className = "", priority = false }: ScreenshotFrameProps) {
  return (
    <figure className={`screenshot-card ${className}`}>
      {title && <h3 className="screenshot-title">{title}</h3>}
      <div className="screenshot-browser" aria-hidden="true"><span /><span /><span /></div>
      <Image src={src} alt={alt} width={828} height={1792} sizes="(max-width: 800px) 88vw, 420px" priority={priority} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
