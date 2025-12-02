import React from 'react';

export function CompanyLogo() {
  return (
    <svg width="52" height="52" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="56" height="56" rx="12" fill="#272525"/>
      <path 
        d="M14 36 L21 20 L28 36 Z" 
        fill="#FF7C22"
        opacity="0.85"
      />
      <path 
        d="M26 36 L35 14 L44 36 Z" 
        fill="#FF7C22"
      />
      <line 
        x1="12" 
        y1="36" 
        x2="44" 
        y2="36" 
        stroke="#FF7C22" 
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path 
        d="M35 14 L39 25 L35 25 Z" 
        fill="#FFFFFF"
        opacity="0.25"
      />
    </svg>
  );
}
