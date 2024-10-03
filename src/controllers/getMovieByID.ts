export async function getMovieByIdController(req: any, res: any) {
  try {
    const { db } = req.app;
    const { id } = req.params; // Get the movie ID from the request parameters

    // Fetch the movie from the 'movies' collection by IMDb ID
    const result = await db.collection('movies').findOne({ imdbID: id }); // Use imdbID for querying

    if (!result) {
      return res.status(404).json({ error: 'Movie not found' }); // Return 404 if no movie is found
    }

    res.status(200).json({
      movie: result
    });

  } catch (error) {
    console.error("Error fetching movie:", error); // Log the error for debugging
    res.status(500).json({ error: "Internal Server Error" });
  }
}