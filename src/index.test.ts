import { describe, expect, expectTypeOf, it } from "vitest";
import { type Enum, type EnumValue, createEnum } from "./index";

describe("createEnum", () => {
  const Status = createEnum(["pending", "active", "archived"] as const);

  describe("creation", () => {
    it("creates an enum with direct value access", () => {
      expect(Status.pending).toBe("pending");
      expect(Status.active).toBe("active");
      expect(Status.archived).toBe("archived");
    });

    it("exposes values array", () => {
      expect(Status.values).toEqual(["pending", "active", "archived"]);
    });

    it("is frozen/immutable", () => {
      expect(Object.isFrozen(Status)).toBe(true);
    });

    it("throws on empty values", () => {
      expect(() => createEnum([] as const)).toThrow("at least one value");
    });

    it("throws on duplicate values", () => {
      expect(() => createEnum(["a", "b", "a"] as const)).toThrow("unique");
    });
  });

  describe("is (type guard)", () => {
    it("returns true for valid values", () => {
      expect(Status.is("pending")).toBe(true);
      expect(Status.is("active")).toBe(true);
    });

    it("returns false for invalid values", () => {
      expect(Status.is("invalid")).toBe(false);
      expect(Status.is("")).toBe(false);
      expect(Status.is(null)).toBe(false);
      expect(Status.is(undefined)).toBe(false);
      expect(Status.is(123)).toBe(false);
      expect(Status.is({})).toBe(false);
    });

    it("narrows type correctly", () => {
      const value: unknown = "pending";
      if (Status.is(value)) {
        expectTypeOf(value).toEqualTypeOf<"pending" | "active" | "archived">();
      }
    });
  });

  describe("assert", () => {
    it("returns value for valid input", () => {
      expect(Status.assert("pending")).toBe("pending");
      expect(Status.assert("active")).toBe("active");
    });

    it("throws for invalid input", () => {
      expect(() => Status.assert("invalid")).toThrow(
        'Invalid enum value: "invalid"',
      );
      expect(() => Status.assert(null)).toThrow();
    });
  });

  describe("random", () => {
    it("returns a valid enum value", () => {
      for (let i = 0; i < 100; i++) {
        const value = Status.random();
        expect(Status.is(value)).toBe(true);
      }
    });
  });

  describe("indexOf", () => {
    it("returns correct index", () => {
      expect(Status.indexOf("pending")).toBe(0);
      expect(Status.indexOf("active")).toBe(1);
      expect(Status.indexOf("archived")).toBe(2);
    });
  });

  describe("at", () => {
    it("returns value at index", () => {
      expect(Status.at(0)).toBe("pending");
      expect(Status.at(1)).toBe("active");
      expect(Status.at(-1)).toBe("archived");
    });

    it("returns undefined for out of bounds", () => {
      expect(Status.at(99)).toBeUndefined();
    });
  });

  describe("types", () => {
    it("EnumValue extracts union type", () => {
      type StatusType = EnumValue<typeof Status>;
      expectTypeOf<StatusType>().toEqualTypeOf<
        "pending" | "active" | "archived"
      >();
    });

    it("Enum type works correctly", () => {
      type StatusEnum = Enum<readonly ["pending", "active", "archived"]>;
      expectTypeOf(Status).toMatchTypeOf<StatusEnum>();
    });
  });
});
