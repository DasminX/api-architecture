import { ZodIssue } from "zod";

export const formatZodErrorIssues = (issues: ZodIssue[]) => {
  return issues
    .reduce<string[]>((acc, issue) => {
      const key = issue.path.join(".");
      return [
        ...acc,
        `${key} ${key ? "field:" : ""} ${issue.message.toLowerCase()}`.trim(),
      ];
    }, [])
    .join(", ");
};
