import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("joins class names with spaces", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("filters out falsy values", () => {
    expect(cn("foo", false, null, undefined, "", "bar")).toBe("foo bar");
  });

  it("handles conditional objects via clsx", () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz");
  });

  it("flattens arrays", () => {
    expect(cn(["foo", "bar"], "baz")).toBe("foo bar baz");
  });

  it("merges conflicting tailwind utilities — last one wins", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });

  it("keeps non-conflicting tailwind utilities together", () => {
    expect(cn("p-2", "text-sm", "bg-primary")).toBe("p-2 text-sm bg-primary");
  });

  it("preserves variant prefixes (hover, md:) as independent utilities", () => {
    expect(cn("p-2", "hover:p-4")).toBe("p-2 hover:p-4");
    expect(cn("text-sm", "md:text-lg")).toBe("text-sm md:text-lg");
  });

  it("returns an empty string when called with nothing", () => {
    expect(cn()).toBe("");
  });
});
