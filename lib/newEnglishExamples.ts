export type NewEnglishExample = {
  id: string;
  expression: string;
  meaning: string;
  standardEnglish: string;
  pattern: string;
};

export const newEnglishExamples: NewEnglishExample[] = [
  {
    id: "people-mountain-people-sea",
    expression: "people mountain people sea",
    meaning: "a huge crowd",
    standardEnglish: "The place was packed with people.",
    pattern: "Build the image first, then let meaning arrive instantly.",
  },
  {
    id: "long-time-no-see",
    expression: "long time no see",
    meaning: "we have not met for a long time",
    standardEnglish: "I have not seen you in a long time.",
    pattern: "Remove grammar weight, keep the time and action.",
  },
  {
    id: "add-oil",
    expression: "add oil",
    meaning: "keep going; give it more energy",
    standardEnglish: "Keep going. You can do it.",
    pattern: "Use a physical action as emotional fuel.",
  },
  {
    id: "no-zuo-no-die",
    expression: "no zuo no die",
    meaning: "do not invite trouble and trouble will not come",
    standardEnglish: "If you do not mess around, you will not get burned.",
    pattern: "Turn cause and result into a short warning.",
  },
  {
    id: "good-good-study",
    expression: "good good study, day day up",
    meaning: "study hard and improve every day",
    standardEnglish: "Study hard and make progress every day.",
    pattern: "Repeat simple words to create rhythm and memory.",
  },
  {
    id: "eat-bitter",
    expression: "eat bitter",
    meaning: "endure hardship",
    standardEnglish: "Push through something hard.",
    pattern: "Make an abstract struggle feel physical.",
  },
  {
    id: "open-door-see-mountain",
    expression: "open the door, see the mountain",
    meaning: "get straight to the point",
    standardEnglish: "Say the main point directly.",
    pattern: "Use a clear picture to remove polite fog.",
  },
  {
    id: "lose-face",
    expression: "lose face",
    meaning: "lose public respect",
    standardEnglish: "Feel publicly embarrassed or disrespected.",
    pattern: "Turn social status into a visible object.",
  },
];
