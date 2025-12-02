import React from 'react';

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  activeCampaignType: string;
  onCampaignTypeChange: (type: string) => void;
}

const eventFilters = [
  { id: 'all', label: 'All Events' },
  { id: 'role', label: 'Key Roles' },
  { id: 'content', label: 'Content Performance' },
  { id: 'campaign', label: 'Program Changes' },
];

const campaignTypeFilters = [
  { id: 'all', label: 'All Types' },
  { id: 'always_on', label: 'Always On' },
  { id: 'tactical', label: 'Tactical' },
];

export function FilterBar({ 
  activeFilter, 
  onFilterChange, 
  activeCampaignType, 
  onCampaignTypeChange 
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
      <div 
        className="flex rounded-xl p-1.5 gap-1"
        style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEBEC' }}
      >
        {eventFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className="px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 text-sm"
            style={{
              backgroundColor: activeFilter === filter.id ? '#FF7C22' : 'transparent',
              color: activeFilter === filter.id ? '#FFFFFF' : '#6B6661',
              fontWeight: activeFilter === filter.id ? 500 : 400,
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div 
        className="flex rounded-xl p-1.5 gap-1"
        style={{ backgroundColor: '#FFFFFF', border: '1px solid #EAEBEC' }}
      >
        {campaignTypeFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onCampaignTypeChange(filter.id)}
            className="px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 text-sm"
            style={{
              backgroundColor: activeCampaignType === filter.id ? '#272525' : 'transparent',
              color: activeCampaignType === filter.id ? '#FFFFFF' : '#6B6661',
              fontWeight: activeCampaignType === filter.id ? 500 : 400,
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
