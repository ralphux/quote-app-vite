import { useEffect, useState } from "react";

export default function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchQuote() {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("https://api.quotable.io/random");
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (e) {
      setError("Couldn’t fetch a quote right now. Try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuote(); // get a quote on first load
  }, []);

  return (
    <main style={{ minHeight: "100svh", display: "grid", placeItems: "center", padding: 24, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
      <div style={{ maxWidth: 700, width: "100%", background: "#fff", border: "1px solid #eee", borderRadius: 16, padding: 24, boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}>
        <h1 style={{ marginTop: 0, marginBottom: 12 }}>Quote of the Day</h1>

        {error ? (
          <p style={{ color: "#c00" }}>{error}</p>
        ) : (
          <>
            <p style={{ fontSize: "1.35rem", lineHeight: 1.6, margin: "8px 0" }}>“{quote}”</p>
            {author && <p style={{ opacity: 0.7, marginTop: 6 }}>— {author}</p>}
          </>
        )}

        <button
          onClick={fetchQuote}
          disabled={loading}
          style={{ marginTop: 16, padding: "10px 14px", borderRadius: 10, border: 0, cursor: "pointer" }}
        >
          {loading ? "Loading…" : "New Quote"}
        </button>
      </div>
    </main>
  );
}