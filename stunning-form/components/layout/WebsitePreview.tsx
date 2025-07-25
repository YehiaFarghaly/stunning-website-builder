import React from 'react';
import { WebsitePreviewProps } from '../../types';
import { formatContent } from '../../utils/formatContent';

export const WebsitePreview: React.FC<WebsitePreviewProps> = ({ sections, onReset }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="fixed top-8 right-8 z-50">
        <button
          onClick={onReset}
          className="group bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 px-8 py-4 rounded-2xl font-semibold flex items-center space-x-3 hover:scale-105"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <span>Back to Editor</span>
        </button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="absolute top-8 left-8 z-40">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 text-sm font-bold shadow-2xl rounded-2xl backdrop-blur-xl border border-white/20 flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>Live Preview</span>
          </div>
        </div>

        <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-emerald-900 text-white py-32 px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-lg animate-float-slow"></div>
          
          <div className="relative max-w-6xl mx-auto text-center">
            <div className="prose prose-2xl prose-invert max-w-none">
              {formatContent(sections[0]?.description || '', true)}
            </div>
          </div>
        </section>

        <section className="py-24 px-8 bg-gradient-to-br from-white via-slate-50 to-gray-100 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 to-white/80 backdrop-blur-sm"></div>
          <div className="relative max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-transparent bg-gradient-to-r from-slate-900 via-emerald-600 to-teal-600 bg-clip-text mb-6">
                {sections[1]?.title}
              </h2>
              <div className="w-32 h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 mx-auto rounded-full shadow-lg"></div>
            </div>
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl hover:shadow-emerald-500/10 transition-all duration-700 rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative p-12">
                <div className="prose prose-xl max-w-none text-slate-700">
                  {formatContent(sections[1]?.description || '')}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-8 bg-gradient-to-br from-slate-100 via-emerald-50 to-teal-50 relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative max-w-6xl mx-auto text-center">
            <div className="mb-16">
              <h2 className="text-5xl font-black text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text mb-6">
                {sections[2]?.title}
              </h2>
              <div className="w-32 h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 mx-auto rounded-full shadow-lg"></div>
            </div>
            <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-700 rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative p-12">
                <div className="prose prose-xl max-w-none">
                  {formatContent(sections[2]?.description || '')}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};