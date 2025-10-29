function BookCard({ book }) {
    const coverId = book.cover_i;
    const coverUrl = coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
        : "https://via.placeholder.com/150x200?text=No+Cover";

    return (
        <div className="book-card">
            <img src={coverUrl} alt={book.title} />
            <h3>{book.title}</h3>
            <p className="author">
                {book.author_name?.join(", ") || "Unknown Author"}
            </p>
            <p className="year">{book.first_publish_year || "Year N/A"}</p>
            <a
                href={`https://openlibrary.org${book.key}`}
                target="_blank"
                rel="noreferrer"
            >
                View Details →
            </a>
        </div>
    );
}

export default BookCard;


