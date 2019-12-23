import * as dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import Express from "express";
import { createConnection } from "typeorm";
import startApollo from './apollo'


const app = Express();
const PORT = process.env.PORT || 4000;
const main = async () => {
  await createConnection();
  return app.listen(PORT);
};

main().then(() => startApollo(app)).then(() =>
  console.log(
      `🚀 Server ready at http://localhost:${PORT}`
  )
);

export default main;