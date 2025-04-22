import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isNumericString(str: string) {
  // This regular expression checks if the string contains only digits (0-9)
  const regex = /^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/;
  return regex.test(str);
}

export function convertToNumObjProps(data: { [k: string]: string }) {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      // Convert to number if it's a numeric string, otherwise keep original value
      return [key, !isNumericString(value) ? value : Number(value)];
    })
  );
}
