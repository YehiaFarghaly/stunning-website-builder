import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-float-slow"></div>
      
      <div className="absolute top-20 left-20 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-teal-400 rounded-full animate-ping delay-1000"></div>
      <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping delay-500"></div>
    </div>
  );
};