import sampleQueue from "../queue/sampleQueue";
export default async function (name: string, payload: Record<string, unknown>) {
  console.log("Successfully added a new job");
  await sampleQueue.add(name, payload);
}
