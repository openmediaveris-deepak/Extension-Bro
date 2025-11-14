/**
 * Hook: on_file_check
 * 
 * Purpose: Run lightweight static check on any file Kiro touches
 * Detects: unused imports, duplicate functions, unreachable code
 * 
 * Behavior:
 * - Log warnings, but do not block saving
 * - Return original code unchanged
 */

export default function onFileCheck({ code, filePath }) {
  const timestamp = new Date().toISOString();
  console.log(`[KIRO CHECK] ${timestamp} - Checking: ${filePath}`);
  
  const warnings = [];
  
  // Check for unused imports (basic detection)
  const importMatches = code.match(/import\s+(?:{[^}]+}|\w+)\s+from\s+['"][^'"]+['"]/g);
  if (importMatches) {
    importMatches.forEach(importLine => {
      const importedItems = importLine.match(/import\s+(?:{([^}]+)}|(\w+))/);
      if (importedItems) {
        const items = importedItems[1] ? importedItems[1].split(',').map(i => i.trim()) : [importedItems[2]];
        items.forEach(item => {
          const itemName = item.replace(/\s+as\s+\w+/, '').trim();
          // Simple check: if imported item appears only once (in import), it might be unused
          const occurrences = (code.match(new RegExp(`\\b${itemName}\\b`, 'g')) || []).length;
          if (occurrences === 1) {
            warnings.push(`Potentially unused import: ${itemName}`);
          }
        });
      }
    });
  }
  
  // Check for duplicate function names
  const functionMatches = code.match(/(?:function\s+(\w+)|const\s+(\w+)\s*=\s*(?:async\s+)?\([^)]*\)\s*=>)/g);
  if (functionMatches) {
    const functionNames = functionMatches.map(match => {
      const name = match.match(/(?:function\s+(\w+)|const\s+(\w+))/);
      return name ? (name[1] || name[2]) : null;
    }).filter(Boolean);
    
    const duplicates = functionNames.filter((name, index) => functionNames.indexOf(name) !== index);
    if (duplicates.length > 0) {
      warnings.push(`Duplicate function names found: ${[...new Set(duplicates)].join(', ')}`);
    }
  }
  
  // Check for unreachable code (code after return)
  const unreachablePattern = /return\s+[^;]+;[\s\n]+(?!}|$)(\w+)/g;
  const unreachableMatches = code.match(unreachablePattern);
  if (unreachableMatches) {
    warnings.push(`Potentially unreachable code detected after return statements`);
  }
  
  // Check for console.log statements (code smell in production)
  const consoleLogCount = (code.match(/console\.log\(/g) || []).length;
  if (consoleLogCount > 5) {
    warnings.push(`High number of console.log statements (${consoleLogCount}) - consider using a logger`);
  }
  
  // Log all warnings
  if (warnings.length > 0) {
    console.warn(`[KIRO CHECK WARNINGS] ${filePath}:`);
    warnings.forEach(warning => console.warn(`  - ${warning}`));
  } else {
    console.log(`[KIRO CHECK] ${filePath} - No issues detected`);
  }
  
  // Return original code unchanged
  return code;
}
