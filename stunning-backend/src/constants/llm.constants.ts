export const LLM_CONSTANTS = {
  MODEL: 'llama-3.3-70b-versatile',
  TEMPERATURE: 0.8,
  MAX_TOKENS: 1500,
  SECTIONS_COUNT: 3,
  FALLBACK_PHONE: '(555) 123-4567',
  FALLBACK_ADDRESS: '456 Business Ave, Suite 100',
};

export const PROMPT_TEMPLATE = `
You are a professional copywriter and web content creator. Generate actual website content for a {websiteIdea}.

Create exactly 3 complete website sections with real, ready-to-use content:

1. **Hero Section**: Write a compelling headline, subheadline, and call-to-action button text
2. **Main Content Section**: Write detailed content about the business/service (2-3 paragraphs)
3. **Contact/CTA Section**: Write contact information, final call-to-action, and closing message

Make the content:
- Professional and engaging
- Specific to the business type
- Ready to publish on a real website
- Include actual text, not placeholders

Respond in this exact JSON format:
{
  "sections": [
    {
      "title": "Hero Section",
      "description": "Welcome to [Business Name] - Your Premier [Service/Product]\\n\\nSubheadline: [Compelling subheadline about value proposition]\\n\\nButton: [Call-to-action text]"
    },
    {
      "title": "About Our Services",
      "description": "[2-3 paragraphs of actual content describing the business, services, what makes it special, benefits to customers, etc. Write real content, not placeholders.]"
    },
    {
      "title": "Get In Touch",
      "description": "Ready to [action]? Contact us today!\\n\\nPhone: [realistic phone number]\\nEmail: [realistic email]\\nAddress: [realistic address]\\n\\n[Final compelling call-to-action message]"
    }
  ]
}
`;

export const FALLBACK_SECTIONS = {
  WELCOME: {
    title: 'Welcome',
    getDescription: (websiteIdea: string) => 
      `Welcome to ${websiteIdea}\n\nYour trusted partner for exceptional service and quality results.\n\nButton: Get Started Today`,
  },
  SERVICES: {
    title: 'Our Services',
    getDescription: (websiteIdea: string) => 
      `We specialize in providing top-quality ${websiteIdea} services that exceed expectations. Our experienced team is dedicated to delivering results that matter to you and your business.\n\nWith years of expertise and a commitment to excellence, we understand what it takes to succeed in today's competitive market. Let us help you achieve your goals with our proven approach and personalized service.`,
  },
  CONTACT: {
    title: 'Contact Us',
    getDescription: (websiteIdea: string) => 
      `Ready to get started? Contact us today!\n\nPhone: ${LLM_CONSTANTS.FALLBACK_PHONE}\nEmail: info@${websiteIdea.replace(/\s+/g, '').toLowerCase()}.com\nAddress: ${LLM_CONSTANTS.FALLBACK_ADDRESS}\n\nWe're here to help you succeed. Reach out today for a free consultation!`,
  },
};