import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge class names
 * @param inputs The class names to merge
 * @returns The merged class names
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Formats a file size in bytes into a human-readable string.
 * @param bytes The file size in bytes.
 * @returns A string representing the formatted file size.
 */
export function formatSize(bytes: number): string {
	if (bytes === 0) return "0 Bytes";

	const k = 1024;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

	// Determine the appropriate unit by calculating the log
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	// Format with 2 decimal places and round
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export const generateUUID = () => crypto.randomUUID();
