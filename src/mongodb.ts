import * as config from "config";
import { MongoClient, MongoClientOptions,Db } from "mongodb";
import { logger } from "./logger";

interface AwesomeClientOptions extends MongoClientOptions {
	useNewUrlParser: boolean;
}
const DB_NAME: string = "teamdecision";

export async function initDatabase(): Promise<Db> {
	const connectUrl: string = config.get("mongodb.url");
	const username: string = config.get("mongodb.username");
	const password: string = config.get("mongodb.password");

	const options: AwesomeClientOptions = {
		logger,
		appname: "teamdecision",
		useNewUrlParser: true,
		auth: {
			user: username,
			password
		}
	};
	const client: MongoClient = await MongoClient.connect(connectUrl, options);
	return client.db(DB_NAME);
}
