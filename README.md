# ts-enum-utils

[![npm version](https://img.shields.io/npm/v/ts-enum-utils.svg)](https://www.npmjs.com/package/ts-enum-utils)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/ts-enum-utils)](https://bundlephobia.com/package/ts-enum-utils)

Type-safe runtime enums with built-in utilities for TypeScript.

## Why?

TypeScript's native enums have issues:

- Not iterable without hacks
- Weird reverse mapping behavior
- No built-in validation

This library gives you **type-safe enums** with **runtime utilities** in ~30 lines.

## Installation

```bash
npm install ts-enum-utils
# or
pnpm add ts-enum-utils
# or
yarn add ts-enum-utils
```

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

### Type Guard

```typescript
const userInput: unknown = "pending";

if (Status.is(userInput)) {
  // userInput is now typed as "pending" | "active" | "archived"
  console.log(userInput);
}
```

### Validation with Error

```typescript
// Throws if invalid
const validated = Status.assert(untrustedData);
// Returns the value if valid, throws otherwise
```

### Extract the Type

```typescript
type Status = EnumValue<typeof Status>;
// "pending" | "active" | "archived"

const updateStatus = (id: string, status: Status) => {
  // ...
};
```

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

## API

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

### `EnumValue<E>`

Utility type to extract the union type from an enum.

```typescript
type Status = EnumValue<typeof Status>;
// "pending" | "active" | "archived"
```

## Comparison

| Feature     | Native Enum | ts-enum-utils  |
| ----------- | ----------- | -------------- |
| Type-safe   | ✅          | ✅             |
| Iterable    | ❌          | ✅ `.values`   |
| Type guard  | ❌          | ✅ `.is()`     |
| Validation  | ❌          | ✅ `.assert()` |
| Random      | ❌          | ✅ `.random()` |
| Bundle size | -           | ~500B          |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<div align="center">

**[⭐ Star us on GitHub](https://github.com/envindavsorg/ts-enum-utils)** • **[📦 NPM Package](https://www.npmjs.com/package/ts-enum-utils)** • **[📚 Documentation](https://github.com/envindavsorg/ts-enum-utils#readme)**

Made with ❤️ by Cuzeac Florin in Paris.

</div>
