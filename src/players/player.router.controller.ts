// src/controllers/player.controller.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Player } from "../entities/player";

const playerRepo = AppDataSource.getRepository(Player);

export const getPlayers = async (req: Request, res: Response) => {
    try {
        const { hand, country, rank } = req.query;

        const filters: any = {};

        if (hand) filters.hand = hand;
        if (country) filters.countryCode = country;

        const players = await playerRepo.find({
            where: filters,
        });

        if (players.length === 0) {
            res.status(404).json({ message: "Aucun joueur trouvé." });
            return
        }

        res.status(200).json(players);  // Retourner les joueurs trouvés
    } catch (error) {
        console.error("Erreur lors de la récupération des joueurs:", error);
        res.status(500).json({ message: "Une erreur est survenue lors de la récupération des joueurs." });
        return
    }
};


export const getPlayer = async (req: Request, res: Response) => {
    try {
        const { playerId } = req.params;


        const player = await playerRepo.findOne({
            where: { idPlayer: Number(playerId) },
        });

        if (player) {
            res.status(200).send(player);
        } else {
            res.status(404).send({ message: `Joueur ${playerId} introuvable` });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du joueur:", error);
        res.status(500).send({ message: "Une erreur est survenue lors de la récupération du joueur." });
    }
};

export const createPlayer = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, hand, countryCode } = req.body;

        const newPlayer = playerRepo.create({
            firstName,
            lastName,
            hand,
            countryCode
        });

        await playerRepo.save(newPlayer);

        res.status(201).json(newPlayer);
    } catch (error) {
        console.error("Erreur lors de la création du joueur:", error);
        res.status(500).json({ message: "Erreur serveur lors de la création." });
    }
};

export const patchPlayer = async (req: Request, res: Response) => {
    try {
        const { playerId } = req.params;
        const { firstName, lastName, hand, countryCode } = req.body;

        const player = await playerRepo.findOne({ where: { idPlayer: Number(playerId) } });

        if (!player) {
            res.status(404).json({ message: `Joueur avec l'ID ${playerId} non trouvé.` });
            return
        }

        if (firstName) player.firstName = firstName;
        if (lastName) player.lastName = lastName;
        if (hand) player.hand = hand;
        if (countryCode) player.countryCode = countryCode;

        await playerRepo.save(player);

        res.status(200).json(player);
        return
    } catch (error) {
        console.error("Erreur lors de la mise à jour du joueur:", error);
        res.status(500).json({ message: "Erreur serveur lors de la mise à jour." });
        return
    }
};


export const deletePlayer = async (req: Request, res: Response) => {
    try {
        const { playerId } = req.params;

        const player = await playerRepo.findOne({ where: { idPlayer: Number(playerId) } });

        if (!player) {
            res.status(404).json({ message: `Joueur avec l'ID ${playerId} non trouvé.` });
            return
        }

        await playerRepo.remove(player);

        res.status(200).json({ message: `Joueur ${playerId} supprimé avec succès.` });
        return
    } catch (error) {
        console.error("Erreur lors de la suppression du joueur:", error);
        res.status(500).json({ message: "Erreur serveur lors de la suppression." });
        return
    }
};