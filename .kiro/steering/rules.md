---
inclusion: always
---

# Kiro Development Rules

## Code Generation Principles

- Kiro should always generate code that is **simple and complete but minimal**
- No unnecessary dependencies
- No repeated logic across files
- Always create separate modules for:
  - API calls
  - Components
  - Config
  - Utils
- Prefer reusable functions instead of rewriting logic
- Follow DRY (Don't Repeat Yourself) principles
- Do not generate dead code or unused variables
- When generating new files, check if similar files already exist
- Keep responses short, clean, and aligned with best engineering practices

## Module Separation

### API Calls
- All API calls should be in `src/services/` or `src/api/`
- One service file per domain (e.g., `user-service.ts`, `auth-service.ts`)
- Export functions, not classes when possible

### Components
- UI components in `src/components/`
- One component per file
- Keep components small and focused
- Extract complex logic to custom hooks or utilities

### Configuration
- All config in `src/config/` or root config files
- Environment variables in `.env`
- Constants in `src/constants/`

### Utilities
- Helper functions in `src/utils/`
- Pure functions only
- Well-tested and reusable

## Code Quality Standards

### No Duplication
- If you see similar code in 2+ places, extract it
- Create shared utilities or components
- Use composition and inheritance appropriately

### No Dead Code
- Remove unused imports
- Remove unused variables
- Remove commented-out code
- Remove unreachable code

### Minimal Dependencies
- Only add dependencies when necessary
- Prefer native solutions when available
- Check if functionality already exists in the project

### File Checking
- Before creating a new file, check if similar functionality exists
- Before adding a new function, check if it already exists
- Reuse existing patterns and structures

## Response Guidelines

### Keep It Short
- Provide concise explanations
- Focus on what matters
- Don't over-explain obvious things

### Keep It Clean
- Well-formatted code
- Consistent style
- Proper indentation
- Meaningful names

### Keep It Professional
- Follow industry best practices
- Use proven patterns
- Write production-ready code
- Consider scalability and maintainability

## Error Handling

- Always handle errors gracefully
- Use try-catch for async operations
- Provide meaningful error messages
- Log errors appropriately
- Never fail silently

## Performance

- Avoid unnecessary re-renders (React)
- Use memoization when appropriate
- Lazy load when possible
- Optimize bundle size
- Minimize API calls

## Security

- Never hardcode sensitive data
- Use environment variables
- Validate user input
- Sanitize data
- Follow security best practices

## Testing

- Write testable code
- Keep functions pure when possible
- Mock external dependencies
- Test edge cases
- Maintain high test coverage

## Documentation

- Document complex logic
- Add JSDoc for public APIs
- Keep README up to date
- Document breaking changes
- Provide usage examples

## Version Control

- Write clear commit messages
- Keep commits atomic
- Don't commit generated files
- Don't commit sensitive data
- Use .gitignore properly

## Refactoring

- Refactor when you see duplication
- Improve naming when unclear
- Extract complex logic
- Simplify nested conditions
- Remove technical debt incrementally

## Examples

### Good ✅
```javascript
// Reusable, clean, minimal
export async function fetchUser(userId) {
  const response = await api.get(`/users/${userId}`);
  return response.data;
}
```

### Bad ❌
```javascript
// Duplicated logic, not reusable
function getUser1() {
  fetch('/users/1').then(r => r.json()).then(d => console.log(d));
}
function getUser2() {
  fetch('/users/2').then(r => r.json()).then(d => console.log(d));
}
```

## Summary

**Generate code that is:**
- ✅ Simple
- ✅ Complete
- ✅ Minimal
- ✅ Reusable
- ✅ Maintainable
- ✅ Professional

**Avoid:**
- ❌ Duplication
- ❌ Dead code
- ❌ Unnecessary complexity
- ❌ Poor naming
- ❌ Tight coupling
