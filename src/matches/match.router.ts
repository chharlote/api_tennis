import { Router } from "express";
import {createMatch, deleteMatch, getMatch, getMatches, patchMatch} from "./match.router.controller";
import dotenv from 'dotenv';
dotenv.config();


import {authenticateToken} from "../middleware/auth.middleware";

export const matchRouter = Router();


matchRouter.get("/", authenticateToken, getMatches);
matchRouter.get("/:matchId", authenticateToken, getMatch);
matchRouter.patch("/:matchId", authenticateToken, patchMatch);
matchRouter.post("/", authenticateToken, createMatch);
matchRouter.delete("/:matchId", authenticateToken, deleteMatch);


export default matchRouter;
