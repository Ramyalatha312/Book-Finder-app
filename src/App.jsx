import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";
import "./App.css";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const categories = ["Fiction", "Technology", "Kids", "Romance", "Science", "History"];

  // ✅ Handle book search
  const searchBooks = async (query) => {
    if (!query.trim()) return;
    setQuery(query);
    setLoading(true);
    try {
      const res = await axios.get(
        `https://openlibrary.org/search.json?title=${query}`
      );
      setBooks(res.data.docs.slice(0, 30));
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle category click
  const fetchCategoryBooks = async (category) => {
    setLoading(true);
    setQuery(category);
    try {
      const res = await axios.get(
        `https://openlibrary.org/search.json?q=${category}`
      );
      setBooks(res.data.docs.slice(0, 30));
    } catch (err) {
      console.error("Error fetching category books:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login handler (anyone can log in)
  const handleLogin = () => {
    if (username.trim()) {
      setIsLoggedIn(true);
      setLoginError("");
      localStorage.setItem("bookFinderUser", username);
    } else {
      setLoginError("⚠️ Please enter a valid name!");
    }
  };

  // ✅ Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setBooks([]);
    setQuery("");
    localStorage.removeItem("bookFinderUser");
  };

  // ✅ Keep user logged in after refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("bookFinderUser");
    if (savedUser) {
      setUsername(savedUser);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="app">
      {!isLoggedIn ? (
        // ---------- LOGIN PAGE ----------
        <div className="login-page">
          <h1>🔐 Login to Book Finder</h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <button onClick={handleLogin} className="login-btn">
            Login
          </button>
          {loginError && <p className="error">{loginError}</p>}
        </div>
      ) : (
        // ---------- MAIN BOOK FINDER ----------
        <div>
          <div className="header-section">
            <h1>📚 Welcome, {username}!</h1>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>

          {/* ✅ Search Bar */}
          <SearchBar onSearch={searchBooks} />

          {/* ✅ Categories */}
          {query === "" && (
            <div className="categories">
              <h2>Browse by Category</h2>
              <div className="category-buttons">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className="category-btn"
                    onClick={() => fetchCategoryBooks(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ✅ Books Section */}
          {loading ? (
            <p className="loading">Loading books...</p>
          ) : (
            <div className="book-grid">
              {books.length > 0 ? (
                books.map((book) => <BookCard key={book.key} book={book} />)
              ) : (
                <p className="no-results">Search for a book or select a category!</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
