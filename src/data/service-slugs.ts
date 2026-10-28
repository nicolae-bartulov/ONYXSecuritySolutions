// Service identifiers, in the order of design doc §5. services.ts types each service's `slug` with them.
export const serviceSlugs = [
  "cctv",
  "antifractie",
  "interfonie",
  "control-acces",
  "automatizari-porti",
  "service-mentenanta",
  "consultanta",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];
