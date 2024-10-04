import { Router } from 'express';
import { importMoviesController } from '../controllers/Movie/addMovie';
import { getMoviesController } from '../controllers/Movie/getMovies';
import { searchMoviesController } from '../controllers/Movie/searchMovies';
import { getMovieByIdController } from '../controllers/Movie/getMovieByID';
import { signUpController } from '../controllers/User/SignUp';
import { loginController } from '../controllers/User/Login';


const router = Router();

router.post('/import', importMoviesController);
router.get('/get', getMoviesController);
router.get('/search', searchMoviesController);
router.get('/:id', getMovieByIdController);
router.post('/signup', signUpController);
router.post('/login', loginController);

export default router;