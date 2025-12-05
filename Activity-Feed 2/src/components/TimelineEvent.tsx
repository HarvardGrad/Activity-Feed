import React, { useState } from 'react';
import { 
  Flag, 
  Eye, 
  PlayCircle, 
  Clock, 
  Briefcase, 
  TrendingUp,
  CheckCircle,
  XCircle,
  ThumbsUp,
  ThumbsDown,
  Heart,
  ExternalLink
} from 'lucide-react';
import type { ActivityEvent } from '../types/activity';

interface TimelineEventProps {
  event: ActivityEvent;
  isLast?: boolean;
  onLabelClick?: (label: string) => void;
}

export function TimelineEvent({ event, isLast, onLabelClick }: TimelineEventProps) {
  const [vote, setVote] = useState<'like' | 'dislike' | null>(null);

  const handleVote = (voteType: 'like' | 'dislike') => {
    if (vote === voteType) {
      setVote(null);
    } else {
      setVote(voteType);
    }
  };

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
      case 'reaction':
        return <Heart className="w-4 h-4" />;
      default:
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getIconColor = () => {
    if (event.type.includes('removed')) return 'text-[#9B9692]';
    if (event.type === 'reaction') return 'text-[#E63946]';
    if (event.category === 'campaign') return 'text-[#E69158]';
    if (event.category === 'content') return 'text-[#6B9BD1]';
    if (event.category === 'role') return 'text-[#7FB685]';
    return 'text-[#E69158]';
  };

  const getBackgroundColor = () => {
    if (event.type.includes('removed')) return 'bg-[#F5F3F0]';
    if (event.type === 'reaction') return 'bg-[#FCE8EB]';
    if (event.category === 'campaign') return 'bg-[#FDF6F2]';
    if (event.category === 'content') return 'bg-[#F3F7FB]';
    if (event.category === 'role') return 'bg-[#F3F9F5]';
    return 'bg-white';
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="relative flex gap-6">
      {/* Timeline connector */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center ${getBackgroundColor()} border border-[#F0EDE9] shadow-sm ${getIconColor()}`}>
          {getIcon()}
        </div>
        {!isLast && (
          <div className="w-px flex-1 bg-gradient-to-b from-[#E8E5E1] via-[#E8E5E1]/50 to-transparent mt-3" style={{ minHeight: '32px' }} />
        )}
      </div>

      {/* Event card */}
      <div className="flex-1 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E5E1]/60 overflow-hidden hover:shadow-md transition-shadow duration-200">
          <div className="px-6 py-5 md:px-7 md:py-6">
            <div className="flex items-start justify-between gap-6 mb-3">
              <div className="flex-1">
                <h3 className="text-[#2D2A27] mb-2">{event.title}</h3>
                <p className="text-[#6B6661] leading-relaxed">{event.description}</p>
              </div>
              <small className="text-[#9B9692] whitespace-nowrap font-normal">
                {formatTimestamp(event.timestamp)}
              </small>
            </div>

            {/* Metadata badges and voting */}
            <div className="flex flex-wrap gap-2 mt-4 justify-between items-end">
              <div className="flex flex-wrap gap-2">
                {event.metadata?.campaignName && (
                  <button
                    onClick={() => onLabelClick?.(event.metadata!.campaignName!)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-normal transition-opacity hover:opacity-75 cursor-pointer ${
                      event.metadata.status === 'removed' 
                        ? 'bg-[#F5F3F0] text-[#6B6661] border border-[#E8E5E1]' 
                        : 'bg-[#FDF6F2] text-[#E69158] border border-[#F0EDE9]'
                    }`}>
                    <Flag className="w-3 h-3" />
                    {event.metadata.campaignName}
                  </button>
                )}
                {event.metadata?.roleTitle && (
                  <button
                    onClick={() => onLabelClick?.(event.metadata!.roleTitle!)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3F9F5] text-[#7FB685] border border-[#E8F4EB] text-xs font-normal transition-opacity hover:opacity-75 cursor-pointer">
                    <Briefcase className="w-3 h-3" />
                    {event.metadata.roleTitle}
                  </button>
                )}
                {event.metadata?.contentTitle && (
                  <button
                    onClick={() => onLabelClick?.(event.metadata!.contentTitle!)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3F7FB] text-[#6B9BD1] border border-[#E6EEF7] text-xs font-normal transition-opacity hover:opacity-75 cursor-pointer">
                    <PlayCircle className="w-3 h-3" />
                    {event.metadata.contentTitle}
                  </button>
                )}
                {event.metadata?.milestone && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FDF6F2] text-[#E69158] border border-[#F9E9DD] text-xs font-medium">
                    <CheckCircle className="w-3 h-3" />
                    {event.metadata.milestone.toLocaleString()} {event.type.includes('watch_time') ? 'hrs' : ''} milestone
                  </span>
                )}
                {event.metadata?.personName && event.metadata?.linkedInUrl && (
                  <a
                    href={event.metadata.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FCE8EB] text-[#E63946] border border-[#F9D5DC] text-xs font-normal transition-all hover:bg-[#F9D5DC] hover:shadow-md underline cursor-pointer group">
                    <Heart className="w-3 h-3" fill="currentColor" />
                    {event.metadata.personName}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}
              </div>
              
              {/* Vote buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleVote('like')}
                  className="p-2 text-[#9B9692] hover:opacity-75 transition-opacity"
                  title="Like this event"
                >
                  <ThumbsUp className="w-4 h-4" fill={vote === 'like' ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={() => handleVote('dislike')}
                  className="p-2 text-[#9B9692] hover:opacity-75 transition-opacity"
                  title="Dislike this event"
                >
                  <ThumbsDown className="w-4 h-4" fill={vote === 'dislike' ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
