export function parseDate(dateString: string): Date {
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) {
    return new Date();
  }
  return parsed;
}
