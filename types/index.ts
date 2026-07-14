export type OpportunityCategory =
  | "Job"
  | "Internship"
  | "Scholarship"
  | "Online Course"
  | "Remote Work"
  | "Training Program"
  | "Volunteer Work";

export type OpportunityType = "Remote" | "On-site" | "Hybrid";

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  category: OpportunityCategory;
  location: string;
  type: OpportunityType;
  deadline: string; // ISO date string: "2026-08-10"
  description: string;
  requirements: string[];
  applyLink: string;
  tags: string[];
  createdAt: string;
  featured?: boolean;
}

export type OpportunityFormData = Omit<Opportunity, "id" | "createdAt">;

export interface OpportunityFilters {
  search: string;
  category: OpportunityCategory | "All";
  location: string;
  type: OpportunityType | "All";
  deadlineRange: "all" | "week" | "month";
  sortBy: "newest" | "deadline";
}

export interface DashboardStats {
  total: number;
  jobs: number;
  scholarships: number;
  internships: number;
  remote: number;
  expiringSoon: number;
  recent: Opportunity[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
