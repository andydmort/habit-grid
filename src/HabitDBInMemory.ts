/**
 * HabitDBInMemory.ts
 */
import type { HabitDB, HabitRecord } from "./HabitDB";


export class HabitDBInMemory implements HabitDB {
  private records: Map<string, HabitRecord>;
  private goals: Set<string>;
  private onChangeHandlers: Array<Function> = [];

  constructor() {
    this.records = new Map();
    this.goals = new Set();
  }

  removeOnDbChange(func: Function): void {
    this.onChangeHandlers = this.onChangeHandlers.filter((f) =>{
      return f !== func;
    });
  }

  private runOnChangeHandlers(){
    this.onChangeHandlers.forEach((func)=>{func();});
  }

  addOnDbChange(func: Function): void {
    this.onChangeHandlers.push(func);
  }

  // Add or update a habit record
  async addRecord(record: HabitRecord): Promise<void> {
    this.records.set(record.date, record);
    this.runOnChangeHandlers();
  }

  // Retrieve a record for a specific date
  async getRecordByDate(date: string): Promise<HabitRecord | null> {
    return this.records.get(date) || null;
  }

  // Retrieve records within a date range
  async getRecordsByDateRange(startDate: string, endDate: string): Promise<HabitRecord[]> {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    return Array.from(this.records.values()).filter(record => {
      const recordDate = new Date(record.date).getTime();
      return recordDate >= start && recordDate <= end;
    });
  }

  async addGoal(goalName: string): Promise<void> {
    if (!this.goals.has(goalName)) {
      this.goals.add(goalName);
      this.runOnChangeHandlers();
    }
  }

  async removeGoal(goalName: string): Promise<void> {
    if (this.goals.has(goalName)) {
      this.goals.delete(goalName);
      this.runOnChangeHandlers();
    }
  }

  async getGoals(): Promise<string[]> {
    return Array.from(this.goals);
  }
}
