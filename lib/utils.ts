import { Opportunity, OpportunityFilters, DashboardStats } from "@/types";

export function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function daysUntilDeadline(deadline: string): number {
  const diff = new Date(deadline).getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function isExpriringSoon(deadline: string): boolean {
  const days = daysUntilDeadline(deadline);
  return days >= 0 && days <= 7;
}

export function isExpired(deadline: string): boolean {
  const days = daysUntilDeadline(deadline);
  return days < 0;
}

export function filterOppotunities(
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
      if (filters.sortBy === "Deadline") {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}

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
