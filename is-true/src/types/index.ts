/**
 * Type Definitions
 * 
 * Shared TypeScript types used across the extension
 */

export interface ExtensionMessage {
  type: string
  payload?: any
}

export interface ExtensionResponse {
  success: boolean
  data?: any
  error?: string
}

export interface TabInfo {
  id: number
  url: string
  title: string
  active: boolean
}

export interface StorageData {
  [key: string]: any
}

// Verification types
export interface VerificationResult {
  verdict: 'TRUE' | 'FALSE' | 'UNCERTAIN'
  confidence: number // 0-100
  evidence: string[] // 2-5 items
  summary: string
  selectedText: string
  timestamp: number
  cached: boolean
}

// Message types
export type MessageType =
  | { type: 'VERIFY_TEXT'; payload: { text: string } }
  | { type: 'VERIFICATION_RESULT'; payload: VerificationResult }
  | { type: 'VERIFICATION_ERROR'; payload: { error: string } }
  | { type: 'GET_STATE'; payload: null }
  | { type: 'SET_STATE'; payload: Partial<ExtensionState> }

// Extension state
export interface ExtensionState {
  isEnabled: boolean
  installDate: number
  version: string
  totalVerifications: number
  lastVerificationDate?: number
}
