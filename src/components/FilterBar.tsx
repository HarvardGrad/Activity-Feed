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
    <div className="flex flex-col gap-4">
      {/* Event Type Filters */}
      <div 
        className="flex rounded-xl p-1.5 gap-1 w-fit"
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

      {/* Campaign Type Filters */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium whitespace-nowrap" style={{ color: '#A9A9A9' }}>
          Campaign Type:
        </span>
        <div className="flex gap-2">
          {campaignTypeFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onCampaignTypeChange(filter.id)}
              className="px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 text-sm"
              style={{
                backgroundColor: '#FFFFFF',
                border: activeCampaignType === filter.id ? '1.5px solid #FF7C22' : '1px solid #EAEBEC',
                color: activeCampaignType === filter.id ? '#FF7C22' : '#6B6661',
                fontWeight: activeCampaignType === filter.id ? 500 : 400,
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
