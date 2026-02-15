export interface AppData {
    slug: string;
    name: string;
    lastUpdated: string;
    email: string;
    // Optional: Use either structured fields OR customContent
    customContent?: string; // Full custom privacy policy in markdown/HTML
    dataCollected?: string[];
    thirdParties?: ThirdPartyService[];
    retentionPolicy?: string;
}

export interface ThirdPartyService {
    name: string;
    purpose: string;
    privacyPolicyUrl?: string;
}

export interface DocumentInfo {
    type: string; // 'privacy', 'terms', etc.
    lastUpdated: string;
}

export interface AppWithDocuments {
    slug: string;
    name: string;
    email: string;
    documents: DocumentInfo[];
}
