import express from "express";
import dotenv from "dotenv";

import logger from "./src/utils/logger";
import connect from "./src/utils/connect";

// dont forget to delete it in produciton
import morgan from "morgan";

import routes from "./src/routes";

dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded());

// SAME
app.use(morgan("dev"))

app.listen(port, async () => {
  //  connect to db
  await connect();
  logger.info(`App is now running in post ${port}`);
  routes(app);
});
