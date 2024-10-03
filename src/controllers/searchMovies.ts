export async function searchMoviesController(req: any, res: any) {
  try {
    const { db } = req.app;
    const { query } = req.query; // Get the search query from the request

    // Validate query: check if it's a string and not empty
    if (typeof query !== 'string' || query.trim() === '') {
      return res.status(400).json({ error: 'Invalid search query' });
    }

    // Prepare the filter for the database query
    const filter = {
      Title: { $regex: query, $options: 'i' } // Case-insensitive regex search
    };

    // Fetch movies from the 'movies' collection with the filter
    const result = await db.collection('movies').find(filter).limit(10).toArray(); // Limit results to 10

    res.status(200).json({
      movies: result
    });

  } catch (error) {
    console.error("Error fetching movies:", error); // Log the error for debugging
    res.status(500).json({ error: "Internal Server Error" });
  }
}