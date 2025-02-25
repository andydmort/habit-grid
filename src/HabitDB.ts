/**
 * HavitDb.ts
 */


export interface GoalRecord {
  title: string;
  description: string;
  color: string;
}

export interface HabitRecord {
  date: string; // ISO format
  achievedGoals: string[]; // List of goals achieved on this day
}

export interface HabitDB {
  removeOnDbChange(func: Function): void;
  addRecord(record: HabitRecord): Promise<void>;
  getRecordByDate(date: string): Promise<HabitRecord | null>;
  getRecordsByDateRange(startDate: string, endDate: string): Promise<HabitRecord[]>;
  addOnDbChange(func: Function): void;

  addOrEditGoal(goal: GoalRecord): Promise<void>;
  removeGoal(goalTitle: string): Promise<void>;
  getGoals(): Promise<GoalRecord[]>;
}