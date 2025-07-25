import React from 'react';

export const formatContent = (content: string, isHeroSection = false) => {
  return content.split('\n').map((line, index) => {
    if (line.startsWith('Button:')) {
      return (
        <button 
          key={index} 
          className="group relative mt-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white font-bold py-4 px-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative flex items-center justify-center space-x-2">
            <span>{line.replace('Button:', '').trim()}</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </button>
      );
    }
    if (line.startsWith('Phone:') || line.startsWith('Email:') || line.startsWith('Address:')) {
      return (
        <div key={index} className="group flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-slate-50/80 to-gray-50/80 backdrop-blur-sm border border-slate-200/50 hover:border-emerald-200/60 transition-all duration-300 hover:shadow-lg mb-4">
          <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
          <p className="text-slate-700">
            <span className="font-bold text-slate-900 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {line.split(':')[0]}:
            </span>{' '}
            <span className="text-slate-600">{line.split(':').slice(1).join(':').trim()}</span>
          </p>
        </div>
      );
    }
    if (line.trim()) {
      return <p key={index} className={`mb-6 leading-relaxed text-lg ${
        isHeroSection ? 'text-slate-200' : 'text-slate-700'
      }`}>{line}</p>;
    }
    return <br key={index} />;
  });
};