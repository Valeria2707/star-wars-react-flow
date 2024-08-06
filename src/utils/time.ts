import { format, parseISO } from "date-fns";

export function formatDate(isoDate: string): string {
  const parsedDate = parseISO(isoDate);
  return format(parsedDate, "dd MMMM yyyy");
}
