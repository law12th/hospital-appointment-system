import { config } from "../../config";
import * as winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  return config.node_env == "development" ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => {
    return `${info.timestamp} ${info.level} : ${info.message}`;
  })
);

const transports = [
  new winston.transports.Console(),
  new DailyRotateFile({
    filename: ".logs/error-%DATE%.log",
    datePattern: "MM-DD-YYYY",
    level: "error",
  }),
  new DailyRotateFile({
    filename: ".logs/all-%DATE%.log",
    datePattern: "MM-DD-YYYY",
  }),
];

const logger = winston.createLogger({
  level: level(),
  format,
  levels,
  transports,
});

export { logger };
