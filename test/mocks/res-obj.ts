import { Response } from "express";
import { createMock, DeepMocked } from "@golevelup/ts-jest";

export const mockResObj = (): DeepMocked<
  Response<any, Record<string, any>>
> => {
  return createMock<Response>({
    json: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
    cookie: jest.fn().mockReturnThis(),
  });
};
