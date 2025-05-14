import {Router} from 'express';
import {getStatPlayer, getStatPlayers} from './statPlayer.router.controller';
import {authenticateToken} from "../middleware/auth.middleware";
import rankingRouter from "../rankings/ranking.router";

const statPlayerRouter = Router();

statPlayerRouter.get('/', authenticateToken,  getStatPlayers);
statPlayerRouter.get('/:id', authenticateToken,  getStatPlayer);

export default statPlayerRouter;

