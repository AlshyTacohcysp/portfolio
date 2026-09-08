import clsx, { type ClassValue } from "clsx";

/** Compact class-name joiner. */
export function cx(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** "01", "02"… */
export function pad2(n: number) {
  return String(n).padStart(2, "0");
}

/** Shared page container */
export const CONTAINER = "mx-auto w-full max-w-[1440px] px-5 md:px-10";

