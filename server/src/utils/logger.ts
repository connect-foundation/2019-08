import winston from "winston";
import { createLogger, format, transports } from "winston";

const options: winston.LoggerOptions = {
  level: "info",
  format: format.json(),
  transports: [
    new transports.File({ filename: "combined.log" }),
    new transports.File({ filename: "error.log", level: "error" })
  ]
};

const logger = createLogger(options);

if (process.env.NODE_ENV !== "production") {
  logger.add(new transports.Console({ format: format.simple() }));
}

export default logger;
