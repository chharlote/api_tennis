import { NextFunction, Request, Response } from "express";

const API_TOKEN =  process.env.API_TOKEN;
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        res.status(403).json({ message: "Token manquant" });
        return;
    }

    if (token !== API_TOKEN) {
        res.status(403).json({ message: "Token invalide", providedToken: token, expectedToken: API_TOKEN });
        return;
    }

    next();
};
