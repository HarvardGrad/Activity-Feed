import React, { useState, useMemo } from 'react';
import { Activity } from 'lucide-react';
import { FilterBar } from './components/FilterBar';
import { SearchBar } from './components/SearchBar';
import { TimelineEvent } from './components/TimelineEvent';
import { CompanyLogo } from './components/CompanyLogo';
import { mockEvents } from './data/mockEvents';
import type { ActivityEvent } from './types/activity';

export default function App() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = useMemo(() => {
    let filtered = mockEvents;

    // Apply category filter
    if (activeFilter !== 'all') {
      const categoryMap: Record<string, string> = {
        campaign: 'campaign',
        content: 'content',
        role: 'role',
      };
      filtered = filtered.filter(event => {
        return event.category === categoryMap[activeFilter];
      });
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(event => {
        return (
          event.title.toLowerCase().includes(term) ||
          event.description.toLowerCase().includes(term) ||
          event.metadata?.roleTitle?.toLowerCase().includes(term) ||
          event.metadata?.campaignName?.toLowerCase().includes(term) ||
          event.metadata?.contentTitle?.toLowerCase().includes(term)
        );
      });
    }

    return filtered;
  }, [activeFilter, searchTerm]);

  return (
    <div className="min-h-screen bg-[#FAF9F7] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <CompanyLogo />
            <div>
              <h1 className="text-[#2D2A27] mb-1">Target Timeline</h1>
              <p className="text-[#6B6661]">IronPeak Minerals Group</p>
            </div>
          </div>
          
          {/* Subtle divider */}
          <div className="h-px bg-gradient-to-r from-[#E8E5E1] via-[#E8E5E1]/50 to-transparent mb-8"></div>

          {/* Search */}
          <div className="mb-6">
            <SearchBar 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm} 
            />
          </div>

          {/* Filters */}
          <div className="flex justify-start">
            <FilterBar 
              activeFilter={activeFilter} 
              onFilterChange={setActiveFilter} 
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {filteredEvents.length > 0 ? (
            <div className="space-y-0">
              {filteredEvents.map((event, index) => (
                <TimelineEvent 
                  key={event.id} 
                  event={event} 
                  isLast={index === filteredEvents.length - 1}
                  onLabelClick={setSearchTerm}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8E5E1]/60 p-16 text-center">
              <div className="w-20 h-20 bg-[#FAF9F7] rounded-full flex items-center justify-center mx-auto mb-6">
                <Activity className="w-10 h-10 text-[#9B9692]" />
              </div>
              <h3 className="text-[#2D2A27] mb-2">No events found</h3>
              <p className="text-[#6B6661]">
                Try adjusting your filters to see more activity.
              </p>
            </div>
          )}
        </div>

        {/* Footer indicator */}
        {filteredEvents.length > 0 && (
          <div className="text-center mt-12 pb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#E8E5E1] shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#7FB685]"></div>
              <small className="text-[#6B6661]">
                Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
              </small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
