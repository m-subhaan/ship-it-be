import winston from "winston";

import {SERVER_CONFIG} from "@appUtils/Constants";

const logFormat = winston.format.printf(({level, message, label, timestamp}) => {
    return `----------------------------------\n${timestamp} ${label} ${level}: ${message}\n----------------------------------\n`;
});

const Logger = winston.createLogger({
    level: "debug",
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.label({label: SERVER_CONFIG.NODE_ENV.toUpperCase()}),
                winston.format.colorize({all: true}),
                winston.format.simple(),
                logFormat
            )
        })
    ],
    exitOnError: false
});

export default Logger;
