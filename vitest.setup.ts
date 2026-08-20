import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => {
    const t = (key: string) => key;
    return t;
  },
  useLocale: () => "en",
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => "/en/opportunities",
  useSearchParams: () => new URLSearchParams(),
}));
