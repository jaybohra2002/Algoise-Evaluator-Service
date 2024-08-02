import { Request, Response } from "express";

import { createSubmissionDto } from "../dtos/createSubmissionDto";
export function addSubmission(req: Request, res: Response) {
  //TODO: Add validation using zod
  const submissionDto = req.body as createSubmissionDto;
  console.log(req.body);
  return res.status(201).json({
    success: true,
    error: {},
    message: "Successfully collected the submission ",
    data: submissionDto,
  });
}
