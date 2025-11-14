/**
 * Result Modal Component
 * 
 * Displays verification results in a luxurious modal overlay
 */

import type { VerificationResult } from '../types'

/**
 * Create and display the verification result modal
 */
export function showResultModal(result: VerificationResult): void {
  // Remove any existing modal
  removeModal()

  // Create modal elements
  const overlay = createOverlay()
  const modal = createModalContainer()
  const closeButton = createCloseButton()
  
  // Add close button to modal
  modal.appendChild(closeButton)

  // Add result content
  const content = createResultContent(result)
  modal.appendChild(content)

  // Add dismiss button
  const dismissButton = createDismissButton()
  modal.appendChild(dismissButton)

  // Append to DOM
  overlay.appendChild(modal)
  document.body.appendChild(overlay)

  // Add event listeners for closing
  setupCloseHandlers(overlay, modal)

  // Trigger entrance animation
  requestAnimationFrame(() => {
    overlay.style.opacity = '1'
    modal.style.transform = 'scale(1)'
    modal.style.opacity = '1'
  })
}

/**
 * Create the modal overlay with blur backdrop
 */
function createOverlay(): HTMLElement {
  const overlay = document.createElement('div')
  overlay.id = 'is-true-modal-overlay'
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2147483647;
    opacity: 0;
    transition: opacity 300ms cubic-bezier(0, 0, 0.2, 1);
  `
  return overlay
}

/**
 * Create the modal container with glass morphism effect
 */
function createModalContainer(): HTMLElement {
  const modal = document.createElement('div')
  modal.id = 'is-true-modal'
  modal.style.cssText = `
    position: relative;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 24px;
    border: 1px solid;
    border-image: linear-gradient(135deg, #F59E0B 0%, #E5E7EB 100%) 1;
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.25),
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(245, 158, 11, 0.1);
    padding: 48px 40px;
    transform: scale(0.95);
    opacity: 0;
    transition: all 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #ffffff;
  `
  return modal
}

/**
 * Create the close button
 */
function createCloseButton(): HTMLElement {
  const button = document.createElement('button')
  button.id = 'is-true-modal-close'
  button.innerHTML = '×'
  button.style.cssText = `
    position: absolute;
    top: 20px;
    right: 20px;
    width: 36px;
    height: 36px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    font-size: 28px;
    line-height: 1;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 200ms ease;
    z-index: 10;
  `

  // Hover effects
  button.addEventListener('mouseenter', () => {
    button.style.background = 'rgba(239, 68, 68, 0.2)'
    button.style.transform = 'scale(1.1)'
  })

  button.addEventListener('mouseleave', () => {
    button.style.background = 'rgba(255, 255, 255, 0.1)'
    button.style.transform = 'scale(1)'
  })

  button.addEventListener('click', () => {
    closeModal()
  })

  return button
}

/**
 * Setup event handlers for closing the modal
 */
function setupCloseHandlers(overlay: HTMLElement, modal: HTMLElement): void {
  // Close on backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal()
    }
  })

  // Close on ESC key
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal()
      document.removeEventListener('keydown', handleEscape)
    }
  }
  document.addEventListener('keydown', handleEscape)
}

/**
 * Close the modal with fade-out animation
 */
export function closeModal(): void {
  const overlay = document.getElementById('is-true-modal-overlay')
  const modal = document.getElementById('is-true-modal')

  if (overlay && modal) {
    overlay.style.opacity = '0'
    modal.style.transform = 'scale(0.95)'
    modal.style.opacity = '0'

    setTimeout(() => {
      overlay.remove()
    }, 300)
  }
}

/**
 * Remove any existing modal
 */
function removeModal(): void {
  const existing = document.getElementById('is-true-modal-overlay')
  if (existing) {
    existing.remove()
  }
}

/**
 * Create the result content with luxury design
 */
function createResultContent(result: VerificationResult): HTMLElement {
  const content = document.createElement('div')
  content.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  `

  // Add verdict badge
  const badge = createVerdictBadge(result.verdict)
  content.appendChild(badge)

  // Add verdict text
  const verdictText = createVerdictText(result.verdict)
  content.appendChild(verdictText)

  // Add confidence section
  const confidenceSection = createConfidenceSection(result.confidence)
  content.appendChild(confidenceSection)

  // Add selected text quote
  const quoteCard = createQuoteCard(result.selectedText)
  content.appendChild(quoteCard)

  // Add evidence section
  const evidenceSection = createEvidenceSection(result.evidence, result.verdict)
  content.appendChild(evidenceSection)

  return content
}

/**
 * Create the verdict badge with glow effect
 */
function createVerdictBadge(verdict: 'TRUE' | 'FALSE' | 'UNCERTAIN'): HTMLElement {
  const badge = document.createElement('div')
  
  const config = getVerdictConfig(verdict)
  
  badge.style.cssText = `
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: ${config.gradient};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    box-shadow: ${config.glow}, 0 4px 12px rgba(0, 0, 0, 0.2);
    animation: pulse 2s ease-in-out infinite;
  `
  
  badge.innerHTML = config.icon
  
  return badge
}

