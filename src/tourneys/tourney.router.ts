import { Router } from 'express';
import {getTourneys, getTourney, createTourney, updateTourney, deleteTourney} from './tourney.router.controller';
import {authenticateToken} from "../middleware/auth.middleware";

const tourneyRouter = Router();

tourneyRouter.get('/', authenticateToken, getTourneys);
tourneyRouter.get('/:id', authenticateToken, getTourney);
tourneyRouter.post('/', authenticateToken, createTourney);
tourneyRouter.patch('/:id', authenticateToken, updateTourney);
tourneyRouter.delete('/:id', authenticateToken, deleteTourney);

export default tourneyRouter;
