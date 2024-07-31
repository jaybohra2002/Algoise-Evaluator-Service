import express ,{Express}from "express";
const app : Express=express();
import serverConfig from "./config/serverConfig";

app.listen(serverConfig.PORT,()=>{
    console.log(`server is running on port ${serverConfig.PORT}`);
})