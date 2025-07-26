import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import Groq from 'groq-sdk';
import { LLM_CONSTANTS, PROMPT_TEMPLATE, FALLBACK_SECTIONS } from '../constants/llm.constants';
import * as crypto from 'crypto';

interface CacheEntry {
  data: { title: string; description: string }[];
  timestamp: number;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

@Injectable()
export class LlmService {
  private groq: Groq;
  private cache = new Map<string, CacheEntry>();
  private rateLimitMap = new Map<string, RateLimitEntry>();

  constructor() {
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
    
    setInterval(() => this.cleanupCache(), LLM_CONSTANTS.CACHE_CLEANUP_INTERVAL);
    setInterval(() => this.cleanupRateLimit(), LLM_CONSTANTS.RATE_LIMIT_CLEANUP_INTERVAL);
  }

  async generateWebsiteSections(
    websiteIdea: string,
    clientIp?: string
  ): Promise<{ title: string; description: string }[]> {
    
    if (clientIp && !this.checkRateLimit(clientIp)) {
      throw new HttpException(
        'Rate limit exceeded. Please try again later.',
        HttpStatus.TOO_MANY_REQUESTS
      );
    }


    const cacheKey = this.generateCacheKey(websiteIdea);
    const cachedResult = this.getFromCache(cacheKey);
    if (cachedResult) {
      console.log('Cache hit for website idea:', websiteIdea.substring(0, 50) + '...');
      return cachedResult;
    }

    const prompt = PROMPT_TEMPLATE.replace('{websiteIdea}', websiteIdea);

    try {
      console.log('Making LLM API call for:', websiteIdea.substring(0, 50) + '...');
      
      const completion = await this.groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: LLM_CONSTANTS.MODEL,
        temperature: LLM_CONSTANTS.TEMPERATURE,
        max_tokens: LLM_CONSTANTS.MAX_TOKENS,
        response_format: { type: 'json_object' },
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from LLM');
      }

      console.log('Raw LLM Response:', response);
      const parsedResponse = JSON.parse(response);
      const sections = parsedResponse.sections;
      
      if (!Array.isArray(sections) || sections.length !== LLM_CONSTANTS.SECTIONS_COUNT) {
        console.error('Invalid sections structure:', sections);
        throw new Error('Invalid response format from LLM');
      }

      for (const section of sections) {
        if (!section.title || !section.description) {
          console.error('Invalid section structure:', section);
          throw new Error('Section missing required fields');
        }
      }

      this.setCache(cacheKey, sections);
      
      console.log('Successfully generated and cached content sections:', sections);
      return sections;
    } catch (error) {
      console.error('LLM generation error:', error);
      const fallbackSections = this.getFallbackSections(websiteIdea);
      
      this.setCache(cacheKey, fallbackSections, LLM_CONSTANTS.CACHE_FALLBACK_TTL);
      
      return fallbackSections;
    }
  }

  private checkRateLimit(clientIp: string): boolean {
    const now = Date.now();
    const rateLimitEntry = this.rateLimitMap.get(clientIp);

    if (!rateLimitEntry) {
      this.rateLimitMap.set(clientIp, {
        count: 1,
        resetTime: now + LLM_CONSTANTS.RATE_LIMIT_WINDOW
      });
      return true;
    }

    if (now > rateLimitEntry.resetTime) {
      this.rateLimitMap.set(clientIp, {
        count: 1,
        resetTime: now + LLM_CONSTANTS.RATE_LIMIT_WINDOW
      });
      return true;
    }

    if (rateLimitEntry.count >= LLM_CONSTANTS.RATE_LIMIT_MAX_REQUESTS) {
      return false;
    }

    rateLimitEntry.count++;
    return true;
  }

  private generateCacheKey(websiteIdea: string): string {
    return crypto.createHash('md5').update(websiteIdea.toLowerCase().trim()).digest('hex');
  }

  private getFromCache(key: string): { title: string; description: string }[] | null {
    const entry = this.cache.get(key);
    if (!entry) {
      return null;
    }

    const now = Date.now();
    if (now - entry.timestamp > LLM_CONSTANTS.CACHE_TTL) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  private setCache(
    key: string, 
    data: { title: string; description: string }[], 
    ttl: number = LLM_CONSTANTS.CACHE_TTL
  ): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  private cleanupCache(): void {
    const now = Date.now();
    let cleanedCount = 0;
    
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > LLM_CONSTANTS.CACHE_TTL) {
        this.cache.delete(key);
        cleanedCount++;
      }
    }
    
    if (cleanedCount > 0) {
      console.log(`Cleaned up ${cleanedCount} expired cache entries`);
    }
  }

  private cleanupRateLimit(): void {
    const now = Date.now();
    let cleanedCount = 0;
    
    for (const [ip, entry] of this.rateLimitMap.entries()) {
      if (now > entry.resetTime) {
        this.rateLimitMap.delete(ip);
        cleanedCount++;
      }
    }
    
    if (cleanedCount > 0) {
      console.log(`Cleaned up ${cleanedCount} expired rate limit entries`);
    }
  }

  private getFallbackSections(websiteIdea: string): {
    title: string;
    description: string;
  }[] {
    return [
      {
        title: FALLBACK_SECTIONS.WELCOME.title,
        description: FALLBACK_SECTIONS.WELCOME.getDescription(websiteIdea),
      },
      {
        title: FALLBACK_SECTIONS.SERVICES.title,
        description: FALLBACK_SECTIONS.SERVICES.getDescription(websiteIdea),
      },
      {
        title: FALLBACK_SECTIONS.CONTACT.title,
        description: FALLBACK_SECTIONS.CONTACT.getDescription(websiteIdea),
      },
    ];
  }

  getCacheStats(): { size: number; hitRate?: number } {
    return {
      size: this.cache.size
    };
  }

  getRateLimitStats(): { activeIPs: number } {
    return {
      activeIPs: this.rateLimitMap.size
    };
  }
}
