import * as bodyParser from "body-parser";
import * as config from "config";
import * as express from "express";
import * as http from "http";
// tslint:disable-next-line:no-duplicate-imports
import { Request, Response, Express } from "express";
import organizationHandler from "./handler/organization";
import { logger, loggerMiddleware } from "./logger";
import { initDatabase } from "./mongodb";
import initWebsocket from "./websocket";
import { Db } from "mongodb";

function initExpress(): Express {
	const app: Express = express();
	app.use(loggerMiddleware);
	app.use(bodyParser.json());
	app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "http://localhost:3000");
		res.header("Access-Control-Allow-Credentials", "true");
		next();
	});
	app.get("/", (req, res) => {
		logger.info("Server says hello");
		res.send({
			hello: "world"
		});
	});

	const port: number = config.get("app.port");
	app.listen(port, () => {
		logger.info("NODE_ENV", process.env);
		logger.info(`Server listening on port ${port}!`);
	});

	return app;
}

async function startApplication(): Promise<void> {

	const express: Express = initExpress();
	const server: http.Server = new http.Server(express);
	const mongoClient: Db = await initDatabase();
	initWebsocket(server);

	organizationHandler(express, mongoClient);
}

startApplication();



