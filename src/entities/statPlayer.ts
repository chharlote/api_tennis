import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Player } from './player'; // Assurez-vous d'importer l'entité Player
import { Ranking } from './ranking'; // Assurez-vous d'importer l'entité Ranking

@Entity('stat_player')
export class StatPlayer {
    @PrimaryGeneratedColumn({ name: 'id_player' })
    idPlayer!: number;

    @Column({ name: 'matches_played', type: 'int', nullable: true })
    matchesPlayed!: number;

    @Column({ name: 'matches_won', type: 'int', nullable: true })
    matchesWon!: number;

    @Column({ name: 'matches_lost', type: 'int', nullable: true })
    matchesLost!: number;

    @Column({ name: 'win_rate', type: 'double precision', nullable: true })
    winRate!: number;

    @Column({ name: 'total_games', type: 'int', nullable: true })
    totalGames!: number;

    @Column({ name: 'hand', type: 'text', nullable: true })
    hand!: string;

    @Column({ name: 'height', type: 'int', nullable: true })
    height!: number;

    @Column({ name: 'points', type: 'int', nullable: true })
    points!: number;

    @Column({ name: 'forme', type: 'text', nullable: true })
    forme!: string;

}
