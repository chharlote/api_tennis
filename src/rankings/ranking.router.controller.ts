import { Request, Response } from "express";
import { AppDataSource } from "../data-source";  // Assurez-vous de bien configurer votre DataSource
import { Ranking } from "../entities/ranking";

// Récupération des classements
export const getRankings = async (_req: Request, res: Response) => {
    try {
        const rankings = await AppDataSource.getRepository(Ranking).find({
            relations: { player: true },
        });
        res.status(200).json(rankings);
    } catch (error) {
        console.error("Erreur lors de la récupération des classements:", error);
        res.status(500).json({ message: "Une erreur est survenue lors de la récupération des classements." });
    }
};

// Création d'un classement
export const createRanking = async (req: Request, res: Response) => {
    const { rankingDate, points, idPlayer } = req.body;

    try {
        const newRanking = await AppDataSource.getRepository(Ranking).save({
            rankingDate,
            points,
            player: { idPlayer },
        });
        res.status(201).json(newRanking);
    } catch (error) {
        console.error("Erreur lors de la création du classement:", error);
        res.status(500).json({ message: "Une erreur est survenue lors de la création du classement." });
    }
};

// Mise à jour d'un classement
export const updateRanking = async (req: Request, res: Response) => {
    const rankingId = parseInt(req.params.id);
    const { rankingDate, points } = req.body;

    try {
        const rankingRepository = AppDataSource.getRepository(Ranking);
        const ranking = await rankingRepository.findOneBy({ idPlayer: rankingId });

        if (!ranking) {
            res.status(404).json({ message: 'Ranking non trouvé' });
            return;
        }

        if (rankingDate) {
            ranking.rankingDate = rankingDate;
        }
        if (points) {
            ranking.points = points;
        }

        await rankingRepository.save(ranking);

        res.status(200).json(ranking);
        return;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du ranking:', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du ranking.' });
        return;
    }
};

// Suppression d'un classement
export const deleteRanking = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await AppDataSource.getRepository(Ranking).delete(id);
        res.status(200).json({ message: "Le classement a été supprimé avec succès." });
    } catch (error) {
        console.error("Erreur lors de la suppression du classement:", error);
        res.status(500).json({ message: "Une erreur est survenue lors de la suppression du classement." });
    }
};
