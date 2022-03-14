import { app } from "./app";
import http from "http";
import { config } from "./config";
import { logger } from "./utils";
import cluster from "cluster";
import os from "os";

const numCPUs = os.cpus().length;

if (!cluster.isWorker) {
  logger.info(`number of CPUs: ${numCPUs}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster
    .on("online", (worker) => {
      logger.info(`worker_id: ${worker.id} PID: ${worker.process.pid}`);
    })
    .on("exit", (worker) => {
      logger.info(`worker_id: ${worker.id} PID: ${worker.process.pid} exited`);
      logger.info(`new woker forked`);
      cluster.fork();
    });
} else {
  const server = http.createServer(app);

  server
    .listen(config.port, () => {
      logger.info(`listening on port ${config.port}`);
    })
    .on("error", (err) => {
      logger.error(`server failed: ${err}`);
    });
}
