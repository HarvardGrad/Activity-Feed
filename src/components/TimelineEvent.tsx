import React from 'react';
import { 
  Flag, 
  Eye, 
  PlayCircle, 
  Clock, 
  Briefcase, 
  TrendingUp,
  CheckCircle,
  XCircle,
  Layers
} from 'lucide-react';
import type { ActivityEvent } from '../types/activity';

interface TimelineEventProps {
  event: ActivityEvent;
  isLast?: boolean;
}

export function TimelineEvent({ event, isLast }: TimelineEventProps) {
  const getIcon = () => {
    switch (event.type) {
      case 'campaign_added_always_on':
      case 'campaign_added_tactical':
        return <Flag className="w-4 h-4" />;
      case 'campaign_removed_always_on':
      case 'campaign_removed_tactical':
        return <XCircle className="w-4 h-4" />;
      case 'milestone_impressions':
        return <Eye className="w-4 h-4" />;
      case 'milestone_video_views':
        return <PlayCircle className="w-4 h-4" />;
      case 'milestone_watch_time':
        return <Clock className="w-4 h-4" />;
      case 'role_first_impression':
      case 'role_completed_view':
      case 'role_repeat_engagement':
        return <Briefcase className="w-4 h-4" />;
      default:
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getIconStyles = () => {
    if (event.type.includes('removed')) {
      return { color: '#A9A9A9', backgroundColor: '#F5F5F5' };
    }
    return { color: '#FF7C22', backgroundColor: '#FFF5ED' };
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCampaignTypeBadgeStyles = (): React.CSSProperties => {
    if (event.metadata?.campaignType === 'Always On') {
      return { backgroundColor: '#F5F5F5', color: '#6B6661', border: '1px solid #EAEBEC' };
    }
    return { backgroundColor: '#FFF5ED', color: '#FF7C22', border: '1px solid #FFE4D1' };
  };

  return (
    <div className="relative flex gap-5">
      <div className="flex flex-col items-center flex-shrink-0">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ ...getIconStyles(), border: '1px solid #EAEBEC' }}
        >
          {getIcon()}
        </div>
        {!isLast && (
          <div 
            className="w-px flex-1 mt-3" 
            style={{ minHeight: '28px', backgroundColor: '#EAEBEC' }} 
          />
        )}
      </div>

      <div className="flex-1 mb-6">
        <div 
          className="bg-white rounded-xl overflow-hidden transition-colors duration-200"
          style={{ border: '1px solid #EAEBEC' }}
        >
          <div className="px-5 py-4 md:px-6 md:py-5">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="font-medium text-base" style={{ color: '#272525' }}>{event.title}</h3>
              <span className="text-sm whitespace-nowrap" style={{ color: '#A9A9A9' }}>
                {formatTimestamp(event.timestamp)}
              </span>
            </div>

            {event.metadata?.campaignName && (
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="flex items-center gap-1.5 text-sm" style={{ color: '#A9A9A9' }}>
                  <Layers className="w-3.5 h-3.5" />
                  <span>Campaign: {event.metadata.campaignName}</span>
                </div>
                {event.metadata?.campaignType && (
                  <span 
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                    style={getCampaignTypeBadgeStyles()}
                  >
                    {event.metadata.campaignType}
                  </span>
                )}
              </div>
            )}

            <p className="text-sm leading-relaxed" style={{ color: '#6B6661' }}>{event.description}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {event.metadata?.roleTitle && (
                <span 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{ backgroundColor: '#F0F9F1', color: '#5BA665', border: '1px solid #D4EDDA' }}
                >
                  <Briefcase className="w-3 h-3" />
                  {event.metadata.roleTitle}
                </span>
              )}
              {event.metadata?.contentTitle && (
                <span 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{ backgroundColor: '#EEF4FB', color: '#5B8FC9', border: '1px solid #D4E4F4' }}
                >
                  <PlayCircle className="w-3 h-3" />
                  {event.metadata.contentTitle}
                </span>
              )}
              {event.metadata?.milestone && (
                <span 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{ backgroundColor: '#FFF5ED', color: '#FF7C22', border: '1px solid #FFE4D1' }}
                >
                  <CheckCircle className="w-3 h-3" />
                  {event.metadata.milestone.toLocaleString()}{event.type.includes('watch_time') ? ' hrs' : ''} milestone
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
