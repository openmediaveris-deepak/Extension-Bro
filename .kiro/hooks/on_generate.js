/**
 * Hook: on_generate
 * 
 * Purpose: Log every time Kiro generates code
 * Logs filename + timestamp
 * Returns code unchanged
 */

export default function onGenerate({ code, filePath }) {
  const timestamp = new Date().toISOString();
  console.log(`[KIRO GENERATE] ${timestamp} - Generated: ${filePath}`);
  
  // Return code unchanged
  return code;
}
