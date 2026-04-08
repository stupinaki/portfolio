## Code Style
1. Component names: `PascalCase`
2. Styles: `module.scss`
3. Style file names: `camelCase`
4. Class names: `camelCase`
5. SVG imports: `PascalCase` if React component, `camelCase` otherwise
6. Use linter, stylelint, prettier configs and rules
7. Always describe props type for components, avoid using any, as
8. All dependencies must have a fixed version
9. before commit, run lint:fix, format just for files with changes. If this files .scss run stylelint:fix for this file
10. Always use the clsx library to concatenate styles. 
11. Use clsx syntax for enumerating optional styles, for example:
```ts
clsx(styles.root, {
  [styles.visible]: !isCookieAccepted,
})
```

## Pull Requests
1. Create a detailed message of what changed. Focus on the high level description of the problem it tries to solve, and how it is solved. Don't go into the specifics of the code unless it adds clarity.
2. NEVER ever mention a co-authored-by or similar aspects. In particular, never mention the tool used to create the commit message or PR.

## Breaking Changes
When making breaking changes, document them in docs/migration.md. Include:

1. What changed
2. Why it changed
3. How to migrate existing code

Search for related sections in the migration guide and group related changes together rather than adding new standalone sections.
