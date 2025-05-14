import express from "express";
import yaml from "yaml";
import fs from "fs";
import * as path from "node:path";
import { AppDataSource } from "./src/data-source";
import playerRoutes from "./src/players/player.router";

import swaggerUi from "swagger-ui-express";
import matchRouter from "./src/matches/match.router";
import rankingRouter from "./src/rankings/ranking.router";
import tourneyRouter from "./src/tourneys/tourney.router";
import statPlayerRouter from "./src/statPlayers/statPlayer.router";



const file = fs.readFileSync(path.join(__dirname, "./src/swagger.yaml"), "utf8");
const swaggerDocument = yaml.parse(file);

const app = express();
const PORT = 11049;


app.use(express.json());

app.use("/players", playerRoutes);
app.use("/matches", matchRouter);
app.use("/rankings", rankingRouter);
app.use("/tourneys", tourneyRouter);
app.use("/statPlayers", statPlayerRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

AppDataSource.initialize()
    .then(() => {
        console.log("DB connectée");
        app.listen(PORT, () => {
            console.log(`Serveur lancé sur http://node01.nonov.fr:${PORT}`);
            console.log(`Swagger dispo : http://node01.nonov.fr:${PORT}/api-docs`);
        });
    })
    .catch((error) => console.error("Erreur de connexion BDD", error));
