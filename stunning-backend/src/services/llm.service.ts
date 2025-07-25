import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';
import { LLM_CONSTANTS, PROMPT_TEMPLATE, FALLBACK_SECTIONS } from '../constants/llm.constants';

@Injectable()
export class LlmService {
  private groq: Groq;

  constructor() {
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }

  async generateWebsiteSections(websiteIdea: string): Promise<{
    title: string;
    description: string;
  }[]> {
    const prompt = PROMPT_TEMPLATE.replace('{websiteIdea}', websiteIdea);

    try {
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

      console.log('Successfully generated content sections:', sections);
      return sections;
    } catch (error) {
      console.error('LLM generation error:', error);
      return this.getFallbackSections(websiteIdea);
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
}
