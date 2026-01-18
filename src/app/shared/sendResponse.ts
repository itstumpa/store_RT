

import { Response } from 'express';

interface IApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T | null | undefined;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export const sendResponse = (
  res: Response,
  {
    statusCode,
    success,
    message,
    data,
    meta,
  }: {
    statusCode: number;
    success: boolean;
    message?: string;
    data?: any;
    meta?: any;
  }
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
    meta,
  });
};

export default sendResponse;