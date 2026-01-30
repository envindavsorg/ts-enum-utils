type EnumBase<T extends readonly string[]> = {
  readonly values: T;
  is: (value: unknown) => value is T[number];
  assert: (value: unknown) => T[number];
  random: () => T[number];
  indexOf: (value: T[number]) => number;
  at: (index: number) => T[number] | undefined;
};

type EnumMembers<T extends readonly string[]> = {
  readonly [K in T[number]]: K;
};

export type Enum<T extends readonly string[]> = EnumBase<T> & EnumMembers<T>;

export type EnumValue<E extends { values: readonly string[] }> =
  E["values"][number];

export const createEnum = <const T extends readonly string[]>(
  values: T,
): Enum<T> => {
  if (values.length === 0) {
    throw new Error("Enum must have at least one value");
  }

  const uniqueValues = new Set(values);
  if (uniqueValues.size !== values.length) {
    throw new Error("Enum values must be unique");
  }

  const valueSet = new Set<string>(values);

  const base: EnumBase<T> = {
    values,

    is: (value: unknown): value is T[number] =>
      typeof value === "string" && valueSet.has(value),

    assert: (value: unknown): T[number] => {
      if (typeof value === "string" && valueSet.has(value)) {
        return value as T[number];
      }
      throw new Error(
        `Invalid enum value: "${value}". Expected one of: ${values.join(", ")}`,
      );
    },

    random: (): T[number] => {
      const index = Math.floor(Math.random() * values.length);
      return values[index] as T[number];
    },

    indexOf: (value: T[number]): number => values.indexOf(value),

    at: (index: number): T[number] | undefined =>
      values.at(index) as T[number] | undefined,
  };

  const members = Object.fromEntries(
    values.map((v) => [v, v]),
  ) as EnumMembers<T>;

  return Object.freeze({ ...base, ...members }) as Enum<T>;
};
