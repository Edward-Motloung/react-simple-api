import { IBadgeCounts } from "./IBadgeCounts";

export interface IUser {
    account_id: number;
    is_employee: boolean;
    last_modified_date: Date;
    last_access_date: string;
    reputation_change_year: number;
    reputation_change_quarter: number;
    reputation_change_month: number;
    reputation_change_week: number;
    reputation_change_day: number;
    reputation: number;
    creation_date: Date;
    user_type: string;
    user_id: number;
    accept_rate: number;
    location: string;
    website_url: string;
    link: string;
    profile_image: string;
    display_name: string;
    badge_counts: IBadgeCounts;
    blocked?: boolean;
    following?: boolean;
}