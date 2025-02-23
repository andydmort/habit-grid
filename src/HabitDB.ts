/**
 * HavitDb.ts
 */
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
  addGoal(goalName: string): Promise<void>;
  removeGoal(goalName: string): Promise<void>;
  getGoals(goalname: string): Promise<string[]>;
}
