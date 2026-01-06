// Database types from your existing Supabase schema
export type UserRole = 'marketer' | 'promoter';

export interface Profile {
    id: string;
    email: string;
    role: UserRole;
    full_name: string | null;
    created_at: string;
    updated_at: string;
}

export interface Campaign {
    id: string;
    marketer_id: string;
    title: string;
    description: string | null;
    destination_url: string;
    budget: number;
    payout_per_click: number;
    remaining_budget: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface TrackingLink {
    id: string;
    campaign_id: string;
    promoter_id: string;
    short_code: string;
    created_at: string;
}

export interface Click {
    id: string;
    tracking_link_id: string;
    campaign_id: string;
    promoter_id: string;
    ip_address: string | null;
    user_agent: string | null;
    is_valid: boolean;
    payout_amount: number | null;
    created_at: string;
}

export interface Earning {
    id: string;
    promoter_id: string;
    campaign_id: string;
    click_id: string;
    amount: number;
    status: 'pending' | 'approved' | 'paid';
    created_at: string;
}

// Extended types with relations
export interface CampaignWithStats extends Campaign {
    total_clicks?: number;
    total_earnings?: number;
    promoter_count?: number;
}

export interface EarningWithDetails extends Earning {
    campaign?: Campaign;
    click?: Click;
}

export interface TrackingLinkWithStats extends TrackingLink {
    campaign?: Campaign;
    click_count?: number;
    total_earnings?: number;
}
