import type { LessonGuide } from "./lesson-guide-types";
import { bonusLessonGuides } from "./lesson-guides-bonus";
import { day1LessonGuides } from "./lesson-guides-day1";
import { day2LessonGuides } from "./lesson-guides-day2";

export type { LessonGuide } from "./lesson-guide-types";

export const lessonGuides: Record<string, LessonGuide> = {
  ...day1LessonGuides,
  ...day2LessonGuides,
  ...bonusLessonGuides,
};

export const lessonGuideKey = (moduleId: string, sectionIndex: number) =>
  `${moduleId}:${sectionIndex}`;
