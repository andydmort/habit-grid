import type { HabitDB, HabitRecord } from "./HabitDB";

export class HabitDBBrowserStorage implements HabitDB {
  private storageKey = "habit-tracker-data";
  private goalsKey = "habit-tracker-goals";
  private onChangeHandlers: Array<Function> = [];


  constructor() {
    // Initialize storage if not present
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  private runOnChangeHandlers(){
    this.onChangeHandlers.forEach((func)=>{func();});
  }

  addOnDbChange(func: Function): void {
    this.onChangeHandlers.push(func);
  }

  // Load all records from LocalStorage
  private loadRecords(): HabitRecord[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Save all records to LocalStorage
  private saveRecords(records: HabitRecord[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(records));
  }

  // Add or update a habit record
  async addRecord(record: HabitRecord): Promise<void> {
    const records = this.loadRecords();
    const index = records.findIndex((r) => r.date === record.date);

    if (index !== -1) {
      records[index] = record; // Update existing record
    } else {
      records.push(record); // Add new record
    }

    this.saveRecords(records);
    this.runOnChangeHandlers();
  }

  // Get record for a specific date
  async getRecordByDate(date: string): Promise<HabitRecord | null> {
    const records = this.loadRecords();
    return records.find((r) => r.date === date) || null;
  }

  // Get records within a date range
  async getRecordsByDateRange(startDate: string, endDate: string): Promise<HabitRecord[]> {
    const records = this.loadRecords();
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    return records.filter((record) => {
      const recordDate = new Date(record.date).getTime();
      return recordDate >= start && recordDate <= end;
    });
  }

  // Remove a record by date
  removeRecordByDate(date: string): void {
    let records = this.loadRecords();
    records = records.filter((r) => r.date !== date);
    this.saveRecords(records);
    this.runOnChangeHandlers();
  }

  // Clear all records (useful for debugging/reset)
  clearAllRecords(): void {
    localStorage.removeItem(this.storageKey);
  }

  async addGoal(goalName: string): Promise<void> {
    let goals = JSON.parse(localStorage.getItem(this.goalsKey) || "[]");
    if (!goals.includes(goalName)) {
      goals.push(goalName);
      localStorage.setItem(this.goalsKey, JSON.stringify(goals));
      this.runOnChangeHandlers();
    }
  }

  async removeGoal(goalName: string): Promise<void> {
    let goals = JSON.parse(localStorage.getItem(this.goalsKey) || "[]");
    goals = goals.filter((goal: string) => goal !== goalName);
    localStorage.setItem(this.goalsKey, JSON.stringify(goals));
    this.runOnChangeHandlers();
  }

  async getGoals(): Promise<string[]> {
    return JSON.parse(localStorage.getItem(this.goalsKey) || "[]");
  }
  
}
