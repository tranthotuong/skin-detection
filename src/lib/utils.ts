import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a given date to the specified format.
 * @param date - The date to format (can be a Date object or string).
 * @param dateFormat - The format string (e.g., 'yyyy-MM-dd', 'dd/MM/yyyy').
 * @returns The formatted date as a string.
 */
export const datePipe = (date: Date | string, dateFormat: string = 'yyyy-MM-dd'): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  return format(parsedDate, dateFormat);
};