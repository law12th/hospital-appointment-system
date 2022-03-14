import morgan, { StreamOptions } from "morgan";
import { logger } from "./logger";

const stream: StreamOptions = {
  write: (message) => logger.http(message),
};

const format = ":method :url :status :res[content-length] - :response-time ms";

const requestLogger = morgan(format, { stream });

export { requestLogger };
