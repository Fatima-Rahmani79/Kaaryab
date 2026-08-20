import { describe, it, expect, vi } from "vitest";
import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchFilter from "./SearchFilter";
import { Opportunity, OpportunityFilters } from "@/types";

const baseFilters: OpportunityFilters = {
  search: "",
  category: "All",
  location: "",
  type: "All",
  deadlineRange: "all",
  sortBy: "newest",
};

function makeOpportunity(overrides: Partial<Opportunity> = {}): Opportunity {
  return {
    id: "1",
    title: "Frontend Developer Intern",
    organization: "Kabul Tech Community",
    category: "Internship",
    location: "Kabul",
    type: "Remote",
    deadline: "2099-01-01",
    description: "A sample opportunity for testing.",
    requirements: ["React"],
    applyLink: "https://example.com",
    tags: ["React"],
    createdAt: "2026-01-01T00:00:00.000Z",
    status: "approved",
    ...overrides,
  };
}

describe("SearchFilter", () => {
  it("calls onChange with the typed search text", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      createElement(SearchFilter, {
        filters: baseFilters,
        onChange,
        opportunities: [],
      }),
    );

    const input = screen.getByPlaceholderText(
      "opportunities.searchPlaceholder",
    );
    await user.type(input, "React");

    expect(onChange).toHaveBeenLastCalledWith({ ...baseFilters, search: "t" });
    expect(onChange).toHaveBeenCalledTimes(5);
  });

  it("builds the location dropdown from the given opportunities, without duplicates", () => {
    const opportunities = [
      makeOpportunity({ id: "1", location: "Kabul" }),
      makeOpportunity({ id: "2", location: "Herat" }),
      makeOpportunity({ id: "3", location: "Kabul" }),
    ];
    render(
      createElement(SearchFilter, {
        filters: baseFilters,
        onChange: vi.fn(),
        opportunities,
      }),
    );

    expect(screen.getAllByText("Kabul")).toHaveLength(1);
    expect(screen.getAllByText("Herat")).toHaveLength(1);
  });

  it("does not show the 'clear filters' button when no filter is active", () => {
    render(
      createElement(SearchFilter, {
        filters: baseFilters,
        onChange: vi.fn(),
        opportunities: [],
      }),
    );
    expect(screen.queryByText(/clear filters/i)).not.toBeInTheDocument();
  });

  it("shows the 'clear filters' button once a filter is active, with the right count", () => {
    const activeFilters: OpportunityFilters = {
      ...baseFilters,
      category: "Job",
      search: "react",
    };
    render(
      createElement(SearchFilter, {
        filters: activeFilters,
        onChange: vi.fn(),
        opportunities: [],
      }),
    );
    expect(screen.getByText(/clear filters \(2\)/i)).toBeInTheDocument();
  });

  it("resets all filters when 'clear filters' is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const activeFilters: OpportunityFilters = {
      ...baseFilters,
      category: "Job",
    };
    render(
      createElement(SearchFilter, {
        filters: activeFilters,
        onChange,
        opportunities: [],
      }),
    );

    await user.click(screen.getByText(/clear filters/i));
    expect(onChange).toHaveBeenCalledWith(baseFilters);
  });
});
