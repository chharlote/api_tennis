// src/data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Player } from "./entities/player";
import {Ranking} from "./entities/ranking";
import {Match} from "./entities/match";
import {Tourney} from "./entities/tourney";
import {StatPlayer} from "./entities/statPlayer";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "62.72.18.63",
    port: 11029,
    username: "sae4_g9",
    password: "LA2X?b9EzJpm!g3Np#EG",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [Player, Ranking, Tourney, Match, StatPlayer],
});
