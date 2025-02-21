export interface HabitRecord {
  date: string; // ISO format
  achievedGoals: string[]; // List of goals achieved on this day
}

export interface HabitDB {
  addRecord(record: HabitRecord): Promise<void>;
  getRecordByDate(date: string): Promise<HabitRecord | null>;
  getRecordsByDateRange(startDate: string, endDate: string): Promise<HabitRecord[]>;
}
