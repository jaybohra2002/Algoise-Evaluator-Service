import bodyParser from "body-parser";
import express, { Express } from "express";

//import bullBoardAdapter from "./config/bullBoardConfig";
import serverConfig from "./config/serverConfig";
import runCpp from "./containers/cppContainer";
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
  const userCode = `class Solution {
    public:
    string permute (){
        string s="Jay C Bohra";
        return s;
    }
};`;
  const code = `
#include <iostream>
#include <string>
using namespace std;
${userCode}
int main(){
  Solution obj;
  string res=obj.permute();
  cout<<res<<" ";
  cout<<endl;
  for (int i=0;i<res.size();i++){
  cout<<res[i]<<" ";
  }
    return 0;
}
`;
  const inputCase = `10`;
  runCpp(code, inputCase);
});
