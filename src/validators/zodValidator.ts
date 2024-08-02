/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validate =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any


    (schema: ZodSchema<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log(req.body);
        schema.parse({ ...req.body });
        next();
      } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          message: "bad request paramaters",
          error: error,
          data: {},
        });
      }
    };
