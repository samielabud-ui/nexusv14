
export interface Question {
  id: string;
  ciclo: string;
  modalidade: string;
  modulo: string;
  tema: string;
  problema: number;
  enunciado: string;
  alternativas: string[];
  gabarito: number;
}

export interface VideoLesson {
  id: string;
  title: string;
}

export interface LastWatched {
  lessonId: string;
  lessonTitle: string;
  courseName: string;
  platformId: string;
}

export interface ActivityItem {
  id: string;
  type: 'aula' | 'questoes' | 'apostila';
  title: string;
  subtitle: string;
  timestamp: Date;
  metadata?: any;
}

export interface UserStats {
  displayName: string;
  totalAnswered: number;
  totalCorrect: number;
  totalErrors: number;
  streak: number;
  points: number;
  ciclo: string;
  isPremium: boolean;
  plan: 'basic' | 'premium';
  dailyUsage: number;
  lastDailyReset?: string;
  watchedLessons?: string[];
  lastWatched?: LastWatched;
  recentActivity?: ActivityItem[];
  weakestTheme?: {
    theme: string;
    errorCount: number;
    moduleId?: number;
  };
}
