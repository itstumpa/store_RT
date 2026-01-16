

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

// const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
//   res.status(data.statusCode).json({
//     success: data.success,
//     message: data.message,
//     meta: data.meta || null || undefined,
//     data: data.data || null || undefined,
//   });
// };

// export default sendResponse;

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