/**
 * Create verdict text
 */
function createVerdictText(verdict: 'TRUE' | 'FALSE' | 'UNCERTAIN'): HTMLElement {
  const text = document.createElement('h2')
  text.textContent = verdict
  text.style.cssText = `
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    font-weight: 700;
    color: ${getVerdictConfig(verdict).color};
    margin: 0;
    text-transform: capitalize;
  `
  return text
}

/**
 * Create confidence section with progress bar
 */
function createConfidenceSection(confidence: number): HTMLElement {
  const section = document.createElement('div')
  section.style.cssText = `
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
  `

  // Confidence label
  const label = document.createElement('div')
  label.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #D1D5DB;
  `
  label.innerHTML = `
    <span>Confidence</span>
    <span style="font-size: 24px; font-weight: 700; color: #ffffff;">${confidence}%</span>
  `
  section.appendChild(label)

  // Progress bar container
  const progressContainer = document.createElement('div')
  progressContainer.style.cssText = `
    width: 100%;
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    overflow: hidden;
  `

  // Progress bar fill
  const progressFill = document.createElement('div')
  progressFill.style.cssText = `
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, #F59E0B 0%, #D97706 100%);
    border-radius: 4px;
    transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
  `
  progressContainer.appendChild(progressFill)
  section.appendChild(progressContainer)

  // Animate progress bar
  setTimeout(() => {
    progressFill.style.width = `${confidence}%`
  }, 100)

  return section
}

/**
 * Create quote card for selected text
 */
function createQuoteCard(text: string): HTMLElement {
  const card = document.createElement('div')
  card.style.cssText = `
    width: 100%;
    padding: 20px 24px;
    background: rgba(255, 255, 255, 0.05);
    border-left: 4px solid #F59E0B;
    border-radius: 8px;
    font-size: 16px;
    line-height: 1.6;
    color: #E5E7EB;
    font-style: italic;
  `
  card.textContent = `"${text}"`
  return card
}

/**
 * Create evidence section
 */
function createEvidenceSection(evidence: string[], verdict: 'TRUE' | 'FALSE' | 'UNCERTAIN'): HTMLElement {
  const section = document.createElement('div')
  section.style.cssText = `
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  `

  // Section title
  const title = document.createElement('h3')
  title.textContent = 'Why this verdict?'
  title.style.cssText = `
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
  `
  section.appendChild(title)

  // Evidence list
  const list = document.createElement('ul')
  list.style.cssText = `
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  `

  const bulletColor = getVerdictConfig(verdict).color

  evidence.forEach((item) => {
    const listItem = document.createElement('li')
    listItem.style.cssText = `
      display: flex;
      gap: 12px;
      font-size: 14px;
      line-height: 1.6;
      color: #D1D5DB;
    `
    
    const bullet = document.createElement('span')
    bullet.textContent = '•'
    bullet.style.cssText = `
      color: ${bulletColor};
      font-size: 20px;
      line-height: 1.4;
      flex-shrink: 0;
    `
    
    const text = document.createElement('span')
    text.textContent = item
    
    listItem.appendChild(bullet)
    listItem.appendChild(text)
    list.appendChild(listItem)
  })

  section.appendChild(list)
  return section
}

/**
 * Create dismiss button
 */
function createDismissButton(): HTMLElement {
  const button = document.createElement('button')
  button.textContent = 'Dismiss'
  button.style.cssText = `
    width: 100%;
    margin-top: 24px;
    padding: 14px 24px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 200ms ease;
    font-family: 'Inter', sans-serif;
  `

  button.addEventListener('mouseenter', () => {
    button.style.background = 'rgba(255, 255, 255, 0.15)'
    button.style.transform = 'translateY(-2px)'
    button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
  })

  button.addEventListener('mouseleave', () => {
    button.style.background = 'rgba(255, 255, 255, 0.1)'
    button.style.transform = 'translateY(0)'
    button.style.boxShadow = 'none'
  })

  button.addEventListener('click', () => {
    closeModal()
  })

  return button
}

/**
 * Get verdict-specific configuration
 */
function getVerdictConfig(verdict: 'TRUE' | 'FALSE' | 'UNCERTAIN') {
  const configs = {
    TRUE: {
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      glow: '0 0 40px rgba(16, 185, 129, 0.4)',
      color: '#10B981',
      icon: '✓'
    },
    FALSE: {
      gradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
      glow: '0 0 40px rgba(239, 68, 68, 0.4)',
      color: '#EF4444',
      icon: '✕'
    },
    UNCERTAIN: {
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      glow: '0 0 40px rgba(245, 158, 11, 0.4)',
      color: '#F59E0B',
      icon: '?'
    }
  }
  return configs[verdict]
}

/**
 * Add pulse animation to document
 */
function addPulseAnimation(): void {
  if (!document.getElementById('is-true-pulse-animation')) {
    const style = document.createElement('style')
    style.id = 'is-true-pulse-animation'
    style.textContent = `
      @keyframes pulse {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.9;
          transform: scale(1.05);
        }
      }
    `
    document.head.appendChild(style)
  }
}

// Add pulse animation on module load
addPulseAnimation()

/**
 * Show error modal with premium design
 */
export function showErrorModal(error: string, isRetryable: boolean = false): void {
  // Remove any existing modal
  removeModal()

  // Create modal elements
  const overlay = createOverlay()
  const modal = createModalContainer()
  const closeButton = createCloseButton()
  
  // Add close button to modal
  modal.appendChild(closeButton)

  // Add error content
  const content = createErrorContent(error, isRetryable)
  modal.appendChild(content)

  // Append to DOM
  overlay.appendChild(modal)
  document.body.appendChild(overlay)

  // Add event listeners for closing
  setupCloseHandlers(overlay, modal)

  // Trigger entrance animation
  requestAnimationFrame(() => {
    overlay.style.opacity = '1'
    modal.style.transform = 'scale(1)'
    modal.style.opacity = '1'
  })
}

/**
 * Create error content
 */
function createErrorContent(error: string, isRetryable: boolean): HTMLElement {
  const content = document.createElement('div')
  content.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  `

  // Error icon
  const icon = document.createElement('div')
  icon.style.cssText = `
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    box-shadow: 0 0 40px rgba(239, 68, 68, 0.4), 0 4px 12px rgba(0, 0, 0, 0.2);
  `
  icon.innerHTML = '⚠️'
  content.appendChild(icon)

  // Error title
  const title = document.createElement('h2')
  title.textContent = 'Error'
  title.style.cssText = `
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    font-weight: 700;
    color: #EF4444;
    margin: 0;
  `
  content.appendChild(title)

  // Error message
  const message = document.createElement('p')
  message.textContent = getErrorMessage(error)
  message.style.cssText = `
    font-size: 16px;
    line-height: 1.6;
    color: #D1D5DB;
    text-align: center;
    margin: 0;
    max-width: 400px;
  `
  content.appendChild(message)

  // Buttons container
  const buttonsContainer = document.createElement('div')
  buttonsContainer.style.cssText = `
    width: 100%;
    display: flex;
    gap: 12px;
    margin-top: 8px;
  `

  // Retry button (if retryable)
  if (isRetryable) {
    const retryButton = document.createElement('button')
    retryButton.textContent = 'Retry'
    retryButton.style.cssText = `
      flex: 1;
      padding: 14px 24px;
      background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
      border: none;
      border-radius: 12px;
      color: #ffffff;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: all 200ms ease;
      font-family: 'Inter', sans-serif;
    `

    retryButton.addEventListener('mouseenter', () => {
      retryButton.style.transform = 'translateY(-2px)'
      retryButton.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15)'
    })

    retryButton.addEventListener('mouseleave', () => {
      retryButton.style.transform = 'translateY(0)'
      retryButton.style.boxShadow = 'none'
    })

    retryButton.addEventListener('click', () => {
      closeModal()
      // Trigger retry logic (will be handled by content script)
      window.dispatchEvent(new CustomEvent('is-true-retry'))
    })

    buttonsContainer.appendChild(retryButton)
  }

  // Dismiss button
  const dismissButton = document.createElement('button')
  dismissButton.textContent = 'Dismiss'
  dismissButton.style.cssText = `
    flex: 1;
    padding: 14px 24px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 200ms ease;
    font-family: 'Inter', sans-serif;
  `

  dismissButton.addEventListener('mouseenter', () => {
    dismissButton.style.background = 'rgba(255, 255, 255, 0.15)'
    dismissButton.style.transform = 'translateY(-2px)'
    dismissButton.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
  })

  dismissButton.addEventListener('mouseleave', () => {
    dismissButton.style.background = 'rgba(255, 255, 255, 0.1)'
    dismissButton.style.transform = 'translateY(0)'
    dismissButton.style.boxShadow = 'none'
  })

  dismissButton.addEventListener('click', () => {
    closeModal()
  })

  buttonsContainer.appendChild(dismissButton)
  content.appendChild(buttonsContainer)

  return content
}

/**
 * Get user-friendly error message
 */
function getErrorMessage(error: string): string {
  const errorLower = error.toLowerCase()

  if (errorLower.includes('api key') || errorLower.includes('apikey')) {
    return 'API key not configured. Please follow the setup instructions in the README to configure your Gemini API key.'
  }

  if (errorLower.includes('network') || errorLower.includes('fetch') || errorLower.includes('connection')) {
    return 'Unable to connect. Please check your internet connection and try again.'
  }

  if (errorLower.includes('timeout')) {
    return 'Request timed out. The claim may be too complex. Please try with a shorter text.'
  }

  if (errorLower.includes('rate limit') || errorLower.includes('429')) {
    return 'Rate limit exceeded. Please wait a moment and try again.'
  }

  if (errorLower.includes('401') || errorLower.includes('unauthorized')) {
    return 'Invalid API key. Please check your configuration and ensure your API key is correct.'
  }

  if (errorLower.includes('500') || errorLower.includes('503') || errorLower.includes('service')) {
    return 'Service temporarily unavailable. Please try again later.'
  }

  // Default error message
  return error || 'An unexpected error occurred. Please try again.'
}
