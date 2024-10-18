import bodyParser from "body-parser";
import express, { Express } from "express";

import bullBoardAdapter from "./config/bullBoardConfig";
import serverConfig from "./config/serverConfig";
import apiRouter from "./routes";
import { submission_queue } from "./utils/constants";
import SampleWorker from "./workers/sampleWorker";
import SubmissionWorker from "./workers/submissionWorker";
const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.text());
app.use("/api", apiRouter);
app.use("/ui", bullBoardAdapter.getRouter());
app.listen(serverConfig.PORT, () => {
  console.log(`server is running on port ${serverConfig.PORT}`);
  console.log(
    `BullBoard DashBoard Running on http//localhost:${serverConfig.PORT}/ui`,
  );
  SampleWorker("Sample Queue");
  SubmissionWorker(submission_queue);
//   const userCode = `
  
//     class Solution {
//       public:
//       vector<int> permute() {
//           vector<int> v;
//           v.push_back(10);
//           return v;
//       }
//     };
//   `;
//   const code = `
//   #include<iostream>
//   #include<vector>
//   #include<stdio.h>
//   using namespace std;
  
//   ${userCode}
//   int main() {
//     Solution s;
//     vector<int> result = s.permute();
//     for(int x : result) {
//       cout<<x<<" ";
//     }
//     cout<<endl;
//     return 0;
//   }
//   `;

//   const inputCase = `10
// `;
//   submissionQueueProducer({
//     "1234": {
//       language: "CPP",
//       inputCase,
//       code,
//     },
//   });

//   runCpp(code, inputCase);
});
