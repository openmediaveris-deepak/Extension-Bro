/**
 * Hook: on_save
 * 
 * Purpose: Auto-format code before saving
 * Checks for syntax errors
 * Prevents saving invalid code (with warnings)
 * 
 * Behavior:
 * - Run Prettier-style formatting (spaces, semicolons, indentation)
 * - If syntax errors exist, add warning but still return code
 * - Never modify business logic—only formatting rules
 */

export default function onSave({ code, filePath }) {
  const timestamp = new Date().toISOString();
  console.log(`[KIRO SAVE] ${timestamp} - Saving: ${filePath}`);
  
  // Basic syntax error detection
  try {
    // Check for common syntax issues
    const hasUnmatchedBraces = (code.match(/{/g) || []).length !== (code.match(/}/g) || []).length;
    const hasUnmatchedParens = (code.match(/\(/g) || []).length !== (code.match(/\)/g) || []).length;
    const hasUnmatchedBrackets = (code.match(/\[/g) || []).length !== (code.match(/\]/g) || []).length;
    
    if (hasUnmatchedBraces || hasUnmatchedParens || hasUnmatchedBrackets) {
      console.warn(`[KIRO SAVE WARNING] Potential syntax error in ${filePath} - unmatched brackets/braces/parens`);
    }
  } catch (error) {
    console.warn(`[KIRO SAVE WARNING] Could not validate syntax for ${filePath}:`, error.message);
  }
  
  // Apply basic formatting rules
  let formattedCode = code;
  
  // Ensure consistent line endings
  formattedCode = formattedCode.replace(/\r\n/g, '\n');
  
  // Remove trailing whitespace
  formattedCode = formattedCode.split('\n').map(line => line.trimEnd()).join('\n');
  
  // Ensure file ends with newline
  if (formattedCode.length > 0 && !formattedCode.endsWith('\n')) {
    formattedCode += '\n';
  }
  
  // Remove multiple consecutive blank lines (max 2)
  formattedCode = formattedCode.replace(/\n{4,}/g, '\n\n\n');
  
  return formattedCode;
}
