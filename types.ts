
export type QuestionType = 'multiple-choice';

export interface Question {
  id: string;
  level: number;
  type: QuestionType;
  questionText: string | React.ReactNode;
  options?: string[];
  correctAnswer: string;
}

export interface StudentInfo {
  campus: string;
  firstName: string;
  lastName: string;
}

export type UserAnswer = string | null;

export interface Attempt {
  level: number;
  attemptNumber: number;
  startTime: Date;
  endTime: Date;
  score: number;
  answers: { [questionId: string]: UserAnswer };
  questions: Question[];
  passed: boolean;
  durationInSeconds: number;
  skipped?: boolean;
  timeUp?: boolean;
}

export type GameState = 'welcome' | 'info' | 'quiz' | 'results' | 'end';

export const Campuses = [
  'Aarschot',
  'Genk',
  'Hamont-Achel',
  'Hasselt',
  'Herk-de-Stad',
  'Houthalen-Helchteren',
  'Kortenberg',
  'Leuven - Centrum',
  'Leuven - Kessel-Lo',
  'Maaseik',
  'Maasmechelen - Eisden',
  'Peer',
  'Pelt',
  'Sint-Truiden',
  'Tienen',
  'Tongeren - Borgloon'
];