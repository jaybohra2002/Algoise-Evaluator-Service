import { Job } from "bullmq";

import { IJob } from "../types/bullMqJobDefinition";

export default class SampleJob implements IJob {
  payload: Record<string, unknown>;
  name: string;
  constructor(payload: Record<string, unknown>) {
    this.payload = payload;
    this.name = this.constructor.name;
  }
  handle = (job?: Job) => {
    console.log("Insode Job handle");
    if (job) {
      console.log(job.data, job.name, job.id);
      console.log("Payload is : ", this.payload);
    }
  };
  failed = (job?: Job) => {
    console.log("Insode Failed Job ");
    if (job) {
      console.log(job.id);
    }
  };
}
