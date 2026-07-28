const cacheHeaders = { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" };

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return Response.json({ isPlaying: false }, { status: 503, headers: cacheHeaders });
  }

  try {
  const basic = Buffer.from(
    `${clientId}:${clientSecret}`
  ).toString("base64");

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  if (!tokenRes.ok) throw new Error("Spotify token request failed");
  const { access_token } = await tokenRes.json();

  const nowPlaying = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    { headers: { Authorization: `Bearer ${access_token}` } }
  );

  if (nowPlaying.status === 204 || !nowPlaying.ok) {
    const recent = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    const recentData = await recent.json();
    const track = recentData.items?.[0]?.track;
    return Response.json({
      isPlaying: false,
      title: track?.name,
      artist: track?.artists?.map((a: { name: string }) => a.name).join(", "),
      songUrl: track?.external_urls?.spotify,
      albumArt: track?.album?.images?.[0]?.url,
    }, { headers: cacheHeaders });
  }

  const song = await nowPlaying.json();
  return Response.json({
    isPlaying: song.is_playing,
    title: song.item?.name,
    artist: song.item?.artists
      ?.map((a: { name: string }) => a.name)
      .join(", "),
    songUrl: song.item?.external_urls?.spotify,
    albumArt: song.item?.album?.images?.[0]?.url,
  }, { headers: cacheHeaders });
  } catch {
    return Response.json({ isPlaying: false }, { status: 503, headers: cacheHeaders });
  }
}
