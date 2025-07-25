'use client';

import { useState } from 'react';
import { Section } from '../types';
import { Header } from '../components/layout/Header';
import { Background } from '../components/layout/Background';
import { WebsiteForm } from '../components/forms/WebsiteForm';
import { WebsitePreview } from '../components/layout/WebsitePreview';
import { Features } from '../components/layout/Features';

export default function Home() {
  const [sections, setSections] = useState<Section[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleSectionsGenerated = (newSections: Section[]) => {
    setSections(newSections);
    setShowPreview(true);
  };

  const handleReset = () => {
    setSections([]);
    setShowPreview(false);
  };

  if (showPreview && sections.length > 0) {
    return <WebsitePreview sections={sections} onReset={handleReset} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <Background />
      
      <div className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <Header />
          <WebsiteForm onSectionsGenerated={handleSectionsGenerated} />
          <Features />
        </div>
      </div>
    </div>
  );
}