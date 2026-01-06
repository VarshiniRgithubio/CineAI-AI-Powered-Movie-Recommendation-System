import { useState } from "react";
import "./App.css";

const API_URL = "https://cineai-backend-0uvc.onrender.com";

export default function App() {
  const [preference, setPreference] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const recommendMovies = async () => {
    if (!preference.trim()) return;

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const res = await fetch(`${API_URL}/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preference })
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      setMovies(data.movies || []);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>🎬 Movie Recommender System</h1>
        <p>What are you looking for today?</p>

        <div className="search-bar">
          <input
            type="text"
            placeholder="e.g. spider-man, action movies, sci-fi"
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
          />
          <button onClick={recommendMovies} disabled={loading}>
            {loading ? "Loading..." : "Recommend"}
          </button>
        </div>
      </header>

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* Movie Grid */}
      {movies.length > 0 && (
        <section className="movies-section">
          <h2>Recommended Movies</h2>

          <div className="movie-grid">
            {movies.map((movie, index) => (
              <div className="movie-card" key={index}>
                <div className="poster">
                  <span>{movie.charAt(0)}</span>
                </div>
                <p className="movie-title">{movie}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
