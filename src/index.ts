import * as bodyParser from "body-parser";
import * as config from "config";
import * as express from "express";
import { logger, loggerMiddleware } from "./logger";

const app: express.Express = express();

app.use(loggerMiddleware);
app.use(bodyParser.urlencoded({ extended: false }));
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
	// logger.info("NODE_ENV", process.env);
	logger.info(`Server listening on port ${port}!`);
});

process.on("SIGINT", () => {
	logger.info("Server received SIGINT");
});
process.on("SIGTERM", () => {
	logger.info("Server received SIGTERM");
});
