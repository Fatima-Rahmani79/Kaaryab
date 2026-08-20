import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  daysUntilDeadline,
  isExpiringSoon,
  isExpired,
  filterOpportunities,
  calculateStats,
  categoryBreakdown,
} from "./utils";
import { Opportunity, OpportunityFilters } from "@/types";

const FIXED_NOW = new Date("2026-01-15T00:00:00.000Z");

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(FIXED_NOW);
});

afterEach(() => {
  vi.useRealTimers();
});

function makeOpportunity(overrides: Partial<Opportunity> = {}): Opportunity {
  return {
    id: "1",
    title: "Frontend Developer Intern",
    organization: "Kabul Tech Community",
    category: "Internship",
    location: "Kabul",
    type: "Remote",
    deadline: "2026-02-01",
    description: "A sample opportunity for testing.",
    requirements: ["React"],
    applyLink: "https://example.com",
    tags: ["React"],
    createdAt: "2026-01-01T00:00:00.000Z",
    status: "approved",
    ...overrides,
  };
}

const baseFilters: OpportunityFilters = {
  search: "",
  category: "All",
  location: "",
  type: "All",
  deadlineRange: "all",
  sortBy: "newest",
};

describe("daysUntilDeadline", () => {
  it("returns a positive number for a future date", () => {
    expect(daysUntilDeadline("2026-01-20")).toBeGreaterThan(0);
  });

  it("returns a negative number for a past date", () => {
    expect(daysUntilDeadline("2026-01-01")).toBeLessThan(0);
  });
});

describe("isExpiringSoon", () => {
  it("is true for a deadline 3 days away", () => {
    expect(isExpiringSoon("2026-01-18")).toBe(true);
  });

  it("is false for a deadline 30 days away", () => {
    expect(isExpiringSoon("2026-02-14")).toBe(false);
  });

  it("is false for a deadline that already passed", () => {
    expect(isExpiringSoon("2026-01-01")).toBe(false);
  });
});

describe("isExpired", () => {
  it("is true for a past deadline", () => {
    expect(isExpired("2026-01-01")).toBe(true);
  });

  it("is false for a future deadline", () => {
    expect(isExpired("2026-02-01")).toBe(false);
  });
});

describe("filterOpportunities", () => {
  const items: Opportunity[] = [
    makeOpportunity({
      id: "1",
      title: "Frontend Developer Intern",
      category: "Internship",
      location: "Kabul",
      type: "Remote",
      deadline: "2026-02-01",
      createdAt: "2026-01-05T00:00:00.000Z",
    }),
    makeOpportunity({
      id: "2",
      title: "Women in Tech Scholarship",
      category: "Scholarship",
      location: "Online",
      type: "Remote",
      deadline: "2026-01-18",
      createdAt: "2026-01-10T00:00:00.000Z",
    }),
    makeOpportunity({
      id: "3",
      title: "Civil Engineer",
      category: "Job",
      location: "Herat",
      type: "On-site",
      deadline: "2026-03-01",
      createdAt: "2026-01-01T00:00:00.000Z",
    }),
  ];

  it("filters by search text (case-insensitive)", () => {
    const result = filterOpportunities(items, {
      ...baseFilters,
      search: "scholarship",
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("filters by category", () => {
    const result = filterOpportunities(items, {
      ...baseFilters,
      category: "Job",
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("3");
  });

  it("filters by location", () => {
    const result = filterOpportunities(items, {
      ...baseFilters,
      location: "Online",
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("filters by type", () => {
    const result = filterOpportunities(items, {
      ...baseFilters,
      type: "On-site",
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("3");
  });

  it("filters by deadline range (within 7 days)", () => {
    const result = filterOpportunities(items, {
      ...baseFilters,
      deadlineRange: "week",
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("excludes already-expired items when a deadline range is active", () => {
    const withExpired = [
      ...items,
      makeOpportunity({ id: "4", deadline: "2026-01-01" }),
    ];
    const result = filterOpportunities(withExpired, {
      ...baseFilters,
      deadlineRange: "month",
    });
    expect(result.find((o) => o.id === "4")).toBeUndefined();
  });

  it("sorts by newest (createdAt) by default", () => {
    const result = filterOpportunities(items, baseFilters);
    expect(result.map((o) => o.id)).toEqual(["2", "1", "3"]);
  });

  it("sorts by closest deadline when sortBy is 'deadline'", () => {
    const result = filterOpportunities(items, {
      ...baseFilters,
      sortBy: "deadline",
    });
    expect(result.map((o) => o.id)).toEqual(["2", "1", "3"]);
  });

  it("combines multiple filters together", () => {
    const result = filterOpportunities(items, {
      ...baseFilters,
      type: "Remote",
      category: "Scholarship",
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("returns an empty array when nothing matches", () => {
    const result = filterOpportunities(items, {
      ...baseFilters,
      search: "nonexistent",
    });
    expect(result).toHaveLength(0);
  });
});

describe("calculateStats", () => {
  const items: Opportunity[] = [
    makeOpportunity({
      id: "1",
      category: "Job",
      type: "Remote",
      status: "approved",
      deadline: "2026-01-18",
    }),
    makeOpportunity({
      id: "2",
      category: "Scholarship",
      type: "On-site",
      status: "approved",
      deadline: "2026-06-01",
    }),
    makeOpportunity({
      id: "3",
      category: "Internship",
      type: "Remote",
      status: "pending",
      deadline: "2026-06-01",
    }),
    makeOpportunity({
      id: "4",
      category: "Job",
      type: "Remote",
      status: "approved",
      deadline: "2026-06-01",
    }),
  ];

  it("counts the total number of opportunities", () => {
    expect(calculateStats(items).total).toBe(4);
  });

  it("counts jobs correctly", () => {
    expect(calculateStats(items).jobs).toBe(2);
  });

  it("counts scholarships correctly", () => {
    expect(calculateStats(items).scholarships).toBe(1);
  });

  it("counts remote opportunities correctly", () => {
    expect(calculateStats(items).remote).toBe(3);
  });

  it("counts opportunities expiring within 7 days", () => {
    expect(calculateStats(items).expiringSoon).toBe(1);
  });

  it("counts pending opportunities", () => {
    expect(calculateStats(items).pending).toBe(1);
  });

  it("returns at most 5 recent opportunities", () => {
    const many = Array.from({ length: 8 }, (_, i) =>
      makeOpportunity({
        id: String(i),
        createdAt: `2026-01-0${(i % 9) + 1}T00:00:00.000Z`,
      }),
    );
    expect(calculateStats(many).recent).toHaveLength(5);
  });
});

describe("categoryBreakdown", () => {
  it("groups opportunities by category with correct counts", () => {
    const items: Opportunity[] = [
      makeOpportunity({ id: "1", category: "Job" }),
      makeOpportunity({ id: "2", category: "Job" }),
      makeOpportunity({ id: "3", category: "Scholarship" }),
    ];
    const result = categoryBreakdown(items);
    const job = result.find((r) => r.category === "Job");
    const scholarship = result.find((r) => r.category === "Scholarship");
    expect(job?.count).toBe(2);
    expect(scholarship?.count).toBe(1);
  });

  it("returns an empty array for no opportunities", () => {
    expect(categoryBreakdown([])).toEqual([]);
  });
});
