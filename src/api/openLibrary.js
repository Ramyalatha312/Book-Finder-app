export const searchBooks = async (query, page = 1) => {
    try {
        const response = await fetch(
            `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${page}`
        );

        if (!response.ok) throw new Error("Failed to fetch books");

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
};
