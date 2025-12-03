import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className="relative w-full rounded-lg overflow-hidden">
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-[#6B6661]" />
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#E8E5E1] text-[#6B6661] placeholder-[#6B6661] focus:outline-none focus:ring-2 focus:ring-[#E69158] focus:border-transparent transition-all text-xs"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 p-1 hover:bg-[#F5F3F0] rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-[#6B6661]" />
          </button>
        )}
      </div>
    </div>
  );
}
