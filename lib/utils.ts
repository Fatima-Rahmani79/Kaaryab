import { Opportunity, OpportunityFilters, DashboardStats } from "@/types";
import { OpportunityCategory } from "@/types";

export function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// returns the number of days until the deadline, or a negative number if the deadline has passed
export function daysUntilDeadline(deadline: string): number {
  const diff = new Date(deadline).getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function isExpiringSoon(deadline: string): boolean {
  const days = daysUntilDeadline(deadline);
  return days >= 0 && days <= 7;
}

export function isExpired(deadline: string): boolean {
  return daysUntilDeadline(deadline) < 0;
}

// filter based on search, category, location, type, and sortBy
export function filterOpportunities(
  items: Opportunity[],
  filters: OpportunityFilters,
): Opportunity[] {
  return items
    .filter((o) =>
      filters.search
        ? o.title.toLowerCase().includes(filters.search.toLowerCase())
        : true,
    )
    .filter((o) =>
      filters.category !== "All" ? o.category === filters.category : true,
    )
    .filter((o) => (filters.location ? o.location === filters.location : true))
    .filter((o) => (filters.type !== "All" ? o.type === filters.type : true))
    .sort((a, b) => {
      if (filters.sortBy === "deadline") {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}

// calculate dashboard statistics based on the same array of data — without a separate backend
export function calculateStats(items: Opportunity[]): DashboardStats {
  return {
    total: items.length,
    jobs: items.filter((o) => o.category === "Job").length,
    scholarships: items.filter((o) => o.category === "Scholarship").length,
    internships: items.filter((o) => o.category === "Internship").length,
    remote: items.filter((o) => o.type === "Remote").length,
    expiringSoon: items.filter((o) => isExpiringSoon(o.deadline)).length,
    recent: [...items]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 5),
  };
}

export function categoryBreakdown(
  items: Opportunity[],
): { category: OpportunityCategory; count: number }[] {
  const counts: Record<string, number> = {};
  items.forEach((o) => {
    counts[o.category] = (counts[o.category] || 0) + 1;
  });
  return Object.entries(counts).map(([category, count]) => ({
    category: category as OpportunityCategory,
    count,
  }));
}
