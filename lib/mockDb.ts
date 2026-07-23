import { supabase } from "@/lib/supabase";
import { Opportunity } from "@/types";

interface OpportunityRow {
  id: string;
  title: string;
  organization: string;
  category: string;
  location: string;
  type: string;
  deadline: string;
  description: string;
  requirements: string[];
  apply_link: string;
  tags: string[];
  created_at: string;
  featured: boolean | null;
}

function rowToOpportunity(row: OpportunityRow): Opportunity {
  return {
    id: row.id,
    title: row.title,
    organization: row.organization,
    category: row.category as Opportunity["category"],
    location: row.location,
    type: row.type as Opportunity["type"],
    deadline: row.deadline,
    description: row.description,
    requirements: row.requirements,
    applyLink: row.apply_link,
    tags: row.tags,
    createdAt: row.created_at,
    featured: row.featured ?? false,
  };
}

export async function getAllOpportunities(): Promise<Opportunity[]> {
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error)
    throw new Error(`Supabase error (getAllOpportunities): ${error.message}`);
  return (data as OpportunityRow[]).map(rowToOpportunity);
}

export async function getOpportunityById(
  id: string,
): Promise<Opportunity | null> {
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error)
    throw new Error(`Supabase error (getOpportunityById): ${error.message}`);
  return data ? rowToOpportunity(data as OpportunityRow) : null;
}

export async function createOpportunity(
  input: Omit<Opportunity, "id" | "createdAt">,
): Promise<Opportunity> {
  const { data, error } = await supabase
    .from("opportunities")
    .insert({
      title: input.title,
      organization: input.organization,
      category: input.category,
      location: input.location,
      type: input.type,
      deadline: input.deadline,
      description: input.description,
      requirements: input.requirements,
      apply_link: input.applyLink,
      tags: input.tags,
      featured: input.featured ?? false,
    })
    .select()
    .single();

  if (error)
    throw new Error(`Supabase error (createOpportunity): ${error.message}`);
  return rowToOpportunity(data as OpportunityRow);
}

export async function updateOpportunity(
  id: string,
  updates: Partial<Opportunity>,
): Promise<Opportunity | null> {
  const patch: Record<string, unknown> = {};
  if (updates.title !== undefined) patch.title = updates.title;
  if (updates.organization !== undefined)
    patch.organization = updates.organization;
  if (updates.category !== undefined) patch.category = updates.category;
  if (updates.location !== undefined) patch.location = updates.location;
  if (updates.type !== undefined) patch.type = updates.type;
  if (updates.deadline !== undefined) patch.deadline = updates.deadline;
  if (updates.description !== undefined)
    patch.description = updates.description;
  if (updates.requirements !== undefined)
    patch.requirements = updates.requirements;
  if (updates.applyLink !== undefined) patch.apply_link = updates.applyLink;
  if (updates.tags !== undefined) patch.tags = updates.tags;
  if (updates.featured !== undefined) patch.featured = updates.featured;

  const { data, error } = await supabase
    .from("opportunities")
    .update(patch)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error)
    throw new Error(`Supabase error (updateOpportunity): ${error.message}`);
  return data ? rowToOpportunity(data as OpportunityRow) : null;
}

export async function deleteOpportunity(id: string): Promise<boolean> {
  const { error, count } = await supabase
    .from("opportunities")
    .delete({ count: "exact" })
    .eq("id", id);

  if (error)
    throw new Error(`Supabase error (deleteOpportunity): ${error.message}`);
  return (count ?? 0) > 0;
}
