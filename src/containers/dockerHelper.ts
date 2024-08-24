import DockerStreamOutput from "../types/dockerStreamOutput";
import { DOCKER_STREAM_HEADER_SIZE } from "../utils/constants";
export default function decodeDockerStream(buffer: Buffer): DockerStreamOutput {
  // it is the object where we will store the buffer decioded data and return it
  const output: DockerStreamOutput = { stdout: "", stderr: "" };
  // offset is like cursor for the chunk of data
  let offset = 0;
  //iterating over the buffer data
  while (offset < buffer.length) {
    const type_of_stream = buffer[offset]; // reading the type of stream from the first four bytes of the header of chunk
    const length = buffer.readUInt32BE(offset + 4); // reading the length of data from the next 4 bytes of the header of chunk
    offset += DOCKER_STREAM_HEADER_SIZE; // taking the offset to the value of the data by surpassing the length of the header
    if (type_of_stream === 1) {
      output.stdout += buffer.toString("utf-8", offset, offset + length); // if is 1 then convert in string and store it
    }
    if (type_of_stream === 2) {
      output.stderr += buffer.toString("utf-8", offset, offset + length); // if it is 2 then conver in string and store in stderr
    }
    offset += length; // taking offset on the next chunk of buffer data.
  }
  return output; // returning the output
}
