import type { HabitDB, HabitRecord } from "./HabitDB";


export class HabitDBInMemory implements HabitDB {
  private records: Map<string, HabitRecord>;

  constructor() {
    this.records = new Map();
  }

  // Add or update a habit record
  async addRecord(record: HabitRecord): Promise<void> {
    this.records.set(record.date, record);
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
}
