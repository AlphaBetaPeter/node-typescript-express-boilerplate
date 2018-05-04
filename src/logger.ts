import { Handler } from "express-serve-static-core";
import *  as expressWinston from "express-winston";
import * as winston from "winston";

const loggerTransports: winston.ConsoleTransportInstance[] =  [
	new winston.transports.Console({
		colorize: true
	})
];

export const loggerMiddleware: Handler = expressWinston.logger({
	colorize: true,
	expressFormat: true,
	transports: loggerTransports
});

export const logger: winston.LoggerInstance = new winston.Logger({
	transports: loggerTransports
});



