export const extractLastSegment = (url: string) =>
  url.split("/").filter(Boolean).pop();
