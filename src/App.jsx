import { useEffect, useState } from "react";

// Fallback quotes in case the API is down
const fallbackQuotes = [
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { content: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { content: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
  { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { content: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" }
];

export default function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchQuote() {
    try {
      setLoading(true);
      setError("");
      
      // Try to fetch from the API first
      const res = await fetch("https://api.quotable.io/random");
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error("Error fetching quote:", error);
      
      // Use fallback quotes when API fails
      const randomFallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      setQuote(randomFallback.content);
      setAuthor(randomFallback.author);
      setError("Using offline quotes (API unavailable)");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuote(); // get a quote on first load
  }, []);

  return (
<main
  style={{
    width: "100%",
    maxWidth: 800,
    padding: 24,
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
  }}
>
      <div style={{ maxWidth: 700, width: "100%", background: "#fff", border: "1px solid #eee", borderRadius: 16, padding: 24, boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}>
        <h1 style={{ marginTop: 0, marginBottom: 12 }}>Quote of the Day</h1>

        <p style={{ fontSize: "1.35rem", lineHeight: 1.6, margin: "8px 0" }}>"{quote}"</p>
        {author && <p style={{ opacity: 0.7, marginTop: 6 }}>— {author}</p>}
        
        {error && (
          <p style={{ color: "#666", fontSize: "0.9rem", marginTop: 8, fontStyle: "italic" }}>
            {error}
          </p>
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