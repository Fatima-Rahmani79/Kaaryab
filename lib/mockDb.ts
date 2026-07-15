import fs from "fs";
import path from "path";
import { Opportunity } from "@/types";

const DB_PATH = path.join(process.cwd(), "data", "opportunities.json");

function readDb(): Opportunity[] {
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeDb(data: Opportunity[]) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export function getAllOpportunities(): Opportunity[] {
  return readDb();
}

export function getOpportunityById(id: string): Opportunity | undefined {
  return readDb().find((o) => o.id === id);
}

export function createOpportunity(
  data: Omit<Opportunity, "id" | "createdAt">,
): Opportunity {
  const db = readDb();
  const newOpportunity: Opportunity = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  writeDb([newOpportunity, ...db]);
  return newOpportunity;
}

export function updateOpportunity(
  id: string,
  updates: Partial<Opportunity>,
): Opportunity | null {
  const db = readDb();
  const index = db.findIndex((o) => o.id === id);
  if (index === -1) return null;
  db[index] = { ...db[index], ...updates };
  writeDb(db);
  return db[index];
}

export function deleteOpportunity(id: string): boolean {
  const db = readDb();
  const exists = db.some((o) => o.id === id);
  writeDb(db.filter((o) => o.id !== id));
  return exists;
}
