# webext-command-palette

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![CI](https://github.com/theluckystrike/webext-command-palette/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/webext-command-palette/actions/workflows/ci.yml)

A Ctrl+K command palette for Chrome extensions. Fuzzy search, keyboard navigation, styled modal overlay, and a chainable action registry. Zero dependencies. Works with Manifest V3.


INSTALL

```
npm install webext-command-palette
```


USAGE

```typescript
import { CommandPalette } from 'webext-command-palette';

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

The constructor accepts a hotkey character. By default it binds Ctrl+K (or Cmd+K on Mac) to toggle the palette. Pressing Escape closes it.


API

CommandPalette

`new CommandPalette(hotkey?: string)` creates a palette instance bound to the given hotkey (default `'k'`).

Methods on the instance:

- `register(command)` adds a single command, returns `this` for chaining
- `registerAll(commands)` adds an array of commands at once, returns `this`
- `open()` opens the palette overlay
- `close()` removes the overlay from the DOM
- `toggle()` opens if closed, closes if open

PaletteCommand

Each command object has these fields:

| Field       | Type         | Required |
|-------------|-------------|----------|
| id          | string      | yes      |
| title       | string      | yes      |
| action      | () => void  | yes      |
| description | string      | no       |
| icon        | string      | no       |
| shortcut    | string      | no       |
| category    | string      | no       |


FUZZY SEARCH

The library also exports `FuzzySearch` for standalone use.

```typescript
import { FuzzySearch } from 'webext-command-palette';

const score = FuzzySearch.score('set', 'Open Settings');
// Returns a numeric score, higher means better match

const results = FuzzySearch.filter('set', items, (item) => item.title);
// Filters and sorts items by match quality
```

Scoring rules:

- Exact match returns 100
- Starts-with match returns 90
- Substring match returns 70
- Character-by-character fuzzy match scores based on consecutive hits
- No match returns 0


HOW IT WORKS

When `open()` is called, the palette injects a fixed-position overlay into the DOM with a search input and scrollable command list. Typing in the input filters commands by title and description. Clicking a command runs its action and closes the palette. Clicking outside the modal closes it.


DEVELOPMENT

```
git clone https://github.com/theluckystrike/webext-command-palette.git
cd webext-command-palette
npm install
npm run build
npm test
```


LICENSE

MIT. See [LICENSE](LICENSE) for details.

Built by [Zovo](https://zovo.one)
