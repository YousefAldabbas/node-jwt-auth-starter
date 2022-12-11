import mongoose from "mongoose";
import logger from "./logger";

async function connect() {
  try {
    await mongoose.connect(process.env.dbUri);
    logger.info("Connected to DB successfully");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}


export default connect
