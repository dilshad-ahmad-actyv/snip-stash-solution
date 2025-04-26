interface Pattern {
  name: string;
  patterns: RegExp[];
}

const patterns: Pattern[] = [
  {
    name: "loop",
    patterns: [/\b(for|while|do\s+while|forEach|map)\b/],
  },
  {
    name: "api",
    patterns: [/\b(fetch|axios|XMLHttpRequest|http\.get|http\.post)\b/],
  },
  {
    name: "error-handling",
    patterns: [/\b(try|catch|throw|finally)\b/, /\berror\b/i],
  },
  {
    name: "array-operations",
    patterns: [/\b(map|filter|reduce|some|every|find|findIndex)\b/],
  },
  {
    name: "debugging",
    patterns: [/console\.(log|error|warn|info|debug)/, /debugger/],
  },
  {
    name: "async",
    patterns: [/\b(async|await|Promise)\b/, /\.then\b/],
  },
  {
    name: "dom-manipulation",
    patterns: [
      /document\.(getElementById|querySelector|createElement)/,
      /\b(innerHTML|appendChild|removeChild)\b/,
    ],
  },
  {
    name: "state-management",
    patterns: [
      /\b(useState|useReducer|useContext)\b/,
      /\b(setState|getState)\b/,
    ],
  },
];

export function categorizeSnippet(code: string): string[] {
  const tags = new Set<string>();

  for (const pattern of patterns) {
    for (const regex of pattern.patterns) {
      if (regex.test(code)) {
        tags.add(pattern.name);
        break;
      }
    }
  }

  return Array.from(tags);
}
