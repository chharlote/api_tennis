import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { Player } from './player';
import {StatPlayer} from "./statPlayer";  // Assurez-vous d'importer l'entité Player

@Entity('rankings')
export class Ranking {
    @PrimaryGeneratedColumn({ name: 'id_player' })
    idPlayer!: number;

    @Column({ name: 'ranking_date', type: 'date' })
    rankingDate!: string;

    @Column({ name: 'points', type: 'int' })
    points!: number;

    @ManyToOne(() => Player, player => player.idPlayer)
    @JoinColumn({ name: 'id_player' })
    player!: Player;
}
