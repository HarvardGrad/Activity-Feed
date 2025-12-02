import React, { useState, useMemo } from 'react';
import { Activity } from 'lucide-react';
import { FilterBar } from './components/FilterBar';
import { TimelineEvent } from './components/TimelineEvent';
import { CompanyLogo } from './components/CompanyLogo';
import { mockEvents } from './data/mockEvents';
import type { ActivityEvent } from './types/activity';

export default function App() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCampaignType, setActiveCampaignType] = useState('all');

  const filteredEvents = useMemo(() => {
    let events = mockEvents;
    
    if (activeFilter !== 'all') {
      const categoryMap: Record<string, string> = {
        campaign: 'campaign',
        content: 'content',
        role: 'role',
      };
      events = events.filter(event => event.category === categoryMap[activeFilter]);
    }
    
    if (activeCampaignType !== 'all') {
      const typeMap: Record<string, string> = {
        always_on: 'Always On',
        tactical: 'Tactical',
      };
      events = events.filter(event => event.metadata?.campaignType === typeMap[activeCampaignType]);
    }
    
    return events;
  }, [activeFilter, activeCampaignType]);

  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <CompanyLogo />
            <div>
              <h1 className="mb-1" style={{ color: '#272525' }}>Target Timeline</h1>
              <p className="text-sm" style={{ color: '#6B6661' }}>IronPeak Minerals Group</p>
            </div>
          </div>
          
          <div className="h-px mb-6" style={{ backgroundColor: '#EAEBEC' }}></div>

          <div className="overflow-x-auto">
            <FilterBar 
              activeFilter={activeFilter} 
              onFilterChange={setActiveFilter}
              activeCampaignType={activeCampaignType}
              onCampaignTypeChange={setActiveCampaignType}
            />
          </div>
        </div>

        <div className="relative">
          {filteredEvents.length > 0 ? (
            <div className="space-y-0">
              {filteredEvents.map((event, index) => (
                <TimelineEvent 
                  key={event.id} 
                  event={event} 
                  isLast={index === filteredEvents.length - 1}
                />
              ))}
            </div>
          ) : (
            <div 
              className="bg-white rounded-xl p-16 text-center"
              style={{ border: '1px solid #EAEBEC' }}
            >
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: '#F5F5F5' }}
              >
                <Activity className="w-10 h-10" style={{ color: '#A9A9A9' }} />
              </div>
              <h3 className="mb-2" style={{ color: '#272525' }}>No events found</h3>
              <p style={{ color: '#6B6661' }}>
                Try adjusting your filters to see more activity.
              </p>
            </div>
          )}
        </div>

        {filteredEvents.length > 0 && (
          <div className="text-center mt-10 pb-4">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full"
              style={{ border: '1px solid #EAEBEC' }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#FF7C22' }}></div>
              <span className="text-sm" style={{ color: '#6B6661' }}>
                Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
