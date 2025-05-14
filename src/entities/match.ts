import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Player } from "./player";
import { Tourney } from "./tourney";

@Entity("matches")
export class Match {
    @PrimaryColumn({ name: "match_num", type: "int" })
    matchNum!: number;

    @PrimaryColumn({ name: "tourney_id", type: "text" })
    tourneyId!: string;

    @Column({ type: "text", nullable: true })
    score?: string;

    @ManyToOne(() => Tourney, tourney => tourney.matches, { eager: true })
    @JoinColumn({ name: "tourney_id", referencedColumnName: "idTourney" })
    tourney!: Tourney;

    @ManyToOne(() => Player, player => player.idPlayer, { nullable: true })
    @JoinColumn({ name: "winner_id" })
    winner?: Player;

    @ManyToOne(() => Player, player => player.idPlayer, { nullable: true })
    @JoinColumn({ name: "loser_id" })
    loser?: Player;
}
