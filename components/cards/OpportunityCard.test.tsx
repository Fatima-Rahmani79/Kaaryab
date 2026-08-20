import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SavedProvider } from "@/context/SavedContext";
import OpportunityCard from "./OpportunityCard";
import { Opportunity } from "@/types";

function renderCard(opportunity: Opportunity) {
  return render(
    <SavedProvider>
      <OpportunityCard opportunity={opportunity} />
    </SavedProvider>,
  );
}

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

describe("OpportunityCard", () => {
  it("renders the title, organization, and location", () => {
    renderCard(makeOpportunity());
    expect(screen.getByText("Frontend Developer Intern")).toBeInTheDocument();
    expect(screen.getByText("Kabul Tech Community")).toBeInTheDocument();
    expect(screen.getByText("Kabul")).toBeInTheDocument();
  });

  it("links to the correct opportunity details page", () => {
    renderCard(makeOpportunity({ id: "42" }));
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/en/opportunities/42");
  });

  it("does not show the expired badge for an active opportunity", () => {
    renderCard(makeOpportunity({ deadline: "2099-01-01" }));
    expect(screen.queryByText("detail.expired")).not.toBeInTheDocument();
  });

  it("shows the expired badge once the deadline has passed", () => {
    renderCard(makeOpportunity({ deadline: "2000-01-01" }));
    expect(screen.getAllByText("detail.expired").length).toBeGreaterThan(0);
  });

  it("renders a save button that can be toggled", () => {
    renderCard(makeOpportunity());
    const saveButton = screen.getByRole("button", { name: /save/i });
    expect(saveButton).toHaveAttribute("aria-pressed", "false");
  });
});
