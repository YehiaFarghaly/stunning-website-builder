const API_BASE_URL = 'http://localhost:3001';

export interface Section {
  title: string;
  description: string;
  order: number;
  websiteIdea: string;
  createdAt: string;
}

export interface CreateSectionsRequest {
  websiteIdea: string;
}

export class ApiClient {
  static async createSections(data: CreateSectionsRequest): Promise<Section[]> {
    const response = await fetch(`${API_BASE_URL}/sections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create sections');
    }

    return response.json();
  }

  static async getSections(websiteIdea: string): Promise<Section[]> {
    const response = await fetch(`${API_BASE_URL}/sections?websiteIdea=${encodeURIComponent(websiteIdea)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch sections');
    }

    return response.json();
  }
}

// Export convenience functions for direct import
export const createSections = (websiteIdea: string): Promise<Section[]> => {
  return ApiClient.createSections({ websiteIdea });
};

export const getSections = (websiteIdea: string): Promise<Section[]> => {
  return ApiClient.getSections(websiteIdea);
};