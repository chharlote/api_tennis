import {Router} from 'express';
import { getRankings, createRanking, updateRanking, deleteRanking } from './ranking.router.controller';
import {authenticateToken} from "../middleware/auth.middleware";

const rankingRouter = Router();

rankingRouter.get('/', authenticateToken,  getRankings);
rankingRouter.post('/', authenticateToken, createRanking);
rankingRouter.patch('/:id', authenticateToken, updateRanking);
rankingRouter.delete('/:id', authenticateToken, deleteRanking);

export default rankingRouter;
