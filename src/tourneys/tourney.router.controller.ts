import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Tourney } from '../entities/tourney';

const tourneyRepo = AppDataSource.getRepository(Tourney);

// Récupération des tournois
export const getTourneys = async (req: Request, res: Response) => {
    try {
        const { draw_size, surface, tourney_level } = req.query;

        const where: any = {};

        if (draw_size) where.drawSize = Number(draw_size);
        if (surface) where.surface = String(surface);
        if (tourney_level) where.tourneyLevel = String(tourney_level);

        const tourneys = await tourneyRepo.find({ where });

        res.status(200).json(tourneys);
        return;
    } catch (error) {
        console.error('Erreur getTourneys avec filtres :', error);
        res.status(500).json({ message: 'Erreur serveur' });
        return;
    }
};

// Récupération d'un tournoi
export const getTourney = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tourney = await tourneyRepo.findOneBy({ idTourney: id });

        if (!tourney) {
            res.status(404).json({ message: 'Tournoi non trouvé' });
            return;
        }

        res.status(200).json(tourney);
    } catch (error) {
        console.error('Erreur getTourney :', error);
        res.status(500).json({ message: 'Erreur serveur' });
        return;
    }
};

// Création d'un tournoi
export const createTourney = async (req: Request, res: Response) => {
    try {
        const data = tourneyRepo.create(req.body);
        const result = await tourneyRepo.save(data);
        res.status(201).json(result);
        return;
    } catch (error) {
        console.error('Erreur createTourney :', error);
        res.status(400).json({ message: 'Création impossible', error });
        return;
    }
};

// Mise à jour d'un tournoi
export const updateTourney = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tourney = await tourneyRepo.findOneBy({ idTourney: id });

        if (!tourney) {
            res.status(404).json({ message: 'Tournoi non trouvé' });
            return;
        }

        tourneyRepo.merge(tourney, req.body);
        const result = await tourneyRepo.save(tourney);
        res.status(200).json(result);
        return;
    } catch (error) {
        console.error('Erreur updateTourney :', error);
        res.status(500).json({ message: 'Erreur serveur' });
        return;
    }
};

// Suppression d'un tournoi
export const deleteTourney = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await tourneyRepo.delete(id);

        if (result.affected === 0) {
            res.status(404).json({ message: 'Tournoi non trouvé' });
            return;
        }

        res.status(200).json({ message: 'Tournoi supprimé avec succès' });
        return;
    } catch (error) {
        console.error('Erreur deleteTourney :', error);
        res.status(500).json({ message: 'Erreur serveur' });
        return;
    }
};
