import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className="bg-white rounded-full p-1.5 shadow-sm border border-[#E8E5E1] flex items-center gap-2 w-full max-w-md">
      <Search className="w-4 h-4 text-[#6B6661] flex-shrink-0 ml-2" />
      <input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 bg-transparent text-[#6B6661] placeholder-italic placeholder-[#6B6661] focus:outline-none text-xs pr-2"
      />
      {searchTerm && (
        <button
          onClick={() => onSearchChange('')}
          className="p-1 hover:bg-[#F5F3F0] rounded-full transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4 text-[#6B6661]" />
        </button>
      )}
    </div>
  );
}
