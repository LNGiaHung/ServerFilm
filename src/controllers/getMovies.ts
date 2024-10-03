export async function getMoviesController(req: any, res: any) {
  try {
    const { db } = req.app;

    // Fetch movies from the 'movies' collection
    const result = await db.collection('movies').find().toArray();

    res.status(200).json({
      movies: result
    });

  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}