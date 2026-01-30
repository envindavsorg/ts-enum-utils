&nbsp;

![TypeScript](./public/ts-logo.svg)

&nbsp;

# ts-enum-utils

Type-safe runtime enums with built-in utilities for TypeScript.

&nbsp;

## Why?

TypeScript's native enums have issues:

- Not iterable without hacks
- Weird reverse mapping behavior
- No built-in validation

This library gives you **type-safe enums** with **runtime utilities** in ~30 lines.

&nbsp;

## Installation

```bash
npm install ts-enum-utils
# or
pnpm add ts-enum-utils
# or
yarn add ts-enum-utils
```

&nbsp;

## Usage

```typescript
import { createEnum, type EnumValue } from "ts-enum-utils";

const Status = createEnum(["pending", "active", "archived"] as const);

// Direct value access (with autocomplete)
Status.pending; // "pending"
Status.active; // "active"
Status.archived; // "archived"

// Get all values
Status.values; // ["pending", "active", "archived"]
```

&nbsp;

### Type Guard

```typescript
const userInput: unknown = "pending";

if (Status.is(userInput)) {
  // userInput is now typed as "pending" | "active" | "archived"
  console.log(userInput);
}
```

&nbsp;

### Validation with Error

```typescript
// Throws if invalid
const validated = Status.assert(untrustedData);
// Returns the value if valid, throws otherwise
```

&nbsp;


### Extract the Type

```typescript
type Status = EnumValue<typeof Status>;
// "pending" | "active" | "archived"

const updateStatus = (id: string, status: Status) => {
  // ...
};
```

&nbsp;

### Utilities

```typescript
// Random value (great for tests/mocks)
Status.random(); // "pending" | "active" | "archived"

// Get index
Status.indexOf("active"); // 1

// Get by index (supports negative)
Status.at(0); // "pending"
Status.at(-1); // "archived"
```

&nbsp;

## API

&nbsp;

### `createEnum(values)`

Creates a type-safe enum object.

| Method            | Description                                |
| ----------------- | ------------------------------------------ |
| `.values`         | Readonly array of all enum values          |
| `.is(value)`      | Type guard that checks if value is valid   |
| `.assert(value)`  | Returns value if valid, throws otherwise   |
| `.random()`       | Returns a random enum value                |
| `.indexOf(value)` | Returns the index of a value               |
| `.at(index)`      | Returns value at index (supports negative) |

&nbsp;

### `EnumValue<E>`

Utility type to extract the union type from an enum.

```typescript
type Status = EnumValue<typeof Status>;
// "pending" | "active" | "archived"
```

&nbsp;

## Comparison

| Feature     | Native Enum | ts-enum-utils  |
| ----------- | ----------- | -------------- |
| Type-safe   | ✅          | ✅             |
| Iterable    | ❌          | ✅ `.values`   |
| Type guard  | ❌          | ✅ `.is()`     |
| Validation  | ❌          | ✅ `.assert()` |
| Random      | ❌          | ✅ `.random()` |
| Bundle size | -           | ~500B          |

&nbsp;

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


&nbsp;

**[⭐ Star me on GitHub](https://github.com/envindavsorg/ts-enum-utils)** • **[📦 NPM Package](https://www.npmjs.com/package/@envind/ts-enum-utils)** • **[📚 Documentation](https://github.com/envindavsorg/ts-enum-utils#readme)**

&nbsp;

Made with ❤️ by Florin Cuzeac
