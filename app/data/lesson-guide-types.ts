export type LessonGuideTerm = {
  term: string;
  meaning: string;
};

export type LessonGuideWalkthrough = {
  title: string;
  steps: string[];
};

export type LessonGuide = {
  plainEnglish: string;
  terms?: LessonGuideTerm[];
  walkthrough?: LessonGuideWalkthrough;
  checkpoint: {
    prompt: string;
    answer: string;
  };
};
