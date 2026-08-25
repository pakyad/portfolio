import Image from "next/image";

type ScreenshotFrameProps = {
  src: string;
  alt: string;
  caption: string;
  title?: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
};

export default function ScreenshotFrame({
  src,
  alt,
  caption,
  title,
  className = "",
  priority = false,
  width = 828,
  height = 1792,
}: ScreenshotFrameProps) {
  return (
    <figure className={`screenshot-card ${className}`}>
      {title && <h3 className="screenshot-title">{title}</h3>}
      <div className="screenshot-browser" aria-hidden="true"><span /><span /><span /></div>
      <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 800px) 88vw, 420px" priority={priority} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
