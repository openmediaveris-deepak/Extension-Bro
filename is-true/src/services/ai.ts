/**
 * AI Service
 * 
 * Handles fact-checking verification using Google's Gemini AI
 */

import { GoogleGenAI } from '@google/genai';
import { GEMINI_API_KEY } from '../config/api';
import type { VerificationResult } from '../types';

/**
 * Verifies the truthfulness of a text claim using AI
 * @param text - The text claim to verify
 * @returns Promise<VerificationResult> - The verification result with verdict, confidence, and evidence
 */
export async function verifyText(text: string): Promise<VerificationResult> {
  console.log('🤖 AI Verification Started');
  console.log('📝 Text to verify:', text);
  
  try {
    const ai = new GoogleGenAI({
      apiKey: GEMINI_API_KEY,
    });

    // Create the verification prompt
    const prompt = `You are a fact-checking AI assistant. Analyze the following claim and determine its truthfulness.

Claim: "${text}"

Instructions:
1. Search your knowledge base and consider recent information
2. Evaluate the claim's accuracy
3. Provide a verdict: TRUE, FALSE, or UNCERTAIN
4. Assign a confidence level (0-100%)
5. List 2-5 specific evidence points supporting your verdict

Respond in JSON format:
{
  "verdict": "TRUE" | "FALSE" | "UNCERTAIN",
  "confidence": number,
  "evidence": string[],
  "summary": string
}

Be objective, cite specific facts, and acknowledge uncertainty when appropriate.`;

    console.log('📤 Sending to Gemini AI...');

    const model = 'gemini-flash-latest';
    const contents = [{
      role: 'user',
      parts: [{ text: prompt }],
    }];

    const response = await ai.models.generateContent({
      model,
      contents,
    });

    console.log('📥 Response received');

    const responseText = response.text || '{}';
    console.log('📝 AI Response Text:', responseText);

    // Parse AI response - extract JSON from response text
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      console.warn('⚠️ No JSON found in response');
      throw new Error('Failed to parse AI response: No JSON found');
    }

    const parsedResponse = JSON.parse(jsonMatch[0]);
    console.log('✅ Parsed Result:', parsedResponse);

    // Validate response structure
    if (!parsedResponse.verdict || !parsedResponse.confidence || !parsedResponse.evidence) {
      throw new Error('Invalid response structure from AI');
    }

    // Return VerificationResult object
    const verificationResult: VerificationResult = {
      verdict: parsedResponse.verdict,
      confidence: parsedResponse.confidence,
      evidence: parsedResponse.evidence,
      summary: parsedResponse.summary || '',
      selectedText: text,
      timestamp: Date.now(),
      cached: false
    };

    return verificationResult;

  } catch (error) {
    // Handle errors by returning error in a structured format
    console.error('❌ AI verification error:', error);
    
    // Return error as VerificationResult with UNCERTAIN verdict
    return {
      verdict: 'UNCERTAIN',
      confidence: 0,
      evidence: ['An error occurred during verification'],
      summary: error instanceof Error ? error.message : 'Unknown error occurred',
      selectedText: text,
      timestamp: Date.now(),
      cached: false
    };
  }
}
