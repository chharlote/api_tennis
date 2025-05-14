import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Match } from "../entities/match";
import { Player } from "../entities/player";
import { Tourney } from "../entities/tourney";

const matchRepo = AppDataSource.getRepository(Match);

// Récupération de tous les matchs
export const getMatches = async (req: Request, res: Response) => {
    try {
        const { tourney_id } = req.query;

        const filters: any = {};

        if (tourney_id) filters.tourneyId = String(tourney_id);

        const matches = await matchRepo.find({
            where: filters,
            relations: ["winner", "loser", "tourney"]
        });

        if (matches.length === 0) {
            res.status(404).json({ message: "Aucun match trouvé." });
            return;
        }

        res.status(200).json(matches);
        return;
    } catch (error) {
        console.error("Erreur lors de la récupération des matchs:", error);
        res.status(500).json({ message: "Une erreur est survenue lors de la récupération des matchs." });
        return;
    }
};

// Récupération d'un match par son ID
export const getMatch = async (req: Request, res: Response) => {
    try {
        const { matchId } = req.params;

        const match = await matchRepo.findOne({
            where: { matchNum: Number(matchId) },
            relations: ["winner", "loser", "tourney"]
        });

        if (match) {
            res.status(200).json(match);
            return;
        } else {
            res.status(404).json({ message: `Match ${matchId} introuvable` });
            return;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du match:", error);
        res.status(500).json({ message: "Une erreur est survenue lors de la récupération du match." });
    }
};

// Création d'un nouveau match
export const createMatch = async (req: Request, res: Response) => {
    try {
        const { tourneyId, winnerId, loserId, score, date } = req.body;

        const winner = await AppDataSource.getRepository(Player).findOneBy({ idPlayer: Number(winnerId) });
        const loser = await AppDataSource.getRepository(Player).findOneBy({ idPlayer: Number(loserId) });
        const tourney = await AppDataSource.getRepository(Tourney).findOneBy({ idTourney: String(tourneyId) });

        if (!winner || !loser || !tourney) {
            res.status(400).json({ message: "Gagnant, perdant ou tournoi non trouvé." });
            return;
        }

        const newMatch = matchRepo.create({
            tourneyId: String(tourneyId),
            winner,
            loser,
            score,
            tourney,
        });

        await matchRepo.save(newMatch);

        res.status(201).json(newMatch);
        return;
    } catch (error) {
        console.error("Erreur lors de la création du match:", error);
        res.status(500).json({ message: "Erreur serveur lors de la création." });
        return;
    }
};

// Mise à jour d'un match
export const patchMatch = async (req: Request, res: Response) => {
    try {
        const { matchId } = req.params;
        const { tourneyId, winnerId, loserId, score, date } = req.body;

        const match = await matchRepo.findOne({ where: { matchNum: Number(matchId) }, relations: ["winner", "loser", "tourney"] });

        if (!match) {
            res.status(404).json({ message: `Match avec l'ID ${matchId} non trouvé.` });
            return;
        }

        if (tourneyId) match.tourneyId = String(tourneyId);
        if (winnerId) {
            const winner = await AppDataSource.getRepository(Player).findOneBy({ idPlayer: Number(winnerId) });
            if (winner) match.winner = winner;
        }
        if (loserId) {
            const loser = await AppDataSource.getRepository(Player).findOneBy({ idPlayer: Number(loserId) });
            if (loser) match.loser = loser;
        }
        if (score) match.score = score;

        await matchRepo.save(match);

        res.status(200).json(match);
        return;
    } catch (error) {
        console.error("Erreur lors de la mise à jour du match:", error);
        res.status(500).json({ message: "Erreur serveur lors de la mise à jour." });
        return;
    }
};

// Suppression d'un match
export const deleteMatch = async (req: Request, res: Response) => {
    try {
        const { matchId } = req.params;

        const match = await matchRepo.findOne({ where: { matchNum: Number(matchId) }, relations: ["winner", "loser", "tourney"] });

        if (!match) {
            res.status(404).json({ message: `Match avec l'ID ${matchId} non trouvé.` });
            return;
        }

        await matchRepo.remove(match);

        res.status(200).json({ message: `Match ${matchId} supprimé avec succès.` });
        return;
    } catch (error) {
        console.error("Erreur lors de la suppression du match:", error);
        res.status(500).json({ message: "Erreur serveur lors de la suppression." });
        return;
    }
};
