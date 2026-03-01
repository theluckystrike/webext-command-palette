# webext-command-palette — Command Palette for Chrome Extensions

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Built by [Zovo](https://zovo.one)**

**Ctrl+K command palette** — fuzzy search, keyboard navigation, styled modal, action registry. Like VS Code/Raycast for your extension.

## 🚀 Quick Start
```typescript
import { CommandPalette } from 'webext-command-palette';
const palette = new CommandPalette('k');
palette
  .register({ id: 'settings', title: 'Open Settings', icon: '⚙️', action: () => openSettings() })
  .register({ id: 'export', title: 'Export Data', icon: '📥', shortcut: '⌘E', action: () => exportData() });
```

## 📄 License
MIT — [Zovo](https://zovo.one)
