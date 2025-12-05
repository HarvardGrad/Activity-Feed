import React from 'react';

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: 'all', label: 'All Events' },
  { id: 'role', label: 'Key Roles' },
  { id: 'content', label: 'Content Performance' },
  { id: 'campaign', label: 'Program Changes' },
  { id: 'reaction', label: 'Reactions' },
];

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="inline-flex bg-white rounded-full p-1.5 shadow-sm border border-[#E8E5E1] gap-1">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-200 ${
            activeFilter === filter.id
              ? 'bg-[#2D2A27] text-white shadow-sm'
              : 'text-[#6B6661] hover:text-[#2D2A27] hover:bg-[#F5F3F0]'
          }`}
        >
          <small className={`${activeFilter === filter.id ? 'font-medium' : 'font-normal'}`}>
            {filter.label}
          </small>
        </button>
      ))}
    </div>
  );
}
