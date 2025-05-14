import { Router } from "express";
import {createPlayer, deletePlayer, getPlayer, getPlayers, patchPlayer} from "./player.router.controller";
import dotenv from 'dotenv';
dotenv.config();


import {authenticateToken} from "../middleware/auth.middleware";

export const playerRouter = Router();


playerRouter.get("/", authenticateToken, getPlayers);
playerRouter.get("/:playerId", authenticateToken, getPlayer);
playerRouter.patch("/:playerId", authenticateToken, patchPlayer);
playerRouter.post("/", authenticateToken, createPlayer);
playerRouter.delete("/:playerId", authenticateToken, deletePlayer);


export default playerRouter;
