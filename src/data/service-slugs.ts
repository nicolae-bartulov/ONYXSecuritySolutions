// Service identifiers, kept apart from services.ts so the content config can use them
// without importing the icon components.
export const serviceSlugs = [
  "cctv",
  "antifractie",
  "interfonie",
  "control-acces",
  "automatizari-porti",
  "service-mentenanta",
  "consultanta",
  "proiectare",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];
