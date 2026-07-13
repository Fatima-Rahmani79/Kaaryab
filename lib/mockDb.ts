import { opportunities as seedData } from "@/data/opportunities";
import { Opportunity } from "@/types";

let db: Opportunity[] = [...seedData];

export function getAllOpportunities(): Opportunity[] {
  return db;
}

export function getOpportunityById(id: string): Opportunity | undefined {
  return db.find((o) => o.id === id);
}

export function createOpportunity(
  data: Omit<Opportunity, "id" | "createdAt">,
): Opportunity {
  const newOpportunity: Opportunity = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  db = [newOpportunity, ...db];
  return newOpportunity;
}

export function updateOpportunity(
  id: string,
  updates: Partial<Opportunity>,
): Opportunity | null {
  const index = db.findIndex((o) => o.id === id);
  if (index === -1) return null;
  db[index] = { ...db[index], ...updates };
  return db[index];
}

export function deleteOpportunity(id: string): boolean {
  const exists = db.some((o) => o.id === id);
  db = db.filter((o) => o.id !== id);
  return exists;
}
