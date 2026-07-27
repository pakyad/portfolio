"use client";

import { useEffect, useState } from "react";

interface NowPlayingData {
  isPlaying: boolean;
  title: string;
  artist: string;
  songUrl: string;
  albumArt?: string;
}

export function NowPlaying() {
  const [data, setData] = useState<NowPlayingData | null>(null);

  useEffect(() => {
    const fetchData = () =>
      fetch("/api/now-playing")
        .then((r) => r.json())
        .then(setData)
        .catch(() => {});
    fetchData();
    const interval = setInterval(fetchData, 25000);
    return () => clearInterval(interval);
  }, []);

  if (!data || !data.title) return null;

  return (
    <span className="now-playing-value">
      {data.albumArt && (
        <img src={data.albumArt} alt="" className="now-playing-art" />
      )}
      <a
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="now-playing-link"
      >
        {data.isPlaying ? "" : "last played: "}
        {data.title} — {data.artist}
      </a>
    </span>
  );
}
