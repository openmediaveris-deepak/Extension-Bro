import { GoogleGenAI } from '@google/genai';
import { GEMINI_API_KEY } from '../config/api';

export interface SiteAnalysis {
  isMalicious: boolean;
  confidence: number;
  reason: string;
  category?: 'phishing' | 'malware' | 'scam' | 'safe';
}

export async function analyzeSite(url: string, pageContent: string): Promise<SiteAnalysis> {
  console.log('🤖 AI Analysis Started');
  console.log('📍 URL:', url);
  console.log('📄 Page Content (first 500 chars):', pageContent.substring(0, 500));
  
  try {
    const ai = new GoogleGenAI({
      apiKey: GEMINI_API_KEY,
    });

    const prompt = `Analyze this website for security threats. URL: ${url}

Page content preview: ${pageContent.substring(0, 1000)}

Determine if this is:
- Phishing site (fake login, impersonation, fake prizes, asks for passwords/credit cards)
- Malware/malicious site
- Scam/fraud site (too good to be true, urgency tactics, fake offers)
- Safe site

Look for red flags:
- Asks for passwords, credit cards, or sensitive info
- Fake prizes or money offers
- Urgency tactics ("limited time", "act now")
- Suspicious URLs or domains
- Impersonation of legitimate services

Respond in JSON format:
{
  "isMalicious": boolean,
  "confidence": number (0-100),
  "reason": "brief explanation",
  "category": "phishing|malware|scam|safe"
}`;

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

    const text = response.text || '{}';
    console.log('📝 AI Response Text:', text);
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.warn('⚠️ No JSON found in response');
      return { isMalicious: false, confidence: 0, reason: 'Unable to analyze', category: 'safe' };
    }

    const result = JSON.parse(jsonMatch[0]);
    console.log('✅ Parsed Result:', result);
    
    return result;
  } catch (error) {
    console.error('❌ AI analysis error:', error);
    return { isMalicious: false, confidence: 0, reason: 'Analysis failed', category: 'safe' };
  }
}
