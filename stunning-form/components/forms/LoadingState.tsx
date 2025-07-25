import React from 'react';

export const LoadingState: React.FC = () => {
  return (
    <div className="mt-10">
      <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-xl border border-emerald-500/30 rounded-2xl">
        <div className="p-8 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-ping opacity-75"></div>
            </div>
            <div className="text-left">
              <p className="text-emerald-200 font-bold text-lg">Creating your website content...</p>
              <p className="text-emerald-300 text-sm">This may take a few moments</p>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};