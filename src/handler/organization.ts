import { Express, Request, Response, RequestHandler } from "express";
import { Db, Collection, FilterQuery } from "mongodb";
import { logger } from "../logger";
import { IOrganization } from "../types/organization";
import { check, validationResult, Result, body, param } from "express-validator/check";
import * as uuidv4 from "uuid/v4";

const COLLECTION_NAME: string = "organizations";
const STRIP_ID: {} = { fields: { "_id": 0 } };

function requestInvalid(req: Request, res: Response): boolean {
	const errors: Result = validationResult(req);
	const hasErrors: boolean = !errors.isEmpty();
	if (hasErrors) {
		res.status(422).json({ errors: errors.array() });
	}
	return hasErrors;
}

function createOrganizationHandler(collection: Collection): RequestHandler {
	return (req: Request, res: Response): void => {
		const { name } = req.body;
		if (requestInvalid(req, res)) {
			return;
		}

		const org: IOrganization = {
			id: uuidv4(),
			name,
			photoURL: "",
			roles: null
		};

		// Use spread to prevent mongodb from mutating the org and adding _id
		collection.insertOne({ ...org });
		res.send(org);
	};
}

function getOrganizationHandler(collection: Collection): RequestHandler {
	return async (req: Request, res: Response) => {
		const { orgId } = req.params;
		if (requestInvalid(req, res)) {
			return;
		}

		const org: FilterQuery<IOrganization> = await collection.findOne({ orgId }, STRIP_ID);

		res.send(org);
	};
}

export default (app: Express, mongoDb: Db) => {
	const collection: Collection = mongoDb.collection(COLLECTION_NAME);

	app.post(
		"/organizations",
		[body("name").isString()],
		createOrganizationHandler(collection)
	);
	app.get(
		"/organizations/:orgId",
		[param("orgId").isUUID(4)],
		getOrganizationHandler(collection)
	);
};