import bodyParser from "body-parser";
import express, { Express } from "express";

//import bullBoardAdapter from "./config/bullBoardConfig";
import serverConfig from "./config/serverConfig";
import runPython from "./containers/pythonContainer";
import apiRouter from "./routes";
import SampleWorker from "./workers/sampleWorker";

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
  SampleWorker("Sample Queue");
  const code = `
x = int(input())
for i in range(x):
    print(i)
`;
  runPython(code, "100");
});
