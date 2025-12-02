import React from 'react';

export function CompanyLogo() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Soft rounded container */}
      <rect width="56" height="56" rx="14" fill="#2D2A27"/>
      
      {/* Left peak */}
      <path 
        d="M14 36 L21 20 L28 36 Z" 
        fill="#E69158"
        opacity="0.85"
      />
      
      {/* Right peak (taller) */}
      <path 
        d="M26 36 L35 14 L44 36 Z" 
        fill="#E69158"
      />
      
      {/* Base line */}
      <line 
        x1="12" 
        y1="36" 
        x2="44" 
        y2="36" 
        stroke="#E69158" 
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Accent detail on right peak */}
      <path 
        d="M35 14 L39 25 L35 25 Z" 
        fill="#FFFFFF"
        opacity="0.25"
      />
    </svg>
  );
}
