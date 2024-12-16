import fs from "fs";
import path from "path";

const getFilePath = (fileName: string): string => path.join(process.cwd(), "data", fileName);

export const readFile = <T>(fileName: string): T[] => {
  const filePath = getFilePath(fileName);
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data) as T[];
};

export const writeFile = <T>(fileName: string, data: T[]): void => {
  const filePath = getFilePath(fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};
