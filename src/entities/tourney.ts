import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Match } from "./match";

@Entity("tourneys")
export class Tourney {
    @PrimaryColumn({ name: "id_tourney", type: "text" })
    idTourney!: string;

    @Column({ name: "tourney_name", type: "text", nullable: true })
    tourneyName?: string;

    @Column({ name: "tourney_level", type: "text", nullable: true })
    tourneyLevel?: string;

    @Column({ name: "tourney_date", type: "date", nullable: true })
    tourneyDate?: string;

    @Column({ name: "draw_size", type: "int", nullable: true })
    drawSize?: number;

    @Column({ name: "surface", type: "text", nullable: true })
    surface?: string;

    @OneToMany(() => Match, match => match.tourney)
    matches!: Match[];
}
