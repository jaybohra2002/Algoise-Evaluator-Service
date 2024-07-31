import { Job } from "bullmq";

import { Ijob } from "../types/bullMqJobDefinition";

export default class SampleJob implements Ijob {
  payload: Record<string, unknown>;
  name: string;
  constructor(payload: Record<string, unknown>) {
    this.payload = payload;
    this.name = this.constructor.name;
  }
  handle = () => {
    console.log("Insode Job handle");
  };
  failed = (job?: Job) => {
    console.log("Insode Failed Job ");
    if (job) {
      console.log(job.id);
    }
  };
}
