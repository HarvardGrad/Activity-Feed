export type EventCategory = 'campaign' | 'content' | 'engagement' | 'role';

export type EventType = 
  | 'campaign_added_always_on'
  | 'campaign_removed_always_on'
  | 'campaign_added_tactical'
  | 'campaign_removed_tactical'
  | 'milestone_impressions'
  | 'milestone_video_views'
  | 'milestone_watch_time'
  | 'role_first_impression'
  | 'role_completed_view'
  | 'role_repeat_engagement';

export interface ActivityEvent {
  id: string;
  type: EventType;
  category: EventCategory;
  title: string;
  description: string;
  timestamp: Date;
  metadata?: {
    campaignName?: string;
    campaignType?: 'Always On' | 'Tactical';
    contentTitle?: string;
    contentThumbnail?: string;
    milestone?: number;
    roleTitle?: string;
    engagementCount?: number;
    status?: 'active' | 'removed';
  };
}
