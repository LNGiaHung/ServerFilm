import { Router } from 'express';
import { importMoviesController } from '../controllers/addMovie';
import { getMoviesController } from '../controllers/getMovies';
import { searchMoviesController } from '../controllers/searchMovies';
import { getMovieByIdController } from '../controllers/getMovieByID';


const router = Router();

router.post('/import', importMoviesController);
router.get('/get', getMoviesController);
router.get('/search', searchMoviesController);
router.get('/:id', getMovieByIdController);

export default router;