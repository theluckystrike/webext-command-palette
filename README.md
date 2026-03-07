[![CI](https://github.com/theluckystrike/webext-command-palette/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-command-palette/actions)
[![npm](https://img.shields.io/npm/v/@theluckystrike/webext-command-palette)](https://www.npmjs.com/package/@theluckystrike/webext-command-palette)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

# webext-command-palette

A Ctrl+K command palette for Chrome extensions with fuzzy search, keyboard navigation, and a chainable action registry. Zero dependencies. Works with Manifest V3.

## Install

```bash
npm install @theluckystrike/webext-command-palette
```

## Usage

```typescript
import { CommandPalette } from '@theluckystrike/webext-command-palette';

const palette = new CommandPalette('k');

palette
  .register({
    id: 'settings',
    title: 'Open Settings',
    description: 'Navigate to the settings page',
    icon: '⚙️',
    shortcut: '⌘,',
    category: 'navigation',
    action: () => openSettings(),
  })
  .register({
    id: 'export',
    title: 'Export Data',
    action: () => exportData(),
  });
```

Press `Ctrl+K` (or `Cmd+K` on Mac) to open the palette. Press `Escape` to close it.

## API Reference

### `CommandPalette`

The main class for creating and managing the command palette.

#### Constructor

```typescript
new CommandPalette(hotkey?: string): CommandPalette
```

Creates a palette instance bound to the specified hotkey character. Default hotkey is `'k'`.

**Parameters:**
- `hotkey` (optional) - The keyboard character to trigger the palette (default: `'k'`)

#### Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `register` | `(command: PaletteCommand): this` | Register a single command, returns `this` for chaining |
| `registerAll` | `(commands: PaletteCommand[]): this` | Register multiple commands at once, returns `this` |
| `open` | `(): void` | Programmatically open the palette overlay |
| `close` | `(): void` | Remove the overlay from the DOM |
| `toggle` | `(): void` | Toggle the palette open/closed state |

### `PaletteCommand`

Each command object has these fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier for the command |
| `title` | `string` | Yes | Display title shown in the palette |
| `action` | `() => void` | Yes | Callback executed when command is selected |
| `description` | `string` | No | Optional description shown below the title |
| `icon` | `string` | No | Emoji or icon displayed next to the title |
| `shortcut` | `string` | No | Keyboard shortcut hint displayed |
| `category` | `string` | No | Optional category for organization |

### `FuzzySearch`

Standalone fuzzy string matching utility exported for custom use.

#### `FuzzySearch.score`

```typescript
static score(query: string, target: string): number
```

Score a query against a target string. Higher scores indicate better matches.

**Scoring rules:**
- Exact match: 100
- Starts with query: 90
- Contains query: 70
- Character-by-character fuzzy match: scores based on consecutive hits
- No match: 0

#### `FuzzySearch.filter`

```typescript
static filter<T>(query: string, items: T[], getText: (item: T) => string): T[]
```

Filter and sort items by fuzzy match quality.

**Parameters:**
- `query` - The search query string
- `items` - Array of items to filter
- `getText` - Function to extract searchable text from each item

**Example:**

```typescript
import { FuzzySearch } from '@theluckystrike/webext-command-palette';

const items = [
  { title: 'Open Settings', id: 1 },
  { title: 'Export Data', id: 2 },
  { title: 'Import File', id: 3 },
];

const results = FuzzySearch.filter('set', items, (item) => item.title);
// Returns items sorted by match quality
```

## Chrome Extension Guide

This library is designed for Chrome/Edge/Firefox extensions using Manifest V3. For guidance on building Chrome extensions, see the [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/mv3/).

## Development

```bash
git clone https://github.com/theluckystrike/webext-command-palette.git
cd webext-command-palette
npm install
npm run build
npm test
```

## License

MIT

---
Built by [theluckystrike](https://github.com/theluckystrike) — [zovo.one](https://zovo.one)
