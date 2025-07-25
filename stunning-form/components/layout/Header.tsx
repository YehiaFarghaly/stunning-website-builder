import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="text-center mb-16">
      <div className="group inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl mb-8 shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500 hover:scale-110 hover:rotate-3">
        <svg className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      </div>
      <h1 className="text-6xl md:text-7xl font-black text-transparent bg-gradient-to-r from-slate-100 via-white to-slate-100 bg-clip-text mb-6 leading-tight">
        AI Website Content Generator
      </h1>
      <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
        Transform your ideas into <span className="text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text font-semibold">professional website content</span> in seconds. Powered by cutting-edge AI technology.
      </p>
    </div>
  );
};