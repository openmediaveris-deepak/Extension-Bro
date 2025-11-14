---
inclusion: always
---

# Coding Style Guide

## Core Principles

- Always write clean, minimal, readable code
- Do not put everything in a single file
- Use modular architecture
- No duplicate or redundant code
- No deeply nested logic
- Use consistent formatting
- Strong separation of concerns
- Use meaningful variable names
- Follow professional naming conventions

## Naming Conventions

### Components
- **Format**: PascalCase
- **Example**: `UserCard`, `NavigationBar`, `ProductList`

### Files
- **Format**: kebab-case
- **Example**: `user-card.js`, `navigation-bar.tsx`, `product-list.css`

### Functions
- **Format**: camelCase
- **Example**: `fetchUserData`, `handleSubmit`, `calculateTotal`

### Constants
- **Format**: UPPER_CASE
- **Example**: `API_URL`, `MAX_RETRIES`, `DEFAULT_TIMEOUT`

### Variables
- **Format**: camelCase
- **Example**: `userName`, `isLoading`, `totalCount`

## Code Quality

- Code must have comments only where necessary
- Avoid overengineering
- Prefer composition over inheritance
- Build scalable folder structure
- Keep functions small and focused
- One responsibility per function/module
- Use early returns to reduce nesting
- Avoid magic numbers - use named constants

## File Organization

```
src/
├── components/     # Reusable UI components
├── services/       # API calls and external services
├── utils/          # Helper functions and utilities
├── config/         # Configuration files
├── types/          # TypeScript type definitions
├── hooks/          # Custom React hooks (if applicable)
└── constants/      # Application constants
```

## Best Practices

- Write self-documenting code
- Use descriptive variable and function names
- Keep files under 300 lines when possible
- Extract complex logic into separate functions
- Use TypeScript for type safety
- Handle errors gracefully
- Write testable code
- Follow DRY (Don't Repeat Yourself)
- Follow SOLID principles
- Prefer functional programming patterns

## Formatting

- Use 2 spaces for indentation
- Use semicolons consistently
- Use single quotes for strings (unless template literals)
- Add trailing commas in multi-line objects/arrays
- Keep lines under 100 characters when reasonable
- Add blank lines between logical sections
- Group related code together

## Comments

- Use comments to explain "why", not "what"
- Document complex algorithms
- Add JSDoc for public APIs
- Remove commented-out code
- Keep comments up to date with code changes

## Examples

### Good ✅
```javascript
// Good: Clear, modular, well-named
const API_BASE_URL = 'https://api.example.com';

async function fetchUserProfile(userId) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`);
  return response.json();
}
```

### Bad ❌
```javascript
// Bad: Magic strings, unclear naming, no separation
async function getData(id) {
  const r = await fetch('https://api.example.com/users/' + id);
  return r.json();
}
```
