import { Request, Response } from 'express';
import { StatPlayer } from '../entities/statPlayer';
import {AppDataSource} from "../data-source";

const playerStatRepo = AppDataSource.getRepository(StatPlayer);

export const getStatPlayers = async (_req: Request, res: Response) => {
    try {
        const stats = await playerStatRepo.find();
        res.status(200).json(stats);
        return;
    } catch (error) {
        console.error("Erreur lors de la récupération des statistiques des joueurs:", error);
        res.status(500).send({ message: "Erreur lors de la récupération des statistiques des joueurs." });
        return;

    }
};


// Récupération d'une statistique d'un joueur par ID
export const getStatPlayer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const stat = await playerStatRepo.findOne({ where: { idPlayer: Number(id) } });

        if (!stat) {
            res.status(404).json({ message: `Statistique du joueur avec l'ID ${id} non trouvée` });
            return;

        }

        res.status(200).json(stat);
    } catch (error) {
        console.error("Erreur lors de la récupération des statistiques du joueur:", error);
        res.status(500).send({ message: "Erreur lors de la récupération des statistiques du joueur." });
        return;

    }
};