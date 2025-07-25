import React, { useState } from 'react';
import { createSections } from '../../lib/api';
import { WebsiteFormProps } from '../../types';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';

export const WebsiteForm: React.FC<WebsiteFormProps> = ({ onSectionsGenerated }) => {
  const [websiteIdea, setWebsiteIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedInput, setFocusedInput] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteIdea.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const newSections = await createSections(websiteIdea);
      onSectionsGenerated(newSections);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate website');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
      
      <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10"></div>
        
        <div className="relative p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-6">
              <label htmlFor="websiteIdea" className="block text-xl font-bold text-white mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl mr-3 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                What kind of website do you want to create?
              </label>
              
              <div className="relative group">
                <div className={`absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${focusedInput ? 'opacity-50' : ''}`}></div>
                
                <textarea
                  id="websiteIdea"
                  value={websiteIdea}
                  onChange={(e) => setWebsiteIdea(e.target.value)}
                  onFocus={() => setFocusedInput(true)}
                  onBlur={() => setFocusedInput(false)}
                  placeholder="e.g., a modern bakery website with online ordering, personal portfolio for a graphic designer, eco-friendly fashion store..."
                  className={`relative w-full px-8 py-6 bg-white/10 backdrop-blur-xl border-2 rounded-2xl focus:ring-4 focus:ring-emerald-500/30 resize-none transition-all duration-500 text-white placeholder-slate-300 text-lg ${
                    focusedInput 
                      ? 'border-emerald-400 bg-white/20 shadow-2xl shadow-emerald-500/20' 
                      : 'border-white/30 hover:border-white/50'
                  }`}
                  rows={5}
                  disabled={loading}
                />
                
                <div className={`absolute bottom-6 right-6 transition-all duration-500 ${
                  websiteIdea.length > 10 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-75'
                }`}>
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-slate-300">
                <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <p className="text-sm leading-relaxed">
                  Be specific about your business type, target audience, and key features for best results
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !websiteIdea.trim()}
              className="group relative w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 disabled:from-slate-600 disabled:to-slate-600 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/50 disabled:hover:scale-100 disabled:hover:shadow-none overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative flex items-center justify-center space-x-3">
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-lg">Generating Content...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <span className="text-lg">Generate Website Content</span>
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </div>
            </button>
          </form>

          {loading && <LoadingState />}
          {error && <ErrorState error={error} />}
        </div>
      </div>
    </div>
  );
};