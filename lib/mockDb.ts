import { opportunities as seedData } from "@/data/opportunities";
import { Opportunity } from "@/types";

declare global {
  // eslint-disable-next-line no-var
  var __kaaryab_db: Opportunity[] | undefined;
}

function getDb(): Opportunity[] {
  if (!global.__kaaryab_db) {
    global.__kaaryab_db = [...seedData];
  }
  return global.__kaaryab_db;
}

export function getAllOpportunities(): Opportunity[] {
  return getDb();
}

export function getOpportunityById(id: string): Opportunity | undefined {
  return getDb().find((o) => o.id === id);
}

export function createOpportunity(
  data: Omit<Opportunity, "id" | "createdAt">,
): Opportunity {
  const newOpportunity: Opportunity = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  global.__kaaryab_db = [newOpportunity, ...getDb()];
  return newOpportunity;
}

export function updateOpportunity(
  id: string,
  updates: Partial<Opportunity>,
): Opportunity | null {
  const db = getDb();
  const index = db.findIndex((o) => o.id === id);
  if (index === -1) return null;
  db[index] = { ...db[index], ...updates };
  return db[index];
}

export function deleteOpportunity(id: string): boolean {
  const db = getDb();
  const exists = db.some((o) => o.id === id);
  global.__kaaryab_db = db.filter((o) => o.id !== id);
  return exists;
}
