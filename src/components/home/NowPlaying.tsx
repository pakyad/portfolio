"use client";

import { useEffect, useState } from "react";

interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  songUrl?: string;
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

  const caption = "Iyad is currently listening to this while thinking about internships.";

  if (!data?.title || !data.songUrl) {
    return (
      <div className="now-playing">
        <p className="now-playing-caption">{caption}</p>
        <p className="info-clock-value">-</p>
      </div>
    );
  }

  return (
    <div className="now-playing">
      <p className="now-playing-caption">{caption}</p>
      <a
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="now-playing-link info-clock-value"
      >
        {data.title}
      </a>
      <p className="now-playing-artist">{data.isPlaying ? "Now playing" : "Last played"} · {data.artist}</p>
    </div>
  );
}
