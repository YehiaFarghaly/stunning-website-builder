export interface Section {
  title: string;
  description: string;
  order: number;
  websiteIdea: string;
  createdAt: string;
}

export interface WebsiteFormProps {
  onSectionsGenerated: (sections: Section[]) => void;
}

export interface WebsitePreviewProps {
  sections: Section[];
  onReset: () => void;
}

export interface LoadingStateProps {
  // Add any props if needed
}

export interface ErrorStateProps {
  error: string;
}