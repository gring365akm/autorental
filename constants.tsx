
import React from 'react';

export const COLORS = {
  primary: '#4338CA', // Soothing Indigo
  secondary: '#EF4444', // Classic Red for Matt's
  accent: '#6366F1', // Lighter Indigo
  dark: '#0F172A',
  light: '#F8FAFC',
};

export const Logo = () => (
  <div className="flex flex-col items-center">
    <div className="bg-[#EF4444] text-white px-4 py-1 font-black text-2xl tracking-tighter leading-none border-t-2 border-x-2 border-slate-800 shadow-sm">
      MATT'S
    </div>
    <div className="bg-[#4338CA] text-white px-3 py-1 font-bold text-lg tracking-wide border-b-2 border-x-2 border-slate-800 shadow-sm">
      AUTO RENTAL
    </div>
  </div>
);
