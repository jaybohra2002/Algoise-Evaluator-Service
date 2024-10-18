import { Job, Worker } from "bullmq";

import redisConnection from "../config/redisConfig";
import SubmissionJob from "../jobs/submissionJob";

export default function SubmissionWorker(queueName: string) {
  new Worker(
    queueName,
    async (job: Job) => {
      console.log("SubmissionJob job worker kicking");
      if (job.name === "SubmissionJob") {
        console.log(job.data, job.name);
        const submissionJobInstance = new SubmissionJob(job.data);

        submissionJobInstance.handle(job);

        return true;
      }
    },
    {
      connection: redisConnection,
    },
  );
}
