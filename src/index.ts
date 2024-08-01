import express, { Express } from "express";

import bullBoardAdapter from "./config/bullBoardConfig";
import serverConfig from "./config/serverConfig";
import sampleQueueProducer from "./producers/sampleQueueProducer";
import apiRouter from "./routes";
import SampleWorker from "./workers/sampleWorker";
const app: Express = express();
app.use("/api", apiRouter);
app.use("/ui", bullBoardAdapter.getRouter());
app.listen(serverConfig.PORT, () => {
  console.log(`server is running on port ${serverConfig.PORT}`);
  console.log(
    `BullBoard DashBoard Running on http//localhost:${serverConfig.PORT}/ui`,
  );
  SampleWorker("SampleQueue");
  sampleQueueProducer(
    "SampleJob",
    {
      name: "Milan Bohra",
      company: "Google",
      location: "Remote",
      position: "PM 3",
    },
    2,
  );
  sampleQueueProducer(
    "SampleJob",
    {
      name: "Jay Bohra",
      company: "Google",
      location: "Remote",
      position: "SDE 3",
    },
    1,
  );
});
