import { JAVA_IMG } from "../utils/constants";
import createContainer from "./dockerFactory";
import decodeDockerStream from "./dockerHelper";
async function runJava(code: string, inputTestCase: string) {
  const rawLogBuffer: Buffer[] = [];
  console.log("Initialising a new Java docker container");
  const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > Main.java && javac Main.java && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | java Main`;
  console.log(runCommand);
  // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['python3', '-c', code, 'stty -echo']);
  const javaDockerContainer = await createContainer(JAVA_IMG, [
    "/bin/sh",
    "-c",
    runCommand,
  ]);
  // starting / booting the corresponding docker container
  await javaDockerContainer.start();
  console.log("Started the docker container");
  const loggerStream = await javaDockerContainer.logs({
    stdout: true,
    stderr: true,
    timestamps: false,
    follow: true, // whether the logs are streamed or returned as a string
  });

  // Attach events on the stream objects to start and stop reading
  loggerStream.on("data", (chunk) => {
    rawLogBuffer.push(chunk);
  });

  await new Promise((res) => {
    loggerStream.on("end", () => {
      console.log(rawLogBuffer);
      const completeBuffer = Buffer.concat(rawLogBuffer);
      const decodedStream = decodeDockerStream(completeBuffer);
      console.log(decodedStream);
      console.log(decodedStream.stdout);
      res(decodeDockerStream);
    });
  });

  // remove the container when done with it
  await javaDockerContainer.remove();

  return javaDockerContainer;
}

export default runJava;
