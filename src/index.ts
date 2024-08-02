import bodyParser from "body-parser";
import express, { Express } from "express";

//import bullBoardAdapter from "./config/bullBoardConfig";
import serverConfig from "./config/serverConfig";
import apiRouter from "./routes";

const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.text());
app.use("/api", apiRouter);
//app.use("/ui", bullBoardAdapter.getRouter());
app.listen(serverConfig.PORT, () => {
  console.log(`server is running on port ${serverConfig.PORT}`);
  console.log(
    `BullBoard DashBoard Running on http//localhost:${serverConfig.PORT}/ui`,
  );
});
