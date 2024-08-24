import { CPP_IMG } from "../utils/constants";
import createContainer from "./dockerFactory";
import decodeDockerStream from "./dockerHelper";
import pullImage from "./pullImage";
async function runCpp(code: string, inputTestCase: string) {
  const rawLogBuffer: Buffer[] = [];
  console.log("Initialising a new CPP docker container");
  await pullImage(CPP_IMG);
  const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | stdbuf -oL -eL ./main`;
  console.log(runCommand);
  // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['python3', '-c', code, 'stty -echo']);
  const cppDockerContainer = await createContainer(CPP_IMG, [
    "/bin/sh",
    "-c",
    runCommand,
  ]);
  // starting / booting the corresponding docker container
  await cppDockerContainer.start();
  console.log("Started the docker container");
  const loggerStream = await cppDockerContainer.logs({
    stdout: true,
    stderr: true,
    timestamps: false,
    follow: true, // whether the logs are streamed or returned as a string
  });

  // Attach events on the stream objects to start and stop reading
  loggerStream.on("data", (chunk) => {
    rawLogBuffer.push(chunk);
  });

  const response = await new Promise((res) => {
    loggerStream.on("end", () => {
      console.log(rawLogBuffer);
      const completeBuffer = Buffer.concat(rawLogBuffer);
      const decodedStream = decodeDockerStream(completeBuffer);
      console.log(decodedStream);
      console.log(decodedStream.stdout);
      res(decodedStream);
    });
  });

  // remove the container when done with it
  await cppDockerContainer.remove();
  return response;

  return cppDockerContainer;
}

export default runCpp;
