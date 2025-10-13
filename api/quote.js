export default async function handler(req, res) {
  try {
    const upstream = await fetch("https://api.quotable.io/random", {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: "Upstream error" });
    }

    const data = await upstream.json();
    return res.status(200).json({
      content: data.content,
      author: data.author,
    });
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
}