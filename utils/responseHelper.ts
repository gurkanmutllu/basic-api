import { NextApiResponse } from "next";

export const sendResponse = <T>(
  res: NextApiResponse,
  status: number,
  data: T | null,
  message = ""
): void => {
  res.status(status).json({ success: status < 400, message, data });
};
